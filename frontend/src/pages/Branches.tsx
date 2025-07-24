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

interface Branch {
  id: number;
  name: string;
  location: string;
  pincode: string;
  code: string;
  isOpen: boolean;
}

interface BranchFormData {
  name: string;
  location: string;
  pincode: string;
  code: string;
  isOpen: boolean;
}

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

  const handleDelete = (item: CardItem) => {
    setBranches(branches.filter((b) => b.id.toString() !== item.id.toString()));
  };

  const onSubmit = (data: BranchFormData) => {
    if (editingBranch) {
      setBranches(
        branches.map((b) => (b.id === editingBranch.id ? { ...b, ...data } : b))
      );
    } else {
      const newBranch: Branch = {
        id: Math.max(...branches.map((b) => b.id), 0) + 1,
        ...data,
      };
      setBranches([...branches, newBranch]);
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
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Controller
              name="name"
              control={control}
              rules={{ required: "Branch name is required" }}
              render={({ field }: any) => (
                <TextField
                  {...field}
                  label="Branch Name"
                  fullWidth
                  error={!!errors.name}
                  helperText={errors.name?.message}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="code"
              control={control}
              rules={{ required: "Branch code is required" }}
              render={({ field }: any) => (
                <TextField
                  {...field}
                  label="Branch Code"
                  fullWidth
                  error={!!errors.code}
                  helperText={errors.code?.message}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="location"
              control={control}
              rules={{ required: "Location is required" }}
              render={({ field }: any) => (
                <TextField
                  {...field}
                  label="Location"
                  fullWidth
                  error={!!errors.location}
                  helperText={errors.location?.message}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="pincode"
              control={control}
              rules={{ required: "Pincode is required" }}
              render={({ field }: any) => (
                <TextField
                  {...field}
                  label="Pincode"
                  fullWidth
                  error={!!errors.pincode}
                  helperText={errors.pincode?.message}
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="isOpen"
              control={control}
              render={({ field }: { field: any }) => (
                <FormControlLabel
                  control={
                    <Switch
                      checked={field.value}
                      onChange={field.onChange}
                      color="primary"
                    />
                  }
                  label="Branch is Open"
                />
              )}
            />
          </Grid>
        </Grid>
      </BaseModal>
    </Box>
  );
};

export default Branches;
