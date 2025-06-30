import { styled } from "@mui/material/styles";
import { IconButton } from "@mui/material";

export const StyledIconButton = styled(IconButton, {
  shouldForwardProp: (prop) => prop !== "$isFavourited",
})<{
  $isFavourited: boolean;
}>(({ theme, $isFavourited }) => ({
  color: $isFavourited
    ? theme.palette.secondary.main
    : theme.palette.action.disabled,
  outline: "none",
  "&:focus": {
    outline: "none",
  },
  "&:hover": {
    color: $isFavourited
      ? theme.palette.secondary.dark
      : theme.palette.secondary.main,
  },
}));
