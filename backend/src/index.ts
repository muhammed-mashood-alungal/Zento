import express from "express";
import { connectDB } from "./utils";
import dotenv from "dotenv";
import {
  branchRouter,
  categoryRouter,
  grnRouter,
  manufacturerRouter,
  subCategoryRouter,
  vendorRouter,
} from "@/routes";
import cookieParser from "cookie-parser";
import { errorHandler } from "@/middleware";
import { env } from "@/config";
import cors from "cors";
dotenv.config();

const app = express();

const PORT = env.PORT || 5000;

app.use(cors("*"));
connectDB();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/v1/categories", categoryRouter);
app.use("/api/v1/sub-categories", subCategoryRouter);
app.use("/api/v1/branches", branchRouter);
app.use("/api/v1/vendors", vendorRouter);
app.use("/api/v1/manufacturers", manufacturerRouter);
app.use("/api/v1/grns", grnRouter);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
