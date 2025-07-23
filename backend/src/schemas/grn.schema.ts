import { z } from "zod";

const lineItemsSchema = z.object({
  name: z.string().min(2),
  quantity: z.number().min(1),
  unit_price: z.number(),
  tax_percentage: z.number(),
  taxable_amount: z.number(),
  total_amount: z.number(),
  grn_header_id: z.number().optional(),
  sub_category_id: z.number(),
});

const draftSchema = z.object({
  mode: z.literal("draft"),
  header: z.object({
    grn_number: z.string().optional(),
    grn_date: z.string().optional(),
    vendor_id: z.number().optional(),
    branch_id: z.number().optional(),
    invoice_number: z.string().optional(),
    total_amount: z.number().optional(),
  }),
  line_items: z.array(lineItemsSchema),
});

const submitSchema = z.object({
  mode: z.literal("submit"),
  header: z.object({
    grn_number: z.string(),
    grn_date: z.string(),
    vendor_id: z.number(),
    branch_id: z.number(),
    invoice_number: z.string().max(30),
    total_amount: z.number(),
  }),
  line_items: z.array(lineItemsSchema).min(1),
});

export const GRNSchema = z.union([draftSchema, submitSchema]);
