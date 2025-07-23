import { VendorController } from "@/controllers";
import { validate } from "@/middleware";
import { VendorRepository } from "@/repositories";
import { VendorSchema } from "@/schemas/vendor.schema";
import { VendorServices } from "@/services";
import { Router } from "express";

const vendorRouter = Router();
const vendorRepository = new VendorRepository();
const vendorService = new VendorServices(vendorRepository);
const vendorController = new VendorController(vendorService);

vendorRouter.post(
  "/create",
  validate(VendorSchema),
  vendorController.createVendor.bind(vendorController)
);
vendorRouter.get("/", vendorController.fetchAllVendors.bind(vendorController));
vendorRouter.get(
  "/:id",
  vendorController.findByVendorId.bind(vendorController)
);
vendorRouter.put(
  "/update/:id",
  validate(VendorSchema),
  vendorController.editVendor.bind(vendorController)
);
vendorRouter.delete(
  "/delete/:id",
  vendorController.deleteVendor.bind(vendorController)
);

export { vendorRouter };
