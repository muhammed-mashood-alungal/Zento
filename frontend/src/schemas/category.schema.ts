import * as yup from "yup";

export const categorySchema = yup.object({
  name: yup.string().required("Category name is required"),
  description: yup.string().required("Category description is required"),
  status: yup
    .string()
    .oneOf(["active", "inactive"], "Status must be active or inactive")
    .required("Category status is required"),
});
