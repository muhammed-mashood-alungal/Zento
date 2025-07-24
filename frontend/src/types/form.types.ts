import {
  type Control,
  type FieldErrors,
  type FieldValues,
} from "react-hook-form";

export  type FormProps<T extends FieldValues> = {
  control: Control<T>;
  errors: FieldErrors<T>;
};
