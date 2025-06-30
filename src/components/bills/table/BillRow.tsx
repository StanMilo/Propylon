import { memo } from "react";
import type { Bill } from "../../../types/oireachtas";
import { FavouriteButton } from "../../common";
import { getSponsorName, getStatusColor } from "../../../utils";
import {
  StyledTableRow,
  BillNumberCell,
  BillTypeCell,
  StatusCell,
  StatusChip,
  SponsorCell,
  SponsorText,
  FavouriteCell,
} from "./BillRow.styled";

interface BillRowProps {
  bill: Bill;
  onRowClick: (bill: Bill) => void;
  isFavourited: boolean;
  onToggleFavourite: (bill: Bill) => Promise<void>;
  favouritesLoading: boolean;
}

const BillRow = memo<BillRowProps>(
  ({
    bill,
    onRowClick,
    isFavourited,
    onToggleFavourite,
    favouritesLoading,
  }) => {
    const sponsorName = getSponsorName(bill);

    return (
      <StyledTableRow hover onClick={() => onRowClick(bill)}>
        <BillNumberCell component="th" scope="row">
          {bill.bill.billNo}/{bill.bill.billYear}
        </BillNumberCell>
        <BillTypeCell>{bill.bill.billType}</BillTypeCell>
        <StatusCell>
          <StatusChip
            label={bill.bill.status}
            color={getStatusColor(bill.bill.status)}
            size="small"
          />
        </StatusCell>
        <SponsorCell>
          <SponsorText variant="body2">{sponsorName}</SponsorText>
        </SponsorCell>
        <FavouriteCell align="center">
          <FavouriteButton
            bill={bill}
            isFavourited={isFavourited}
            onToggle={onToggleFavourite}
            disabled={favouritesLoading}
          />
        </FavouriteCell>
      </StyledTableRow>
    );
  }
);

export default BillRow;
