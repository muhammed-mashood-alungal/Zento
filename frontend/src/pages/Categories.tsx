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

const Categories: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([
    {
      id: 1,
      name: "Electronics",
      description: "Electronic devices and components",
      status: "active",
    },
    {
      id: 2,
      name: "Furniture",
      description: "Office and home furniture",
      status: "active",
    },
    {
      id: 3,
      name: "Vehicles",
      description: "Company vehicles and transportation",
      status: "inactive",
    },
  ]);

  const [subCategories, setSubCategories] = useState<SubCategory[]>([
    {
      id: 1,
      categoryId: 1,
      name: "Laptops",
      description: "Portable computers",
      status: "active",
    },
    {
      id: 2,
      categoryId: 1,
      name: "Monitors",
      description: "Display screens",
      status: "active",
    },
    {
      id: 3,
      categoryId: 2,
      name: "Desks",
      description: "Work desks and tables",
      status: "active",
    },
  ]);

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

  const categoryForm = useForm<CategoryFormData>({
    resolver : yupResolver(categorySchema),
    defaultValues: {
      name: "",
      description: "",
      status: "active",
    },
  });

  const subCategoryForm = useForm<SubCategoryFormData>({
    defaultValues: {
      name: "",
      description: "",
      status: "active",
      categoryId: 0,
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
      categoryId: selectedCategory.id,
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
        categoryId: subCategory.categoryId,
      });
      setModalOpen(true);
    }
  };

  const handleDeleteCategory = (item: CardItem) => {
    setCategories(
      categories.filter((c) => c.id.toString() !== item.id.toString())
    );
    // Also delete related subcategories
    setSubCategories(
      subCategories.filter(
        (sc) => sc.categoryId.toString() !== item.id.toString()
      )
    );
  };

  const handleDeleteSubCategory = (item: CardItem) => {
    setSubCategories(
      subCategories.filter((sc) => sc.id.toString() !== item.id.toString())
    );
  };

  const handleViewCategory = (item: CardItem) => {
    const category = categories.find(
      (c) => c.id.toString() === item.id.toString()
    );
    if (category) {
      setSelectedCategory(category);
    }
  };

  const onSubmitCategory = (data: CategoryFormData) => {
    if (editingItem && modalType === "category") {
      setCategories(
        categories.map((c) => (c.id === editingItem.id ? { ...c, ...data } : c))
      );
    } else {
      const newCategory: Category = {
        id: Math.max(...categories.map((c) => c.id), 0) + 1,
        ...data,
      };
      setCategories([...categories, newCategory]);
    }
    setModalOpen(false);
    categoryForm.reset();
  };

  const onSubmitSubCategory = (data: SubCategoryFormData) => {
    if (editingItem && modalType === "subcategory") {
      setSubCategories(
        subCategories.map((sc) =>
          sc.id === editingItem.id ? { ...sc, ...data } : sc
        )
      );
    } else {
      const newSubCategory: SubCategory = {
        id: Math.max(...subCategories.map((sc) => sc.id), 0) + 1,
        ...data,
      };
      setSubCategories([...subCategories, newSubCategory]);
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
          .filter((sc) => sc.categoryId === category.id)
          .length.toString(),
      },
    ],
  }));

  const subCategoryCardItems: CardItem[] = selectedCategory
    ? subCategories
        .filter((sc) => sc.categoryId === selectedCategory.id)
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
        onDelete={
          selectedCategory ? handleDeleteSubCategory : handleDeleteCategory
        }
        onView={selectedCategory ? undefined : handleViewCategory}
        emptyMessage={
          selectedCategory
            ? `No subcategories found for ${selectedCategory.name}. Create your first subcategory!`
            : "No categories found. Create your first category!"
        }
      />

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
