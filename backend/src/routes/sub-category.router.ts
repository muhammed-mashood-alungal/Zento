import { Router } from "express";

import { SubCategoryController } from "@/controllers";
import { SubCategoryRepository } from "@/repositories";
import { SubCategoryService } from "@/services";
import { SubCategorySchema } from "@/schemas/sub-category.schema";
import { validate } from "@/middleware";
const subCategoryRouter = Router();

const subCategoryRepository = new SubCategoryRepository();
const subCategoryService = new SubCategoryService(subCategoryRepository);
const subCategoryController = new SubCategoryController(subCategoryService);

subCategoryRouter.post(
  "/create",
  validate(SubCategorySchema),
  subCategoryController.createSubCategory.bind(subCategoryController)
);
subCategoryRouter.get(
  "/:category_id",
  subCategoryController.fetchAllSubCategories.bind(subCategoryController)
);
subCategoryRouter.get(
  "/:category_id/:id",
  subCategoryController.findBySubCategoryId.bind(subCategoryController)
);
subCategoryRouter.put(
  "/update/:category_id/:id",
  validate(SubCategorySchema),
  subCategoryController.editSubCategory.bind(subCategoryController)
);
subCategoryRouter.delete(
  "/delete/:category_id/:id",
  subCategoryController.deleteSubCategory.bind(subCategoryController)
);
export { subCategoryRouter };
