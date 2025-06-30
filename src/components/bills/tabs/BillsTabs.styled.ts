import { styled } from "@mui/material/styles";
import { Box, Tabs, Chip, alpha } from "@mui/material";

export const TabsContainer = styled(Box)(({ theme }) => ({
  borderBottom: 1,
  borderColor: theme.palette.divider,
  marginBottom: theme.spacing(3),
  background: `linear-gradient(90deg, ${alpha(
    theme.palette.primary.main,
    0.02
  )} 0%, ${alpha(theme.palette.secondary.main, 0.02)} 100%)`,
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(0.5),
}));

export const StyledTabs = styled(Tabs)(({ theme }) => ({
  "& .MuiTab-root": {
    fontWeight: 600,
    textTransform: "none",
    fontSize: "1rem",
    minHeight: 48,
    borderRadius: theme.shape.borderRadius,
    margin: theme.spacing(0, 0.5),
    "&.Mui-selected": {
      backgroundColor: alpha(theme.palette.primary.main, 0.1),
      color: theme.palette.primary.main,
    },
  },
}));

export const TabLabelContainer = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: 8,
});

export const StyledChip = styled(Chip, {
  shouldForwardProp: (prop) => prop !== "$isPrimary",
})<{ $isPrimary?: boolean }>(({ theme, $isPrimary = false }) => ({
  fontSize: "0.75rem",
  fontWeight: 600,
  borderColor: $isPrimary
    ? theme.palette.primary.main
    : theme.palette.secondary.main,
  color: $isPrimary ? theme.palette.primary.main : theme.palette.secondary.main,
}));
