import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  FormControlLabel,
  Switch,
  Grid,
} from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import { useForm, Controller } from "react-hook-form";
import BaseModal from "../components/common/BaseModal";
import CardGrid, { type CardItem } from "../components/common/CardGrid";
import type { Branch, BranchFormData } from "../types/branch.types";
import { yupResolver } from "@hookform/resolvers/yup";
import { branchSchema } from "../schemas/branch.schema";
import BranchForm from "../components/branch/BranchForm";
import { branchServices } from "../services/branches.service";
import { SnackbarUtils } from "../utils/snackbar.util";

const Branches: React.FC = () => {
  const [branches, setBranches] = useState<Branch[]>([
    {
      id: 1,
      name: "Main Branch",
      location: "New York City",
      pincode: "10001",
      code: "NYC001",
      isOpen: true,
    },
    {
      id: 2,
      name: "West Coast Branch",
      location: "Los Angeles",
      pincode: "90210",
      code: "LA002",
      isOpen: true,
    },
    {
      id: 3,
      name: "East Coast Branch",
      location: "Boston",
      pincode: "02101",
      code: "BOS003",
      isOpen: false,
    },
    {
      id: 4,
      name: "Central Branch",
      location: "Chicago",
      pincode: "60601",
      code: "CHI004",
      isOpen: true,
    },
  ]);

  const [modalOpen, setModalOpen] = useState(false);
  const [editingBranch, setEditingBranch] = useState<Branch | null>(null);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BranchFormData>({
    resolver: yupResolver(branchSchema),
    defaultValues: {
      name: "",
      location: "",
      pincode: "",
      code: "",
      isOpen: true,
    },
  });

  const handleCreate = () => {
    setEditingBranch(null);
    reset({
      name: "",
      location: "",
      pincode: "",
      code: "",
      isOpen: true,
    });
    setModalOpen(true);
  };

  const handleEdit = (item: CardItem) => {
    const branch = branches.find((b) => b.id.toString() === item.id.toString());
    if (branch) {
      setEditingBranch(branch);
      reset({
        name: branch.name,
        location: branch.location,
        pincode: branch.pincode,
        code: branch.code,
        isOpen: branch.isOpen,
      });
      setModalOpen(true);
    }
  };

  const handleDelete = async (item: CardItem) => {
    try {
      setBranches(
        branches.filter((b) => b.id.toString() !== item.id.toString())
      );
      await branchServices.deleteBranch(Number(item.id));
    } catch (error: unknown) {
      SnackbarUtils.error(error as string);
    }
  };

  const onSubmit = async (data: BranchFormData) => {
    if (editingBranch) {
      try {
        await branchServices.updateBranch(editingBranch.id, data);
        setBranches(
          branches.map((b) =>
            b.id === editingBranch.id ? { ...b, ...data } : b
          )
        );
      } catch (error: unknown) {
        SnackbarUtils.error(error as string);
      }
    } else {
      try {
        const newBranch = await branchServices.createBranch(data);
        setBranches([...branches, newBranch]);
      } catch (error: unknown) {
        SnackbarUtils.error(error as string);
      }
    }
    setModalOpen(false);
    reset();
  };

  const cardItems: CardItem[] = branches.map((branch) => ({
    id: branch.id,
    title: branch.name,
    subtitle: branch.code,
    description: branch.location,
    status: branch.isOpen ? "Open" : "Closed",
    metadata: [
      { label: "Location", value: branch.location },
      { label: "Pincode", value: branch.pincode },
      { label: "Code", value: branch.code },
    ],
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
          Branch Management
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleCreate}
          sx={{ borderRadius: 2 }}
        >
          Create Branch
        </Button>
      </Box>

      <CardGrid
        items={cardItems}
        onEdit={handleEdit}
        onDelete={handleDelete}
        emptyMessage="No branches found. Create your first branch!"
      />

      <BaseModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingBranch ? "Edit Branch" : "Create New Branch"}
        onSubmit={handleSubmit(onSubmit)}
        onCancel={() => setModalOpen(false)}
        submitText={editingBranch ? "Update" : "Create"}
      >
        <BranchForm errors={errors} control={control} />
      </BaseModal>
    </Box>
  );
};

export default Branches;
