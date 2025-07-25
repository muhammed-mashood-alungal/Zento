import { Router } from "express";

import { GRNController } from "@/controllers";
import { GrnService } from "@/services";
import { GrnRepository } from "@/repositories";
import { validate } from "@/middleware";
import { GRNSchema } from "@/schemas";

const grnRouter = Router();

const grnRepository = new GrnRepository();
const grnService = new GrnService(grnRepository);
const grnController = new GRNController(grnService);

grnRouter.post(
  "/create",
  validate(GRNSchema),
  grnController.createGRN.bind(grnController)
);
grnRouter.get("/", grnController.fetchAllGRNs.bind(grnController));

grnRouter.get("/:id", grnController.findGRNById.bind(grnController));
grnRouter.put(
  "/update/:id",
  validate(GRNSchema),
  grnController.updateGRN.bind(grnController)
);
grnRouter.delete("/delete/:id", grnController.deleteGRN.bind(grnController));
grnRouter.post('/generate-grn-number', grnController.generateGRNNumber.bind(grnController))
grnRouter.post("/report/export", grnController.generateGRNRegisterReport.bind(grnController));

export { grnRouter };
