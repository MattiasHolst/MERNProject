import Job from "../models/JobModel.js";
import { nanoid } from "nanoid";

let jobs = [
  { id: nanoid(), company: "apple", position: "front-end" },
  { id: nanoid(), company: "google", position: "back-end" },
];

// GET ALL JOBS
export const getAllJobs = async (req, res) => {
  const jobs = await Job.find({});
  res.status(200).json({ jobs });
};

// GET SINGLE JOB
export const getSingleJob = async (req, res) => {
  const { id } = req.params;
  const job = await Job.findById(id);
  if (!job) {
    return res.status(404).json({ message: `No job with id ${id}` });
  }
  res.status(200).json({ job });
};

// CREATE JOB
export const createJob = async (req, res) => {
  const job = await Job.create(req.body);
  res.status(201).json({ job });
};

// UPDATE JOB
export const updateJob = async (req, res) => {
  const { company, position } = req.body;
  if (!company || !position) {
    return res
      .status(400)
      .json({ message: "Please provide company and position" });
  }
  const { id } = req.params;
  const job = jobs.find((job) => job.id === id);
  if (!job) {
    return res.status(404).json({ message: `No job with id ${id}` });
  }
  job.company = company;
  job.position = position;
  res.status(200).json({ message: "Job updated", job });
};

// DELETE JOB
export const deleteJob = async (req, res) => {
  const { id } = req.params;
  const job = jobs.find((job) => job.id === id);
  if (!job) {
    return res.status(404).json({ message: `No job with id ${id}` });
  }
  jobs = jobs.filter((job) => job.id !== id);
  res.status(200).json({ message: "Job deleted" });
};
