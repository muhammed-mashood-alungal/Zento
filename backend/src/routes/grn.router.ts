import { Router } from "express";

import { GRNController } from "@/controllers";
import { GrnService } from "@/services";
import { GrnRepository } from "@/repositories";

const grnRouter = Router();

const grnRepository = new GrnRepository();
const grnService = new GrnService(grnRepository);
const grnController = new GRNController(grnService);

grnRouter.post("/", grnController.createGRN.bind(grnController));
grnRouter.get("/", grnController.fetchAllGRNs.bind(grnController));
grnRouter.get("/:id", grnController.findGRNById.bind(grnController));
grnRouter.put("/:id", grnController.updateGRN.bind(grnController));
grnRouter.delete("/:id", grnController.deleteGRN.bind(grnController));

export { grnRouter };
