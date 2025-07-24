import { z } from "zod";

export const ManufacturerSchema = z.object({
  name: z.string().min(2),
  description: z.string().min(2),
  status: z.enum(["active", "inactive"]),
});
