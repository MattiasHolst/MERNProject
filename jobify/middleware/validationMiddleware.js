import { body, param, validationResult } from "express-validator";
import {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} from "../errors/customErrors.js";
import { JOB_STATUS, JOB_TYPE } from "../utils/constants.js";
import mongoose from "mongoose";
import Job from "../models/JobModel.js";
import User from "../models/UserModel.js";

const withValidationErrors = (validateValues) => {
  return [
    validateValues,
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((error) => error.msg);
        if (errorMessages[0].startsWith("No job")) {
          throw new NotFoundError(errorMessages);
        }
        if (errorMessages[0].startsWith("not authroized")) {
          throw new UnauthorizedError("not authroized to access this route");
        }
        throw new BadRequestError(errorMessages);
      }
      next();
    },
  ];
};

/*
    JOB VALIDATION
*/

export const validateJobInput = withValidationErrors([
  [
    body("company").notEmpty().withMessage("company is required"),
    body("position").notEmpty().withMessage("position is required"),
    body("jobLocation").notEmpty().withMessage("job location is required"),
    body("jobStatus")
      .isIn(Object.values(JOB_STATUS))
      .withMessage("Invalid job status value"),
    body("jobType")
      .isIn(Object.values(JOB_TYPE))
      .withMessage("Invalid job type value"),
  ],
]);

export const validateIdParams = withValidationErrors([
  param("id").custom(async (value, { req }) => {
    const isValidId = mongoose.Types.ObjectId.isValid(value);
    if (!isValidId) throw new Error("Invalid MongoDB id");
    const job = await Job.findById(value);
    if (!job) throw new Error(`No job with id ${value}`);
    const { userId, role } = req.user;
    const isAdmin = role === "admin";
    const isOwner = userId === job.createdBy.toString();
    if (!isAdmin && !isOwner)
      throw new UnauthorizedError("not authroized to access this route");
  }),
]);

/*
    USER VALIDATION
*/
export const validateRegisterInput = withValidationErrors([
  [
    body("name").notEmpty().withMessage("name is required"),
    body("email")
      .notEmpty()
      .withMessage("email is required")
      .isEmail()
      .withMessage("Invalid email format")
      .custom(async (email) => {
        const user = await User.findOne({ email });
        if (user) throw new Error(`Email is already registered`);
      }),
    body("password")
      .notEmpty()
      .withMessage("password is required")
      .isLength({ min: 8 })
      .withMessage("Password must be atleast 8 characters long"),
    body("location").notEmpty().withMessage("Location is required"),
    body("lastName").notEmpty().withMessage("Lastname is required"),
  ],
]);

export const validateLoginInput = withValidationErrors([
  [
    body("email")
      .notEmpty()
      .withMessage("email is required")
      .isEmail()
      .withMessage("Invalid email format"),
    body("password").notEmpty().withMessage("password is required"),
  ],
]);
