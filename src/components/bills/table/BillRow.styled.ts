import { styled } from "@mui/material/styles";
import { TableRow, TableCell, Chip, Typography } from "@mui/material";
import { alpha } from "@mui/material/styles";

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
  cursor: "pointer",
  transition: "all 0.2s ease-in-out",
  "&:hover": {
    backgroundColor: alpha(theme.palette.primary.main, 0.04),
    transform: "translateY(-1px)",
    boxShadow: `0 2px 8px ${alpha(theme.palette.common.black, 0.1)}`,
  },
  "&:nth-of-type(even)": {
    backgroundColor: alpha(theme.palette.grey[50], 0.5),
  },
  "&:nth-of-type(even):hover": {
    backgroundColor: alpha(theme.palette.primary.main, 0.04),
  },
}));

export const BillNumberCell = styled(TableCell)(({ theme }) => ({
  width: "15%",
  fontWeight: 600,
  color: theme.palette.primary.main,
  [theme.breakpoints.up("xs")]: {
    fontSize: "0.65rem",
    whiteSpace: "normal",
  },
  [theme.breakpoints.up("sm")]: {
    fontSize: "0.7rem",
    whiteSpace: "normal",
  },
  [theme.breakpoints.up("md")]: {
    fontSize: "0.9rem",
    whiteSpace: "nowrap",
  },
  wordBreak: "break-all",
  overflow: "hidden",
  textOverflow: "ellipsis",
}));

export const BillTypeCell = styled(TableCell)(({ theme }) => ({
  width: "15%",
  fontWeight: 500,
  color: theme.palette.text.secondary,
  [theme.breakpoints.up("xs")]: {
    fontSize: "0.6rem",
    whiteSpace: "normal",
  },
  [theme.breakpoints.up("sm")]: {
    fontSize: "0.65rem",
    whiteSpace: "normal",
  },
  [theme.breakpoints.up("md")]: {
    fontSize: "0.875rem",
    whiteSpace: "nowrap",
  },
  wordBreak: "break-word",
  overflow: "hidden",
  textOverflow: "ellipsis",
}));

export const StatusCell = styled(TableCell)({
  width: "15%",
});

export const StatusChip = styled(Chip)(({ theme }) => ({
  fontWeight: 600,
  textTransform: "capitalize",
  boxShadow: `0 1px 3px ${alpha(theme.palette.common.black, 0.1)}`,
  [theme.breakpoints.up("xs")]: {
    fontSize: "0.55rem",
    height: "18px",
  },
  [theme.breakpoints.up("sm")]: {
    fontSize: "0.6rem",
    height: "20px",
  },
  [theme.breakpoints.up("md")]: {
    fontSize: "0.75rem",
    height: "24px",
  },
  maxWidth: "100%",
  overflow: "hidden",
  textOverflow: "ellipsis",
}));

export const SponsorCell = styled(TableCell)(({ theme }) => ({
  width: "40%",
  verticalAlign: "middle",
  [theme.breakpoints.up("xs")]: {
    paddingTop: 4,
    paddingBottom: 4,
  },
  [theme.breakpoints.up("sm")]: {
    paddingTop: 6,
    paddingBottom: 6,
  },
  [theme.breakpoints.up("md")]: {
    paddingTop: 12,
    paddingBottom: 12,
  },
  overflow: "hidden",
  whiteSpace: "normal",
}));

export const SponsorText = styled(Typography)(({ theme }) => ({
  display: "block",
  lineHeight: 1.4,
  color: theme.palette.text.primary,
  fontWeight: 500,
  maxWidth: "100%",
  [theme.breakpoints.up("xs")]: {
    fontSize: "0.6rem",
  },
  [theme.breakpoints.up("sm")]: {
    fontSize: "0.65rem",
  },
  [theme.breakpoints.up("md")]: {
    fontSize: "0.875rem",
  },
  wordBreak: "break-word",
  overflowWrap: "break-word",
  hyphens: "auto",
  whiteSpace: "normal",
}));

export const FavouriteCell = styled(TableCell)({
  width: "15%",
});
