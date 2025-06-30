import { Tab } from "@mui/material";
import { t } from "../../../translations";
import type { PaginationInfo } from "../../../types/oireachtas";
import {
  TabsContainer,
  StyledTabs,
  TabLabelContainer,
  StyledChip,
} from "./BillsTabs.styled";

interface BillsTabsProps {
  activeTab: number;
  onTabChange: (tab: number) => void;
  favouritedBillKeys: string[];
  allBillsPagination: PaginationInfo | null;
}

const BillsTabs: React.FC<BillsTabsProps> = ({
  activeTab,
  onTabChange,
  favouritedBillKeys,
  allBillsPagination,
}) => (
  <TabsContainer>
    <StyledTabs
      value={activeTab}
      onChange={(_event, newValue) => onTabChange(newValue)}
    >
      <Tab
        label={
          <TabLabelContainer>
            {t("bills.allBills")}
            {allBillsPagination && (
              <StyledChip
                $isPrimary
                label={allBillsPagination.totalCount}
                size="small"
                variant="outlined"
              />
            )}
          </TabLabelContainer>
        }
      />
      <Tab
        label={
          <TabLabelContainer>
            {t("bills.favourites")}
            <StyledChip
              label={favouritedBillKeys.length}
              size="small"
              variant="outlined"
            />
          </TabLabelContainer>
        }
      />
    </StyledTabs>
  </TabsContainer>
);

export default BillsTabs;
