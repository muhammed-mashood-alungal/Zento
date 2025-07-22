import express from "express";
import { connectDB } from "./utils";
import {
  branchRouter,
  categoryRouter,
  subCategoryRouter,
  vendorRouter,
} from "@/routes";
import cookieParser from "cookie-parser";
import { errorHandler } from "./middleware/error-handler.middleware";
import { manufacturerRouter } from "./routes/manufacturer.router";

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

connectDB();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/category", categoryRouter);
app.use("/sub-category", subCategoryRouter);
app.use("/branch", branchRouter);
app.use("/vendor", vendorRouter);
app.use("/manufacturer", manufacturerRouter); 

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
