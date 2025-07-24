import React, { useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import BaseModal from "../components/common/BaseModal";
import CardGrid, { type CardItem } from "../components/common/CardGrid";
import ManufactureForm from "../components/manufacturer/ManufactureForm";
import type {
  Manufacturer,
  ManufacturerFormData,
} from "../types/manufacturer.types";
import ConfirmModal from "../components/common/ConfirmModal";
import { manufacturerServices } from "../services/manufacturer.service";
import { SnackbarUtils } from "../utils/snackbar.util";
import { useMasterData } from "../contexts/master-data.context";
import { yupResolver } from "@hookform/resolvers/yup";
import { manufacturerSchema } from "../schemas/manufacturer.schema";

const Manufacturers: React.FC = () => {
  const {manufacturers ,setManufacturers} = useMasterData()

  const [modalOpen, setModalOpen] = useState(false);
  const [editingManufacturer, setEditingManufacturer] =
    useState<Manufacturer | null>(null);
  const [deletingManufacturer, setDeletingManufacturer] = useState("");

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ManufacturerFormData>({
    resolver : yupResolver(manufacturerSchema),
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

  const onDeleteClick = (item: CardItem) => {
    setDeletingManufacturer(item.id.toString());
  };

  const handleDelete = async () => {
    try {
      await manufacturerServices.deleteManufacturer(
        Number(deletingManufacturer)
      );
      setManufacturers(
        manufacturers.filter(
          (m) => m.id.toString() !== deletingManufacturer.toString()
        )
      );
      setDeletingManufacturer("");
      SnackbarUtils.success("Manufacturer Deleted!");
    } catch (error: unknown) {
      SnackbarUtils.error(error as string);
    }
  };

  const onSubmit = async (data: ManufacturerFormData) => {
    if (editingManufacturer) {
      try {
        await manufacturerServices.updateManufacturer(
          editingManufacturer.id,
          data
        );
        setManufacturers(
          manufacturers.map((m) =>
            m.id === editingManufacturer.id ? { ...m, ...data } : m
          )
        );
        SnackbarUtils.success("Manufacturer Updated!");
      } catch (error: unknown) {
        SnackbarUtils.error(error as string);
        return;
      }
    } else {
      try {
        const newManufacturer = await manufacturerServices.createManufacturer(
          data
        );
        setManufacturers([...manufacturers, newManufacturer]);
        SnackbarUtils.success("New Manufacturer Created!");
      } catch (error: unknown) {
        SnackbarUtils.error(error as string);
        return;
      }
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
        onDelete={onDeleteClick}
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
      <ConfirmModal
        open={Boolean(deletingManufacturer)}
        onClose={() => setDeletingManufacturer("")}
        message={"Are you sure you want to delete this branch?"}
        onOk={handleDelete}
      ></ConfirmModal>
    </Box>
  );
};

export default Manufacturers;
