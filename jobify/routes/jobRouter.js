import { Router } from "express";
import {
  getAllJobs,
  getSingleJob,
  createJob,
  deleteJob,
  updateJob,
  showStats,
} from "../controllers/jobController.js";
import {
  validateIdParams,
  validateJobInput,
} from "../middleware/validationMiddleware.js";
import { checkForTestUser } from "../middleware/authMiddleware.js";

const router = Router();

// router.get('/', getAllJobs)
// router.post('/', createJob)

router
  .route("/")
  .get(getAllJobs)
  .post(checkForTestUser, validateJobInput, createJob);

router
  .route("/stats")
  .get(showStats);

router
  .route("/:id")
  .get(validateIdParams, getSingleJob)
  .patch(checkForTestUser, validateJobInput, validateIdParams, updateJob)
  .delete(checkForTestUser, validateIdParams, deleteJob);

export default router;
