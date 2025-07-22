import { VendorController } from "@/controllers";
import { VendorRepository } from "@/repositories";
import { VendorServices } from "@/services";
import { Router } from "express";



const vendorRouter = Router();
const vendorRepository = new VendorRepository();
const vendorService = new VendorServices(vendorRepository);
const vendorController = new VendorController(vendorService);


vendorRouter.post("/", vendorController.createVendor.bind(vendorController));
vendorRouter.get("/", vendorController.fetchAllVendors.bind(vendorController));
vendorRouter.get("/:id", vendorController.findByVendorId.bind(vendorController));
vendorRouter.put("/:id", vendorController.editVendor.bind(vendorController));
vendorRouter.delete("/:id", vendorController.deleteVendor.bind(vendorController));

export { vendorRouter };



