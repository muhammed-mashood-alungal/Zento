import * as yup from "yup";

export const manufacturerSchema = yup.object({
  name: yup
    .string()
    .transform((val) => val.trim()) 
    .min(2, "Name must be at least 2 characters")
    .required("Manufacturer name is required"),

  description: yup
    .string()
    .transform((val) => val.trim())
    .min(5, "Description must be at least 5 characters")
    .required("Manufacturer description is required"),

  status: yup
    .string()
    .oneOf(["active", "inactive"], "Status must be active or inactive")
    .required("Manufacturer status is required"),
});
