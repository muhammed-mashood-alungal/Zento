import React, { useEffect, useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import { Add as AddIcon, FileDownload, Upload } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import CardGrid, { type CardItem } from "../components/common/CardGrid";
import ConfirmModal from "../components/common/ConfirmModal";
import { SnackbarUtils } from "../utils/snackbar.util";
import type {
  GRNAttributes,
  GRNHeaderAttributes,
  GRNResponseAttributes,
} from "../types/grn.types";
import { grnServices } from "../services/grn.service";
import { OpenInNew } from "@mui/icons-material";
import BaseModal from "../components/common/BaseModal";
import GRNView from "../components/GRN/GRNView";

interface GRN {
  id: number;
  grn_number: string;
  supplier_name: string;
  po_number: string;
  received_date: string;
  total_amount: number;
  status: "draft" | "submitted" | "approved" | "rejected";
  items_count: number;
  created_by: string;
}

const GRNList: React.FC = () => {
  const navigate = useNavigate();
  const [deletingGRN, setDeletingGRN] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [grns, setGrns] = useState<GRNResponseAttributes[]>([]);
  const [selectedGRN, setSelectedGRN] = useState<GRNResponseAttributes | null>(
    null
  );
  const limit = 8;

  async function fetchGRNS() {
    try {
      const { data, pagination } = await grnServices.fetchAllGRNs(
        currentPage,
        limit
      );
      setCurrentPage(pagination.page);
      console.log(data, pagination);
      setTotalPages(pagination.totalPages);
      setGrns(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchGRNS();
  }, [currentPage]);

  // Mock GRN data - replace with actual data from context/API

  const handleCreateNew = () => {
    navigate("/grn/create");
  };

  const handleEdit = (item: CardItem) => {
    navigate(`/grn/edit/${item.id}`);
  };

  const onDeleteClick = (item: CardItem) => {
    setDeletingGRN(item.id.toString());
  };

  const handleDelete = async () => {
    try {
      console.log("Deleting GRN");
      setGrns(grns.filter((g) => g.id.toString() !== deletingGRN.toString()));
      setDeletingGRN("");
      SnackbarUtils.success("GRN Deleted Successfully!");
      // Add actual delete API call here
    } catch (error: unknown) {
      SnackbarUtils.error(error as string);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "submit":
        return "primary";
      case "draft":
        return "warning";
      default:
        return "default";
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(amount);
  };

  const handleView = (item: CardItem) => {
    const grn = grns.find((g) => g.id == item.id);
    setSelectedGRN(grn as GRNResponseAttributes);
  };

  const cardItems: CardItem[] = grns?.map((grn) => ({
    id: grn.id,
    title: grn.grn_number,
    subtitle: grn.vendor?.contact_person || "N/A",
    status: grn.mode,
    metadata: [
      {
        label: "Received Date",
        value: new Date(grn.grn_date).toLocaleDateString(),
      },
      {
        label: "Total Amount",
        value: formatCurrency(grn.total_amount) || "N/A",
      },
      { label: "Invoice Number", value: grn.invoice_number || "N/A" },
      {
        label: "Branch",
        value: grn.branch ? `${grn.branch?.name} (${grn.branch?.code})` : "N/A",
      },
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
          flexDirection: { xs: "column", sm: "row" },
          gap: { xs: 2, sm: 0 },
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: "bold" }}>
          GRN Management
        </Typography>
        <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
          <Button
            variant="outlined"
            startIcon={<Upload />}
            sx={{ borderRadius: 2 }}
          >
            Import
          </Button>
          <Button
            variant="outlined"
            startIcon={<FileDownload />}
            sx={{ borderRadius: 2 }}
          >
            Export
          </Button>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleCreateNew}
            sx={{ borderRadius: 2 }}
          >
            Create New GRN
          </Button>
        </Box>
      </Box>

      <CardGrid
        items={cardItems}
        onEdit={handleEdit}
        onView={handleView}
        emptyMessage="No GRNs found. Create your first GRN!"
      />
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        gap={2}
        mt={2}
      >
        <Button
          variant="outlined"
          onClick={() => setCurrentPage((c) => (c == 1 ? c : c - 1))}
        >
          Prev
        </Button>
        <Typography>
          {currentPage} of {totalPages}
        </Typography>
        <Button
          variant="outlined"
          onClick={() => setCurrentPage((c) => (c == totalPages ? c : c + 1))}
        >
          Next
        </Button>
      </Box>

      <BaseModal open={Boolean(selectedGRN)} onClose={()=>setSelectedGRN(null)} title="GRN Details">
      {selectedGRN && <GRNView grn={selectedGRN} />}
      </BaseModal>

      <ConfirmModal
        open={Boolean(deletingGRN)}
        onClose={() => setDeletingGRN("")}
        message="Are you sure you want to delete this GRN? This action cannot be undone."
        onOk={handleDelete}
      />
    </Box>
  );
};

export default GRNList;
