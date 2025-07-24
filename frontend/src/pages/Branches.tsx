import React, { useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import BaseModal from "../components/common/BaseModal";
import CardGrid, { type CardItem } from "../components/common/CardGrid";
import type { Branch, BranchFormData } from "../types/branch.types";
import { yupResolver } from "@hookform/resolvers/yup";
import { branchSchema } from "../schemas/branch.schema";
import BranchForm from "../components/branch/BranchForm";
import { branchServices } from "../services/branches.service";
import { SnackbarUtils } from "../utils/snackbar.util";
import ConfirmModal from "../components/common/ConfirmModal";
import { useMasterData } from "../contexts/master-data.context";

const Branches: React.FC = () => {
  const { branches, setBranches } = useMasterData();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingBranch, setEditingBranch] = useState<Branch | null>(null);
  const [deletingBranch, setDeletingBranch] = useState("");
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
      is_open: true,
    },
  });

  const handleCreate = () => {
    setEditingBranch(null);
    reset({
      name: "",
      location: "",
      pincode: "",
      code: "",
      is_open: true,
    });
    setModalOpen(true);
  };

  const handleEdit = (item: CardItem) => {
    const branch = branches?.find((b) => b.id.toString() === item.id.toString());
    if (branch) {
      setEditingBranch(branch);
      reset({
        name: branch.name,
        location: branch.location,
        pincode: branch.pincode,
        code: branch.code,
        is_open: branch.is_open,
      });
      setModalOpen(true);
    }
  };

  const onDeleteClick = (item: CardItem) => {
    setDeletingBranch(item.id.toString());
  };

  const handleDelete = async () => {
    try {
      console.log("Handling deltee")
      setBranches(
        branches?.filter((b) => b.id.toString() !== deletingBranch.toString())
      );
      setDeletingBranch("");
      SnackbarUtils.success("Branch Deleted !");
      await branchServices.deleteBranch(Number(deletingBranch));
    } catch (error: unknown) {
      SnackbarUtils.error(error as string);
    }
  };

  const onSubmit = async (data: BranchFormData) => {
    if (editingBranch) {
      try {
        await branchServices.updateBranch(editingBranch.id, data);
        setBranches(
          branches?.map((b) =>
            b.id === editingBranch.id ? { ...b, ...data } : b
          )
        );
        SnackbarUtils.success("Branch Updated");
      } catch (error: unknown) {
        SnackbarUtils.error(error as string);
        return;
      }
    } else {
      try {
        const newBranch = await branchServices.createBranch(data);
        setBranches([...branches, newBranch]);
        SnackbarUtils.success("New Branch Created!");
      } catch (error: unknown) {
        SnackbarUtils.error(error as string);
        return;
      }
    }
    setModalOpen(false);
    reset();
  };

  const cardItems: CardItem[] = branches?.map((branch) => ({
    id: branch.id,
    title: branch.name,
    subtitle: branch.code,
    description: branch.location,
    status: branch.is_open ? "Open" : "Closed",
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
        onDelete={onDeleteClick}
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
      <ConfirmModal
        open={Boolean(deletingBranch)}
        onClose={() => setDeletingBranch("")}
        message={"Are you sure you want to delete this branch?"}
        onOk={handleDelete}
      ></ConfirmModal>
    </Box>
  );
};

export default Branches;
