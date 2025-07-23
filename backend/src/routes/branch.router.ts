import { Router } from "express";

import { BranchController } from "@/controllers";
import { BranchRepository } from "@/repositories";
import { BranchService } from "@/services";
import { validate } from "@/middleware";
import { BranchSchema } from "@/schemas/branch.schema";
const branchRouter = Router();
const branchRepository = new BranchRepository();
const branchService = new BranchService(branchRepository);
const branchController = new BranchController(branchService);

branchRouter.get(
  "/:id",
  branchController.findByBranchId.bind(branchController)
);
branchRouter.get("/", branchController.getAllBranches.bind(branchController));
branchRouter.post(
  "/create",
  validate(BranchSchema),
  branchController.createBranch.bind(branchController)
);
branchRouter.put(
  "/update/:id",
  validate(BranchSchema),
  branchController.updateBranch.bind(branchController)
);
branchRouter.delete(
  "/delete/:id",
  branchController.deleteBranch.bind(branchController)
);
export { branchRouter };
