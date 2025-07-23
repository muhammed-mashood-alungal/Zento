import { z } from "zod";

export const SubCategorySchema = z.object({
  name: z.string(),
  description: z.string(),
  status: z.string(),
  category_id: z.number()
});