import type { SxProps, Theme } from "@mui/material";
import { alpha } from "@mui/material/styles";

export const tableContainerStyles = (minHeight: number): SxProps<Theme> => ({
  borderRadius: 2,
  boxShadow: (theme) => `0 4px 20px ${alpha(theme.palette.common.black, 0.08)}`,
  border: (theme) => `1px solid ${alpha(theme.palette.divider, 0.5)}`,
  overflow: "hidden",
  minHeight,
  transition: "min-height 0.3s ease-in-out",
  width: "100%",
  display: "flex",
  flexDirection: "column",

  maxHeight: {
    xs: "500px",
    sm: "600px",
    md: "700px",
  },

  "& .MuiTable-root": {
    width: "100%",
    tableLayout: "fixed",
  },

  "& .MuiTableCell-root": {
    padding: {
      xs: "6px 2px",
      sm: "8px 4px",
      md: "16px",
    },
    fontSize: {
      xs: "0.7rem",
      sm: "0.75rem",
      md: "0.875rem",
    },
    whiteSpace: {
      xs: "normal",
      sm: "normal",
      md: "nowrap",
    },
    overflow: "hidden",
    textOverflow: "ellipsis",
  },

  "& .MuiTableHead-root .MuiTableCell-root": {
    fontSize: {
      xs: "0.65rem",
      sm: "0.7rem",
      md: "0.8rem",
    },
    fontWeight: 600,
    whiteSpace: {
      xs: "normal",
      sm: "normal",
      md: "nowrap",
    },
    overflow: "hidden",
    textOverflow: "ellipsis",
  },

  "&::-webkit-scrollbar": {
    width: "8px",
  },
  "&::-webkit-scrollbar-track": {
    background: (theme) => alpha(theme.palette.primary.main, 0.1),
    borderRadius: "4px",
  },
  "&::-webkit-scrollbar-thumb": {
    background: (theme) => alpha(theme.palette.primary.main, 0.4),
    borderRadius: "4px",
    "&:hover": {
      background: (theme) => alpha(theme.palette.primary.main, 0.6),
    },
  },
});
