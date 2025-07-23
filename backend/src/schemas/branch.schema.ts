import { z } from "zod";

export const BranchSchema = z.object({
  name: z.string().min(2),
  location: z.string().min(2),
  pincode: z.string().regex(/^\d{6}$/),
  isOpen: z.boolean(),
  code : z.string()
});
