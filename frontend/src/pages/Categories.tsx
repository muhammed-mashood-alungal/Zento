import React, { useState } from "react";
import { Box, Typography, Button, Breadcrumbs, Link } from "@mui/material";
import {
  Add as AddIcon,
  ArrowBack as ArrowBackIcon,
} from "@mui/icons-material";
import { useForm } from "react-hook-form";
import BaseModal from "../components/common/BaseModal";
import CardGrid, { type CardItem } from "../components/common/CardGrid";
import CategoryForm from "../components/category/CategoryForm";
import type { Category, CategoryFormData } from "../types/category.types";
import type {
  SubCategory,
  SubCategoryFormData,
} from "../types/sub-category.types";
import { yupResolver } from "@hookform/resolvers/yup";
import { categorySchema } from "../schemas/category.schema";
import { categoryServices } from "../services/category.service";
import { SnackbarUtils } from "../utils/snackbar.util";
import { number } from "yup";
import { subCategoryServices } from "../services/sub-category.service";
import { subCategorySchema } from "../schemas/sub-category.schema";
import ConfirmModal from "../components/common/ConfirmModal";
import { useMasterData } from "../contexts/master-data.context";

const Categories: React.FC = () => {
  const { categories, setCategories, subCategories, setSubCategories } =
    useMasterData();

  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"category" | "subcategory">(
    "category"
  );
  const [editingItem, setEditingItem] = useState<Category | SubCategory | null>(
    null
  );
  const [deletingItem, setDeletingItem] = useState<CardItem | null>(null);

  const categoryForm = useForm<CategoryFormData>({
    resolver: yupResolver(categorySchema),
    defaultValues: {
      name: "",
      description: "",
      status: "active",
    },
  });

  const subCategoryForm = useForm<SubCategoryFormData>({
    resolver: yupResolver(subCategorySchema),
    defaultValues: {
      name: "",
      description: "",
      status: "active",
      category_id: 0,
    },
  });

  const handleCreateCategory = () => {
    setModalType("category");
    setEditingItem(null);
    categoryForm.reset({
      name: "",
      description: "",
      status: "active",
    });
    setModalOpen(true);
  };

  const handleCreateSubCategory = () => {
    if (!selectedCategory) return;
    setModalType("subcategory");
    setEditingItem(null);
    subCategoryForm.reset({
      name: "",
      description: "",
      status: "active",
      category_id: selectedCategory.id,
    });
    setModalOpen(true);
  };

  const handleEditCategory = (item: CardItem) => {
    const category = categories.find(
      (c) => c.id.toString() === item.id.toString()
    );
    if (category) {
      setModalType("category");
      setEditingItem(category);
      categoryForm.reset({
        name: category.name,
        description: category.description,
        status: category.status,
      });
      setModalOpen(true);
    }
  };

  const handleEditSubCategory = (item: CardItem) => {
    const subCategory = subCategories.find(
      (sc) => sc.id.toString() === item.id.toString()
    );
    if (subCategory) {
      setModalType("subcategory");
      setEditingItem(subCategory);
      subCategoryForm.reset({
        name: subCategory.name,
        description: subCategory.description,
        status: subCategory.status,
        category_id: subCategory.category_id,
      });
      setModalOpen(true);
    }
  };

  const onDeleteClick = (item: CardItem) => {
    setDeletingItem(item);
  };

  const handleDeleteCategory = async () => {
    try {
      await categoryServices.deleteCategory(String(deletingItem?.id));
      setCategories(
        categories.filter(
          (c) => c.id.toString() !== deletingItem?.id.toString()
        )
      );
      setSubCategories(
        subCategories.filter(
          (sc) => sc.category_id.toString() !== deletingItem?.id.toString()
        )
      );
      SnackbarUtils.success("Category Deleted !");
    } catch (error) {
      SnackbarUtils.error("Some error while deleting");
    }
    setDeletingItem(null)
  };

  const handleDeleteSubCategory = async () => {
    try {
      await subCategoryServices.deleteSubCategory(
        Number(selectedCategory?.id),
        Number(deletingItem?.id)
      );
      setSubCategories(
        subCategories.filter(
          (sc) => sc.id.toString() !== deletingItem?.id.toString()
        )
      );
       SnackbarUtils.success("Category Deleted !");
    } catch (error) {
      SnackbarUtils.error("Some error while deleting");
    }
    setDeletingItem(null)
  };

  const handleViewCategory = (item: CardItem) => {
    const category = categories.find(
      (c) => c.id.toString() === item.id.toString()
    );
    if (category) {
      setSelectedCategory(category);
    }
  };

  const onSubmitCategory = async (data: CategoryFormData) => {
    if (editingItem && modalType === "category") {
      try {
        await categoryServices.editCategory(String(editingItem.id), data);
        SnackbarUtils.success("Category Updated Successfully!");
        setCategories(
          categories.map((c) =>
            c.id === editingItem.id ? { ...c, ...data } : c
          )
        );
      } catch (error: unknown) {
        SnackbarUtils.error(error as string);
      }
    } else {
      try {
        const newCategory = await categoryServices.createCategory(data);
        SnackbarUtils.success("Category Created Successfully!");
        setCategories([...categories, newCategory]);
      } catch (error: unknown) {
        SnackbarUtils.error(error as string);
      }
    }
    setModalOpen(false);
    categoryForm.reset();
  };

  const onSubmitSubCategory = async (data: SubCategoryFormData) => {
    if (editingItem && modalType === "subcategory") {
      try {
        await subCategoryServices.updateSubCategory(
          data.category_id,
          editingItem.id,
          data
        );
        setSubCategories(
          subCategories.map((sc) =>
            sc.id === editingItem.id ? { ...sc, ...data } : sc
          )
        );
        SnackbarUtils.success("SubCategory Updated Successfully");
      } catch (error) {}
    } else {
      try {
        const newSubCategory = await subCategoryServices.createSubCategory(
          data
        );
        setSubCategories([...subCategories, newSubCategory]);
        SnackbarUtils.success("SubCategory Created Successfully");
      } catch (error) {}
    }
    setModalOpen(false);
    subCategoryForm.reset();
  };

  const categoryCardItems: CardItem[] = categories.map((category) => ({
    id: category.id,
    title: category.name,
    description: category.description,
    status: category.status,
    metadata: [
      {
        label: "Subcategories",
        value: subCategories
          .filter((sc) => sc.category_id === category.id)
          .length.toString(),
      },
    ],
  }));

  const subCategoryCardItems: CardItem[] = selectedCategory
    ? subCategories
        .filter((sc) => sc.category_id === selectedCategory.id)
        .map((subCategory) => ({
          id: subCategory.id,
          title: subCategory.name,
          description: subCategory.description,
          status: subCategory.status,
        }))
    : [];

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
        }}
      >
        <Box>
          <Typography variant="h4" sx={{ fontWeight: "bold", mb: 1 }}>
            {selectedCategory ? "Subcategories" : "Category Management"}
          </Typography>
          {selectedCategory && (
            <Breadcrumbs>
              <Link
                component="button"
                variant="body2"
                onClick={() => setSelectedCategory(null)}
                sx={{ textDecoration: "none" }}
              >
                Categories
              </Link>
              <Typography variant="body2" color="text.primary">
                {selectedCategory.name}
              </Typography>
            </Breadcrumbs>
          )}
        </Box>
        <Box sx={{ display: "flex", gap: 2 }}>
          {selectedCategory && (
            <Button
              variant="outlined"
              startIcon={<ArrowBackIcon />}
              onClick={() => setSelectedCategory(null)}
            >
              Back to Categories
            </Button>
          )}
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={
              selectedCategory ? handleCreateSubCategory : handleCreateCategory
            }
            sx={{ borderRadius: 2 }}
          >
            {selectedCategory ? "Add Subcategory" : "Create Category"}
          </Button>
        </Box>
      </Box>

      <CardGrid
        items={selectedCategory ? subCategoryCardItems : categoryCardItems}
        onEdit={selectedCategory ? handleEditSubCategory : handleEditCategory}
        // onDelete={
        //   selectedCategory ? handleDeleteSubCategory : handleDeleteCategory
        // }
        onDelete={onDeleteClick}
        onView={selectedCategory ? undefined : handleViewCategory}
        emptyMessage={
          selectedCategory
            ? `No subcategories found for ${selectedCategory.name}. Create your first subcategory!`
            : "No categories found. Create your first category!"
        }
      />

      <ConfirmModal
        open={Boolean(deletingItem)}
        onClose={() => setDeletingItem(null)}
        message={"Are you sure you want to delete this Category?"}
        onOk={selectedCategory ? handleDeleteSubCategory : handleDeleteCategory}
      ></ConfirmModal>

      <BaseModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={
          modalType === "category"
            ? editingItem
              ? "Edit Category"
              : "Create New Category"
            : editingItem
            ? "Edit Subcategory"
            : "Create New Subcategory"
        }
        onSubmit={
          modalType === "category"
            ? categoryForm.handleSubmit(onSubmitCategory)
            : subCategoryForm.handleSubmit(onSubmitSubCategory)
        }
        onCancel={() => setModalOpen(false)}
        submitText={editingItem ? "Update" : "Create"}
      >
        <CategoryForm
          modalType={modalType}
          categoryForm={categoryForm}
          subCategoryForm={subCategoryForm}
        />
      </BaseModal>
    </Box>
  );
};

export default Categories;
