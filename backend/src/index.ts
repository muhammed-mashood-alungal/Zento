import express from "express";
import { connectDB } from "./utils";
import { categoryRouter } from "./routes";
import cookieParser from "cookie-parser";
import { errorHandler } from "./middleware/error-handler.middleware";
import { subCategoryRouter } from "./routes/sub-category.router";
import { branchRouter } from "./routes/branch.router";

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


app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
