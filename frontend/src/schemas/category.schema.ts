import * as yup from "yup";

export const categorySchema = yup.object({
  name: yup
    .string()
    .transform((val) => val.trim()) 
    .min(2, "Name must be at least 2 characters")
    .required("Manufacturer name is required"),
  description: yup.string()
    .transform((val) => val.trim()) 
    .min(2, "Name must be at least 2 characters")
    .required("Manufacturer name is required"),
  status: yup
    .string()
    .required("Category status is required"),
});
