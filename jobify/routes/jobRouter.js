import { Router } from "express";
import {
  getAllJobs,
  getSingleJob,
  createJob,
  deleteJob,
  updateJob,
} from "../controllers/jobController.js";
import { validateJobInput } from "../middleware/validationMiddleware.js";

const router = Router();

// router.get('/', getAllJobs)
// router.post('/', createJob)

router.route("/").get(getAllJobs).post(validateJobInput, createJob);
router
  .route("/:id")
  .get(getSingleJob)
  .patch(validateJobInput, updateJob)
  .delete(deleteJob);

export default router;
