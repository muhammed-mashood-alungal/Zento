import express from "express";
import { connectDB } from "./utils";
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

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

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
