import React from "react";
import {
  Box,
  Typography,
  Divider,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Grid,
} from "@mui/material";

const GRNView: React.FC<any> = ({ grn }) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(amount);
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-IN");
  };

  return (
    <Box
      sx={{
        maxHeight: "80vh",
        display: "flex",
        flexDirection: "column",
        marginTop: "10px",
      }}
    >
      {/* Header Section */}
      <Box sx={{ mb: 3 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            mb: 2,
            flexDirection: { xs: "column", sm: "row" },
            gap: { xs: 2, sm: 0 },
          }}
        >
          <Chip
            label={grn.mode.toUpperCase()}
            color={grn.mode === "submit" ? "success" : "warning"}
            sx={{ borderRadius: 2 }}
          />
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2" color="text.secondary">
                GRN Number
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 500 }}>
                {grn.grn_number}
              </Typography>
            </Box>

            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2" color="text.secondary">
                GRN Date
              </Typography>
              <Typography variant="body1">
                {formatDate(grn.grn_date)}
              </Typography>
            </Box>

            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2" color="text.secondary">
                Invoice Number
              </Typography>
              <Typography variant="body1">
                {grn.invoice_number || "N/A"}
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2" color="text.secondary">
                Vendor
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 500 }}>
                {grn.vendor?.name || "N/A"}
              </Typography>
            </Box>

            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2" color="text.secondary">
                Branch
              </Typography>
              <Typography variant="body1">
                {grn.branch?.name || "N/A"}
              </Typography>
            </Box>

            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2" color="text.secondary">
                Total Amount
              </Typography>
              <Typography
                variant="h6"
                sx={{ fontWeight: 600, color: "primary.main" }}
              >
                {formatCurrency(grn.total_amount)}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>

      <Divider sx={{ mb: 3 }} />

      {/* Line Items Section */}
      <Box sx={{ flex: 1, minHeight: 0 }}>
        <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
          Line Items ({grn.line_items?.length})
        </Typography>

        <TableContainer
          component={Paper}
          sx={{
            maxHeight: "400px",
            overflow: "auto",
            borderRadius: 2,
            "&::-webkit-scrollbar": {
              width: "8px",
            },
            "&::-webkit-scrollbar-track": {
              backgroundColor: "#f1f1f1",
              borderRadius: "4px",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "#c1c1c1",
              borderRadius: "4px",
              "&:hover": {
                backgroundColor: "#a8a8a8",
              },
            },
          }}
        >
          {grn.line_items.length > 0 ? (
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 600 }}>Item Name</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 600 }}>
                    Quantity
                  </TableCell>
                  <TableCell align="right" sx={{ fontWeight: 600 }}>
                    Unit Price
                  </TableCell>
                  <TableCell align="right" sx={{ fontWeight: 600 }}>
                    Tax %
                  </TableCell>
                  <TableCell align="right" sx={{ fontWeight: 600 }}>
                    Taxable Amount
                  </TableCell>
                  <TableCell align="right" sx={{ fontWeight: 600 }}>
                    Total Amount
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {grn.line_items?.map((item: any) => (
                  <TableRow key={item.id} hover>
                    <TableCell>
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        {item.name}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      {item.quantity.toLocaleString()}
                    </TableCell>
                    <TableCell align="right">
                      {formatCurrency(item.unit_price)}
                    </TableCell>
                    <TableCell align="right">{item.tax_percentage}%</TableCell>
                    <TableCell align="right">
                      {formatCurrency(item.taxable_amount)}
                    </TableCell>
                    <TableCell align="right" sx={{ fontWeight: 500 }}>
                      {formatCurrency(item.total_amount)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : null}
        </TableContainer>
      </Box>

      {/* Footer Section */}
      <Box sx={{ mt: 3, pt: 2, borderTop: 1, borderColor: "divider" }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography variant="caption" color="text.secondary">
              Created: {formatDate(grn.created_at)}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ textAlign: { sm: "right" } }}
            >
              Updated: {formatDate(grn.updated_at)}
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default GRNView;
