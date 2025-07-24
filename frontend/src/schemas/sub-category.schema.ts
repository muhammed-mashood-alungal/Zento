import * as yup from "yup";

export const subCategorySchema = yup.object({
  name: yup.string().required("Sub-category name is required"),
  description: yup.string().required("Description is required"),
  status: yup
    .string()
    .oneOf(["active", "inactive"], "Status must be active or inactive")
    .required("Status is required"),
  category_id: yup.number().required("Category is required"),
});
