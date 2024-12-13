import "express-async-errors";
import express from "express";
import morgan from "morgan";
import * as dotenv from "dotenv";
import mongoose from "mongoose";
import { body, validationResult } from "express-validator";

//routers
import jobRouter from "./routes/jobRouter.js";

//Middleware
import errorHandlerMiddleWare from "./middleware/errorHandlerMiddleware.js";

dotenv.config();

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(express.json());

app.post(
  "/api/v1/test",
  [
    body("name")
      .notEmpty()
      .withMessage("name is required")
      .isLength({ min: 50 })
      .withMessage("Name must be at least 50 characters"),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorMessages = errors.array().map((error) => error.msg);
      return res.status(400).json({ errors: errorMessages });
    }
    next();
  },
  (req, res) => {
    const { name } = req.body;
    res.json({ message: `Hello ${name}` });
  }
);

app.use("/api/v1/jobs", jobRouter);

app.use("*", (req, res) => {
  res.status(404).json({ message: "Not Found" });
});

app.use(errorHandlerMiddleWare);

const port = process.env.PORT || 5100;

try {
  await mongoose.connect(process.env.MONGO_URL);
  app.listen(port, () => {
    console.log(`server running on PORT ${port}`);
  });
} catch (error) {
  console.log(error);
  process.exit(1);
}
