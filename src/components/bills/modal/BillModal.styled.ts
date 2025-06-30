import { styled } from "@mui/material/styles";
import { Dialog, DialogTitle, DialogContent, IconButton } from "@mui/material";

export const StyledDialog = styled(Dialog)({
  "& .MuiDialog-paper": {
    minHeight: "500px",
  },
});

export const StyledDialogTitle = styled(DialogTitle)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  paddingRight: 8,
});

export const StyledDialogContent = styled(DialogContent)(({ theme }) => ({
  "& .MuiTabs-root": {
    borderBottom: 1,
    borderColor: theme.palette.divider,
  },
}));

export const StyledIconButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.text.secondary,
  "&:hover": {
    color: theme.palette.text.primary,
  },
}));
