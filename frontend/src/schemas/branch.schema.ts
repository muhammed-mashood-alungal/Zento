import * as yup from "yup";

export const branchSchema = yup.object({
  name: yup.string().required("Branch name is required"),
  code: yup.string().required("Branch code is required"),
  location: yup.string().required("Location is required"),
  pincode: yup
    .string()
    .matches(/^\d{6}$/, "Pincode must be a 6-digit number")
    .required("Pincode is required"),
  isOpen: yup.boolean().required("Branch open status is required"),
});
