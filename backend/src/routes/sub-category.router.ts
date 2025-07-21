import { Router } from "express";

import { SubCategoryController } from "@/controllers";
import { SubCategoryRepository } from "@/repositories";
import { SubCategoryService } from "@/services";
const subCategoryRouter = Router();

const subCategoryRepository = new SubCategoryRepository();
const subCategoryService = new SubCategoryService(subCategoryRepository);
const subCategoryController = new SubCategoryController(subCategoryService);

subCategoryRouter.post(
  "/create",
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
  "/:category_id/:id",
  subCategoryController.editSubCategory.bind(subCategoryController)
);
subCategoryRouter.delete(
  "/:category_id/:id",
  subCategoryController.deleteSubCategory.bind(subCategoryController)
);
export { subCategoryRouter };
