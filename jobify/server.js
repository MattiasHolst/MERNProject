import express from "express";
import morgan from "morgan";
import * as dotenv from "dotenv";
import { nanoid } from "nanoid";

//routers
import jobRouter from "./routes/jobRouter.js";

dotenv.config();

const app = express();

let jobs = [
  { id: nanoid(), company: "apple", position: "front-end" },
  { id: nanoid(), company: "google", position: "back-end" },
];

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(express.json());

app.use("/api/v1/jobs", jobRouter);

app.use("*", (req, res) => {
  res.status(404).json({ message: "Not Found" });
});

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({ message: "Something went wrong" });
});

const port = process.env.PORT || 5100;

app.listen(port, () => {
  console.log(`server running on PORT ${port}`);
});
