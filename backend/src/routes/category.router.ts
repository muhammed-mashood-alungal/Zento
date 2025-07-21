
import { CategoryController } from "@/controllers";
import { CategoryRepository } from "@/repositories";
import { CategoryServices } from "@/services";
import { Router } from "express";

const categoryRouter = Router();

const categoryRepository = new CategoryRepository();
const categoryService = new CategoryServices(categoryRepository);
const categoryController = new CategoryController(categoryService);

categoryRouter.post(
  "/create",
  categoryController.createCategory.bind(categoryController)
);
categoryRouter.get(
  "/",
  categoryController.fetchAllCategories.bind(categoryController)
);
categoryRouter.get(
  "/:id",
  categoryController.findByCategoryId.bind(categoryController)
);
categoryRouter.put(
  "/:id",
  categoryController.editCategory.bind(categoryController)
);
categoryRouter.delete(
  "/:id",
  categoryController.deleteCategory.bind(categoryController)
);


export { categoryRouter };
