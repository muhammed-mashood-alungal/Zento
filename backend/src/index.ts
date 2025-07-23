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
dotenv.config();



const app = express();


const PORT = env.PORT || 5000;
connectDB();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/v1/category", categoryRouter);
app.use("/api/v1/sub-category", subCategoryRouter);
app.use("/api/v1/branch", branchRouter);
app.use("/api/v1/vendor", vendorRouter);
app.use("/api/v1/manufacturer", manufacturerRouter);
app.use("/api/v1/grn", grnRouter);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
