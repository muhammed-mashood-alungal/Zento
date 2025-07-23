import { z } from "zod";

export const CategorySchema = z.object({
  name: z.string(),
  description: z.string(),
  status: z.string(),
});
