import React from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  IconButton,
  useTheme,
} from "@mui/material";
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as ViewIcon,
} from "@mui/icons-material";

export interface CardItem {
  id: string | number;
  title: string;
  subtitle?: string;
  description?: string;
  status?: string;
  badges?: Array<{
    label: string;
    color?: "primary" | "secondary" | "success" | "error" | "warning" | "info";
  }>;
  metadata?: Array<{ label: string; value: string }>;
}

interface CardGridProps {
  items: CardItem[];
  onEdit?: (item: CardItem) => void;
  onDelete?: (item: CardItem) => void;
  onView?: (item: CardItem) => void;
  loading?: boolean;
  emptyMessage?: string;
}

const CardGrid: React.FC<CardGridProps> = ({
  items,
  onEdit,
  onDelete,
  onView,
  loading = false,
  emptyMessage = "No items found",
}) => {
  const theme = useTheme();

  const getStatusColor = (status?: string) => {
    if (!status) return "default";
    switch (status.toLowerCase()) {
      case "active":
      case "open":
        return "success";
      case "inactive":
      case "closed":
        return "error";
      case "pending":
        return "warning";
      default:
        return "primary";
    }
  };

  if (loading) {
    return (
      <Grid container spacing={3}>
        {[...Array(6)].map((_, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <Card sx={{ height: 200, backgroundColor: "background.paper" }}>
              <CardContent>
                <Box sx={{ animation: "pulse 1.5s ease-in-out infinite" }}>
                  <Box
                    sx={{
                      height: 20,
                      bgcolor: "grey.700",
                      borderRadius: 1,
                      mb: 2,
                    }}
                  />
                  <Box
                    sx={{
                      height: 16,
                      bgcolor: "grey.700",
                      borderRadius: 1,
                      mb: 1,
                    }}
                  />
                  <Box
                    sx={{
                      height: 16,
                      bgcolor: "grey.700",
                      borderRadius: 1,
                      width: "70%",
                    }}
                  />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    );
  }

  if (items.length === 0) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: 200,
          textAlign: "center",
        }}
      >
        <Typography variant="h6" color="text.secondary">
          {emptyMessage}
        </Typography>
      </Box>
    );
  }

  return (
    <Grid container spacing={3}>
      {items.map((item) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
          <Card
            sx={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              transition: "all 0.2s ease-in-out",
              "&:hover": {
                transform: "translateY(-4px)",
                boxShadow: theme.shadows[8],
              },
              cursor: onView ? "pointer" : "default",
            }}
            onClick={onView ? () => onView(item) : undefined}
          >
            <CardContent sx={{ flexGrow: 1, p: 3 }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  mb: 2,
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: "bold",
                    fontSize: "1.1rem",
                    lineHeight: 1.3,
                    flex: 1,
                    mr: 1,
                  }}
                >
                  {item.title}
                </Typography>
                <Box sx={{ display: "flex", gap: 0.5 }}>
                  {onView && (
                    <IconButton
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation();
                        onView(item);
                      }}
                      sx={{ color: "text.secondary" }}
                    >
                      <ViewIcon fontSize="small" />
                    </IconButton>
                  )}
                  {onEdit && (
                    <IconButton
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation();
                        onEdit(item);
                      }}
                      sx={{ color: "primary.main" }}
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                  )}
                  {onDelete && (
                    <IconButton
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation();
                        onDelete(item);
                      }}
                      sx={{ color: "error.main" }}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  )}
                </Box>
              </Box>

              {item.subtitle && (
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 1, fontWeight: "medium" }}
                >
                  {item.subtitle}
                </Typography>
              )}

              {item.description && (
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    mb: 2,
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    lineHeight: 1.4,
                  }}
                >
                  {item.description}
                </Typography>
              )}

              {item.metadata && item.metadata.length > 0 && (
                <Box sx={{ mb: 2 }}>
                  {item.metadata.map((meta, index) => (
                    <Box
                      key={index}
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        mb: 0.5,
                      }}
                    >
                      <Typography variant="caption" color="text.secondary">
                        {meta.label}:
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{ fontWeight: "medium" }}
                      >
                        {meta.value}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              )}

              <Box
                sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: "auto" }}
              >
                {item.status && (
                  <Chip
                    label={item.status}
                    size="small"
                    color={getStatusColor(item.status) as any}
                    variant="outlined"
                  />
                )}
                {item.badges?.map((badge, index) => (
                  <Chip
                    key={index}
                    label={badge.label}
                    size="small"
                    color={badge.color || "primary"}
                    variant="outlined"
                  />
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default CardGrid;
