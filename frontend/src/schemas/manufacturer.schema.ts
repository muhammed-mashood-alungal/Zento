import * as yup from "yup";

export const manufacturerSchema = yup.object({
  name: yup.string().required("Manufacturer name is required"),
  description: yup.string().required("Manufacturer description is required").min(5),
  status: yup
    .string()
    .oneOf(["active", "inactive"], "Status must be active or inactive")
    .required("Manufacturer status is required"),
});
