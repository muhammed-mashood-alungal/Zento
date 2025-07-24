import * as yup from "yup";

export const vendorSchema = yup.object({
  contact_person: yup
    .string()
    .transform((val) => val.trim())
    .min(2, "Contact person name must be at least 2 characters")
    .required("Contact person is required"),

  phone: yup
    .string()
    .transform((val) => val.trim())
    .matches(/^[6-9]\d{9}$/, "Enter a valid 10-digit mobile number")
    .required("Phone number is required"),

  email: yup
    .string()
    .transform((val) => val.trim())
    .email("Invalid email")
    .required("Email is required"),

  gst_number: yup
    .string()
    .transform((val) => val.trim())
    .matches(
      /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}[Z]{1}[0-9A-Z]{1}$/,
      "Invalid GST number"
    )
    .required("GST number is required"),

  manufacturer_id: yup
    .number()
    .transform((val) => (isNaN(val) ? undefined : val))
    .moreThan(0, "Manufacturer is required")
    .typeError("Manufacturer is required")
    .required("Manufacturer is required"),
});
