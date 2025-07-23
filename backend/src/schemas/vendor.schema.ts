import { z } from "zod";

export const VendorSchema = z.object({
  contact_person: z.string(),
  phone: z.string(),
  email: z.string(),
  gst_number: z.string(),
  manufacturer_id: z.number()
});
