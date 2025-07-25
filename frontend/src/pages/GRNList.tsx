import React, { useEffect, useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import { Add as AddIcon, FileDownload } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import CardGrid, { type CardItem } from "../components/common/CardGrid";
import ConfirmModal from "../components/common/ConfirmModal";
import { SnackbarUtils } from "../utils/snackbar.util";
import type { GRNResponseAttributes } from "../types/grn.types";
import { grnServices } from "../services/grn.service";
import BaseModal from "../components/common/BaseModal";
import GRNView from "../components/GRN/GRNView";
import GRNReportDownload from "../components/GRN/GRNReportDownalodModal";

const GRNList: React.FC = () => {
  const navigate = useNavigate();
  const [deletingGRN, setDeletingGRN] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [grns, setGrns] = useState<GRNResponseAttributes[]>([]);
  const [selectedGRN, setSelectedGRN] = useState<GRNResponseAttributes | null>(
    null
  );
  const [isFilterModalOPen, setIsFilterModalOpen] = useState(false);
  const limit = 8;

  async function fetchGRNS() {
    try {
      const { data, pagination } = await grnServices.fetchAllGRNs(
        currentPage,
        limit
      );
      setCurrentPage(pagination.page);
      setTotalPages(pagination.totalPages);
      setGrns(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchGRNS();
  }, [currentPage]);

  const handleCreateNew = () => {
    navigate("/grn/create");
  };

  const handleEdit = (item: CardItem) => {
    navigate(`/grn/edit/${item.id}`);
  };

  const handleDelete = async () => {
    try {
      setGrns(grns.filter((g) => g.id.toString() !== deletingGRN.toString()));
      setDeletingGRN("");
      SnackbarUtils.success("GRN Deleted Successfully!");
    } catch (error: unknown) {
      SnackbarUtils.error(error as string);
    }
  };
  const onDownload = async (filters: any) => {
    const payload = {
      from: filters.from,
      to: filters.to,
      vendor_id: filters.vendorId,
      branch_id: filters.branchId,
    };
    await grnServices.download(payload);
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
            startIcon={<FileDownload />}
            sx={{ borderRadius: 2 }}
            onClick={() => setIsFilterModalOpen(true)}
          >
            Export Excel
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

      <BaseModal
        open={Boolean(selectedGRN)}
        onClose={() => setSelectedGRN(null)}
        title="GRN Details"
      >
        {selectedGRN && <GRNView grn={selectedGRN} />}
      </BaseModal>

      <ConfirmModal
        open={Boolean(deletingGRN)}
        onClose={() => setDeletingGRN("")}
        message="Are you sure you want to delete this GRN? This action cannot be undone."
        onOk={handleDelete}
      />

      <BaseModal
        open={isFilterModalOPen}
        onClose={() => setIsFilterModalOpen(false)}
        title="Download Report"
      >
        <GRNReportDownload onDownload={onDownload} />
      </BaseModal>
    </Box>
  );
};

export default GRNList;
