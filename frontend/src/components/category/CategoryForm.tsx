// import {
//   FormControl,
//   Grid,
//   InputLabel,
//   MenuItem,
//   Select,
//   TextField,
// } from "@mui/material";
// import { Controller, type UseFormReturn } from "react-hook-form";
// import type { CategoryFormData } from "../../types/category.types";
// import type { SubCategoryFormData } from "../../types/sub-category.types";

// // 
// function CategoryForm({
//   modalType,
//   categoryForm,
//   subCategoryForm,
// }: {
//   modalType: string;
//   categoryForm: UseFormReturn<CategoryFormData>,
//   subCategoryForm : UseFormReturn<SubCategoryFormData>,
// }) {
//   return (
//     <>
//       <Grid container spacing={3}>
//         <Grid item xs={12}>
//           <Controller
//             name="name"
//             control={
//               modalType === "category"
//                 ? categoryForm.control
//                 : subCategoryForm.control
//             }
//             rules={{ required: "Name is required" }}
//             render={({ field }) => (
//               <TextField
//                 {...field}
//                 label={
//                   modalType === "category"
//                     ? "Category Name"
//                     : "Subcategory Name"
//                 }
//                 fullWidth
//                 error={
//                   !!(modalType === "category"
//                     ? categoryForm.formState.errors.name
//                     : subCategoryForm.formState.errors.name)
//                 }
//                 helperText={
//                   modalType === "category"
//                     ? categoryForm.formState.errors.name?.message
//                     : subCategoryForm.formState.errors.name?.message
//                 }
//               />
//             )}
//           />
//         </Grid>
//         <Grid item xs={12}>
//           <Controller
//             name="description"
//             control={
//               modalType === "category"
//                 ? categoryForm.control
//                 : subCategoryForm.control
//             }
//             rules={{ required: "Description is required" }}
//             render={({ field }) => (
//               <TextField
//                 {...field}
//                 label="Description"
//                 fullWidth
//                 multiline
//                 rows={3}
//                 error={
//                   !!(modalType === "category"
//                     ? categoryForm.formState.errors.description
//                     : subCategoryForm.formState.errors.description)
//                 }
//                 helperText={
//                   modalType === "category"
//                     ? categoryForm.formState.errors.description?.message
//                     : subCategoryForm.formState.errors.description?.message
//                 }
//               />
//             )}
//           />
//         </Grid>
//         <Grid item xs={12}>
//           <Controller
//             name="status"
//               control={modalType === 'category' ? categoryForm.control : subCategoryForm.control}
//             render={({ field }) => (
//               <FormControl fullWidth>
//                 <InputLabel>Status</InputLabel>
//                 <Select {...field} label="Status">
//                   <MenuItem value="active">Active</MenuItem>
//                   <MenuItem value="inactive">Inactive</MenuItem>
//                 </Select>
//               </FormControl>
//             )}
//           />
//         </Grid>
//       </Grid>
//     </>
//   );
// }

// export default CategoryForm;

import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { Controller, type UseFormReturn } from "react-hook-form";
import type { CategoryFormData } from "../../types/category.types";
import type { SubCategoryFormData } from "../../types/sub-category.types";

type Props = {
  modalType: "category" | "subcategory";
  categoryForm: UseFormReturn<CategoryFormData>;
  subCategoryForm: UseFormReturn<SubCategoryFormData>;
};

function CategoryForm({ modalType, categoryForm, subCategoryForm }: Props) {
  return (
    <Grid container spacing={3}>
      {modalType === "category" ? (
        <>
          {/* Category Name */}
          <Grid item xs={12}>
            <Controller
              name="name"
              control={categoryForm.control}
              rules={{ required: "Name is required" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Category Name"
                  fullWidth
                  error={!!categoryForm.formState.errors.name}
                  helperText={categoryForm.formState.errors.name?.message}
                />
              )}
            />
          </Grid>

          {/* Category Description */}
          <Grid item xs={12}>
            <Controller
              name="description"
              control={categoryForm.control}
              rules={{ required: "Description is required" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Description"
                  fullWidth
                  multiline
                  rows={3}
                  error={!!categoryForm.formState.errors.description}
                  helperText={
                    categoryForm.formState.errors.description?.message
                  }
                />
              )}
            />
          </Grid>

          {/* Category Status */}
          <Grid item xs={12}>
            <Controller
              name="status"
              control={categoryForm.control}
              render={({ field }) => (
                <FormControl fullWidth>
                  <InputLabel>Status</InputLabel>
                  <Select {...field} label="Status">
                    <MenuItem value="active">Active</MenuItem>
                    <MenuItem value="inactive">Inactive</MenuItem>
                  </Select>
                </FormControl>
              )}
            />
          </Grid>
        </>
      ) : (
        <>
          {/* SubCategory Name */}
          <Grid item xs={12}>
            <Controller
              name="name"
              control={subCategoryForm.control}
              rules={{ required: "Name is required" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Subcategory Name"
                  fullWidth
                  error={!!subCategoryForm.formState.errors.name}
                  helperText={subCategoryForm.formState.errors.name?.message}
                />
              )}
            />
          </Grid>

          {/* SubCategory Description */}
          <Grid item xs={12}>
            <Controller
              name="description"
              control={subCategoryForm.control}
              rules={{ required: "Description is required" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Description"
                  fullWidth
                  multiline
                  rows={3}
                  error={!!subCategoryForm.formState.errors.description}
                  helperText={
                    subCategoryForm.formState.errors.description?.message
                  }
                />
              )}
            />
          </Grid>

          {/* SubCategory Status */}
          <Grid item xs={12}>
            <Controller
              name="status"
              control={subCategoryForm.control}
              render={({ field }) => (
                <FormControl fullWidth>
                  <InputLabel>Status</InputLabel>
                  <Select {...field} label="Status">
                    <MenuItem value="active">Active</MenuItem>
                    <MenuItem value="inactive">Inactive</MenuItem>
                  </Select>
                </FormControl>
              )}
            />
          </Grid>
        </>
      )}
    </Grid>
  );
}

export default CategoryForm;
