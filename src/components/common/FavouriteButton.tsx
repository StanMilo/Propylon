import React from "react";
import { Tooltip } from "@mui/material";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import type { Bill } from "../../types/oireachtas";
import { t } from "../../translations";
import { StyledIconButton } from "./FavouriteButton.styled";

interface FavouriteButtonProps {
  bill: Bill;
  isFavourited: boolean;
  onToggle: (bill: Bill) => void;
  disabled?: boolean;
}

const FavouriteButton: React.FC<FavouriteButtonProps> = ({
  bill,
  isFavourited,
  onToggle,
  disabled = false,
}) => {
  const handleClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    onToggle(bill);
  };

  return (
    <Tooltip
      title={
        isFavourited ? t("bills.favourite.remove") : t("bills.favourite.add")
      }
    >
      {disabled ? (
        <span>
          <StyledIconButton
            $isFavourited={isFavourited}
            onClick={handleClick}
            disabled={disabled}
          >
            {isFavourited ? <Favorite /> : <FavoriteBorder />}
          </StyledIconButton>
        </span>
      ) : (
        <StyledIconButton
          $isFavourited={isFavourited}
          onClick={handleClick}
          disabled={disabled}
        >
          {isFavourited ? <Favorite /> : <FavoriteBorder />}
        </StyledIconButton>
      )}
    </Tooltip>
  );
};

export default FavouriteButton;
