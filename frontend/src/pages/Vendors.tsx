import React, { useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import BaseModal from "../components/common/BaseModal";
import CardGrid, { type CardItem } from "../components/common/CardGrid";
import VendorForm from "../components/vendor/VendorForm";
import type { Manufacturer } from "../types/manufacturer.types";
import type { Vendor, VendorFormData } from "../types/vendor.types";
import { SnackbarUtils } from "../utils/snackbar.util";
import { vendorServices } from "../services/vendor.service";
import ConfirmModal from "../components/common/ConfirmModal";

const Vendors: React.FC = () => {
  const [manufacturers] = useState<Pick<Manufacturer, "id" | "name">[]>([
    { id: 1, name: "Apple Inc." },
    { id: 2, name: "Dell Technologies" },
    { id: 3, name: "HP Inc." },
    { id: 4, name: "Lenovo Group" },
  ]);

  const [vendors, setVendors] = useState<Vendor[]>([
    {
      id: 1,
      contact_person: "John Smith",
      phone: "+1-555-0123",
      email: "john.smith@techsupply.com",
      gst_number: "GST123456789",
      manufacturer_id: 1,
    },
    {
      id: 2,
      contact_person: "Sarah Johnson",
      phone: "+1-555-0456",
      email: "sarah.j@dellpartner.com",
      gst_number: "GST987654321",
      manufacturer_id: 2,
    },
    {
      id: 3,
      contact_person: "Mike Wilson",
      phone: "+1-555-0789",
      email: "mike.wilson@hpreseller.com",
      gst_number: "GST456789123",
      manufacturer_id: 3,
    },
  ]);

  const [modalOpen, setModalOpen] = useState(false);
  const [editingVendor, setEditingVendor] = useState<Vendor | null>(null);
  const [deletingVendor, setDeletingVendor] = useState("");
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<VendorFormData>({
    defaultValues: {
      contact_person: "",
      phone: "",
      email: "",
      gst_number: "",
      manufacturer_id: 0,
    },
  });

  const handleCreate = () => {
    setEditingVendor(null);
    reset({
      contact_person: "",
      phone: "",
      email: "",
      gst_number: "",
      manufacturer_id: 0,
    });
    setModalOpen(true);
  };

  const handleEdit = (item: CardItem) => {
    const vendor = vendors.find((v) => v.id.toString() === item.id.toString());
    if (vendor) {
      setEditingVendor(vendor);
      reset({
        contact_person: vendor.contact_person,
        phone: vendor.phone,
        email: vendor.email,
        gst_number: vendor.gst_number,
        manufacturer_id: vendor.manufacturer_id,
      });
      setModalOpen(true);
    }
  };

  const onDeleteClick = (item: CardItem) => {
    setDeletingVendor(item.id.toString());
  };

  const handleDelete = async () => {
    try {
      setVendors(
        vendors.filter((v) => v.id.toString() !== deletingVendor.toString())
      );
      setDeletingVendor("");
      SnackbarUtils.success("Vendor Deleted!");
      await vendorServices.deleteVendor(Number(deletingVendor));
    } catch (error: unknown) {
      SnackbarUtils.error(error as string);
    }
  };

  const onSubmit = async (data: VendorFormData) => {
    if (editingVendor) {
      try {
        await vendorServices.editVendor(editingVendor.id, data);
        setVendors(
          vendors.map((v) =>
            v.id === editingVendor.id ? { ...v, ...data } : v
          )
        );
        SnackbarUtils.success("Vendor Updated!");
      } catch (error: unknown) {
        SnackbarUtils.error(error as string);
        return;
      }
    } else {
      try {
        const newVendor = await vendorServices.createVendor(data);
        setVendors([...vendors, newVendor]);
        SnackbarUtils.success("New Vendor Created!");
      } catch (error: unknown) {
        SnackbarUtils.error(error as string);
        return;
      }
    }

    setModalOpen(false);
    reset();
  };

  const getManufacturerName = (manufacturerId: number) => {
    const manufacturer = manufacturers.find((m) => m.id === manufacturerId);
    return manufacturer ? manufacturer.name : "Unknown";
  };

  const cardItems: CardItem[] = vendors.map((vendor) => ({
    id: vendor.id,
    title: vendor.contact_person,
    subtitle: vendor.email,
    description: `Phone: ${vendor.phone}`,
    metadata: [
      { label: "Email", value: vendor.email },
      { label: "Phone", value: vendor.phone },
      { label: "GST Number", value: vendor.gst_number },
      {
        label: "Manufacturer",
        value: getManufacturerName(vendor.manufacturer_id),
      },
    ],
    badges: [
      { label: getManufacturerName(vendor.manufacturer_id), color: "primary" },
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
          Vendor Management
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleCreate}
          sx={{ borderRadius: 2 }}
        >
          Add Vendor
        </Button>
      </Box>

      <CardGrid
        items={cardItems}
        onEdit={handleEdit}
        onDelete={handleDelete}
        emptyMessage="No vendors found. Add your first vendor!"
      />

      <BaseModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingVendor ? "Edit Vendor" : "Add New Vendor"}
        onSubmit={handleSubmit(onSubmit)}
        onCancel={() => setModalOpen(false)}
        submitText={editingVendor ? "Update" : "Add"}
      >
        <VendorForm
          errors={errors}
          control={control}
          manufacturers={manufacturers}
        />
      </BaseModal>
      <ConfirmModal
        open={Boolean(deletingVendor)}
        onClose={() => setDeletingVendor("")}
        message={"Are you sure you want to delete this branch?"}
        onOk={handleDelete}
      ></ConfirmModal>
    </Box>
  );
};

export default Vendors;
