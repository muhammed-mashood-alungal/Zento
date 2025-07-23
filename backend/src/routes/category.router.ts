
import { CategoryController } from "@/controllers";
import { validate } from "@/middleware";
import { CategoryRepository } from "@/repositories";
import { CategorySchema } from "@/schemas/category.schema";
import { CategoryServices } from "@/services";
import { Router } from "express";

const categoryRouter = Router();

const categoryRepository = new CategoryRepository();
const categoryService = new CategoryServices(categoryRepository);
const categoryController = new CategoryController(categoryService);

categoryRouter.post(
  "/create",
  validate(CategorySchema),
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
  "/update/:id",
  validate(CategorySchema),
  categoryController.editCategory.bind(categoryController)
);
categoryRouter.delete(
  "/delete/:id",
  categoryController.deleteCategory.bind(categoryController)
);


export { categoryRouter };
