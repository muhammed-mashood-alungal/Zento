import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
} from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import BaseModal from "../components/common/BaseModal";
import CardGrid, { type CardItem } from "../components/common/CardGrid";
import ManufactureForm from "../components/manufacturer/ManufactureForm";
import type { Manufacturer, ManufacturerFormData } from "../types/manufacturer.types";


const Manufacturers: React.FC = () => {
  const [manufacturers, setManufacturers] = useState<Manufacturer[]>([
    {
      id: 1,
      name: "Apple Inc.",
      description: "Consumer electronics and software company",
      status: "active",
    },
    {
      id: 2,
      name: "Dell Technologies",
      description: "Computer technology company",
      status: "active",
    },
    {
      id: 3,
      name: "HP Inc.",
      description: "Information technology company",
      status: "active",
    },
    {
      id: 4,
      name: "Lenovo Group",
      description: "Multinational technology company",
      status: "inactive",
    },
  ]);

  const [modalOpen, setModalOpen] = useState(false);
  const [editingManufacturer, setEditingManufacturer] =
    useState<Manufacturer | null>(null);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ManufacturerFormData>({
    defaultValues: {
      name: "",
      description: "",
      status: "active",
    },
  });

  const handleCreate = () => {
    setEditingManufacturer(null);
    reset({
      name: "",
      description: "",
      status: "active",
    });
    setModalOpen(true);
  };

  const handleEdit = (item: CardItem) => {
    const manufacturer = manufacturers.find(
      (m) => m.id.toString() === item.id.toString()
    );
    if (manufacturer) {
      setEditingManufacturer(manufacturer);
      reset({
        name: manufacturer.name,
        description: manufacturer.description,
        status: manufacturer.status,
      });
      setModalOpen(true);
    }
  };

  const handleDelete = (item: CardItem) => {
    setManufacturers(
      manufacturers.filter((m) => m.id.toString() !== item.id.toString())
    );
  };

  const onSubmit = (data: ManufacturerFormData) => {
    if (editingManufacturer) {
      setManufacturers(
        manufacturers.map((m) =>
          m.id === editingManufacturer.id ? { ...m, ...data } : m
        )
      );
    } else {
      const newManufacturer: Manufacturer = {
        id: Math.max(...manufacturers.map((m) => m.id), 0) + 1,
        ...data,
      };
      setManufacturers([...manufacturers, newManufacturer]);
    }
    setModalOpen(false);
    reset();
  };

  const cardItems: CardItem[] = manufacturers.map((manufacturer) => ({
    id: manufacturer.id,
    title: manufacturer.name,
    description: manufacturer.description,
    status: manufacturer.status,
  }));

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
        <Typography variant="h4" sx={{ fontWeight: "bold" }}>
          Manufacturer Management
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleCreate}
          sx={{ borderRadius: 2 }}
        >
          Add Manufacturer
        </Button>
      </Box>

      <CardGrid
        items={cardItems}
        onEdit={handleEdit}
        onDelete={handleDelete}
        emptyMessage="No manufacturers found. Add your first manufacturer!"
      />

      <BaseModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={
          editingManufacturer ? "Edit Manufacturer" : "Add New Manufacturer"
        }
        onSubmit={handleSubmit(onSubmit)}
        onCancel={() => setModalOpen(false)}
        submitText={editingManufacturer ? "Update" : "Add"}
      >
        <ManufactureForm errors={errors} control={control} />
      </BaseModal>
    </Box>
  );
};

export default Manufacturers;
