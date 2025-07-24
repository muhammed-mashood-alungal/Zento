import * as yup from "yup";

export const subCategorySchema = yup.object({
  name: yup
    .string()
    .transform((val) => val.trim())
    .min(2, "Sub-category name must be at least 2 characters")
    .required("Sub-category name is required"),

  description: yup
    .string()
    .transform((val) => val.trim())
    .min(5, "Description must be at least 5 characters")
    .required("Description is required"),

  status: yup
    .string()
    .oneOf(["active", "inactive"], "Status must be active or inactive")
    .required("Status is required"),

  category_id: yup
    .number()
    .typeError("Category is required")
    .required("Category is required"),
});
