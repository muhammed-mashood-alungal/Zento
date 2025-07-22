import { Router } from "express";

import { ManufacturerController } from "@/controllers";
import { ManufacturerRepository } from "@/repositories";
import { ManufacturerService } from "@/services";

const manufacturerRouter = Router();

const manufacturerRepository = new ManufacturerRepository();
const manufacturerService = new ManufacturerService(manufacturerRepository);
const manufacturerController = new ManufacturerController(manufacturerService);

manufacturerRouter.post(
  "/",
  manufacturerController.createManufacturer.bind(manufacturerController)
);
manufacturerRouter.get(
  "/:id",
  manufacturerController.getManufacturerById.bind(manufacturerController)
);
manufacturerRouter.put(
  "/:id",
  manufacturerController.updateManufacturer.bind(manufacturerController)
);
manufacturerRouter.delete(
  "/:id",
  manufacturerController.deleteManufacturer.bind(manufacturerController)
);
manufacturerRouter.get(
  "/",
  manufacturerController.getAllManufacturers.bind(manufacturerController)
);
manufacturerRouter.patch(
  "/:id/status",
  manufacturerController.changeManufacturerStatus.bind(manufacturerController)
);

export { manufacturerRouter };
