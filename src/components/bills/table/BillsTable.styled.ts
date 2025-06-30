import { styled } from "@mui/material/styles";
import { Table, TableBody, Box } from "@mui/material";

export const StyledTable = styled(Table)({
  width: "100%",
  minWidth: "100%",
  tableLayout: "fixed",
  borderCollapse: "separate",
  borderSpacing: 0,
});

export const StyledTableBody = styled(TableBody)({
  "& tr:last-child td": { borderBottom: 0 },
});

export const PaginationContainer = styled(Box)({
  marginTop: 16,
  width: "100%",
  overflow: "auto",
});

export const ScrollableTableContainer = styled(Box)(({ theme }) => ({
  overflow: "auto",
  width: "100%",

  "&::-webkit-scrollbar": {
    width: "8px",
  },
  "&::-webkit-scrollbar-track": {
    background: theme.palette.primary.main + "20",
    borderRadius: "4px",
  },
  "&::-webkit-scrollbar-thumb": {
    background: theme.palette.primary.main + "66",
    borderRadius: "4px",
    "&:hover": {
      background: theme.palette.primary.main + "99",
    },
  },
}));

export const TableWrapper = styled(Box)({
  width: "100%",
});
