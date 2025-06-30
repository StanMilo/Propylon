import React, { useState } from "react";
import { TableCell, TableRow, Typography, Box } from "@mui/material";
import type { Bill, PaginationInfo } from "../../../types/oireachtas";
import { t } from "../../../translations";
import { BillsTabs } from "../index";
import { BillModal } from "../modal";
import { Pagination } from "../../common";
import BillsTableHeader from "./BillsTableHeader";
import BillRow from "./BillRow";
import { TableContainer } from "../../layout";
import {
  StyledTable,
  StyledTableBody,
  PaginationContainer,
  ScrollableTableContainer,
  TableWrapper,
} from "./BillsTable.styled";

interface BillsTableProps {
  bills: Bill[];
  pagination: PaginationInfo | null;
  loading?: boolean;
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
  favourites: {
    isFavourited: (bill: Bill) => boolean;
    toggleFavourite: (bill: Bill) => Promise<void>;
    isLoading: boolean;
  };
  activeTab: number;
  onTabChange: (tab: number) => void;
  favouritedBillKeys: string[];
  allBillsPagination: PaginationInfo | null;
}

const BillsTable: React.FC<BillsTableProps> = ({
  bills,
  pagination,
  loading = false,
  onPageChange,
  onPageSizeChange,
  favourites,
  activeTab,
  onTabChange,
  favouritedBillKeys,
  allBillsPagination,
}) => {
  const [selectedBill, setSelectedBill] = useState<Bill | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleRowClick = (bill: Bill) => {
    setSelectedBill(bill);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedBill(null);
  };

  const renderTableContent = () => {
    if (loading && bills.length === 0) {
      return (
        <TableRow>
          <TableCell colSpan={5}>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              py={8}
            >
              <Typography variant="h6" color="text.secondary">
                {t("bills.loading")}
              </Typography>
            </Box>
          </TableCell>
        </TableRow>
      );
    }

    if (activeTab === 1 && bills.length === 0 && !loading) {
      return (
        <TableRow>
          <TableCell colSpan={5}>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              py={8}
            >
              <Typography variant="h6" color="text.secondary">
                {t("bills.noFavourites")}
              </Typography>
            </Box>
          </TableCell>
        </TableRow>
      );
    }

    return bills.map((bill) => (
      <BillRow
        key={`${bill.bill.billNo}-${bill.bill.billYear}`}
        bill={bill}
        onRowClick={handleRowClick}
        isFavourited={favourites.isFavourited(bill)}
        onToggleFavourite={favourites.toggleFavourite}
        favouritesLoading={favourites.isLoading}
      />
    ));
  };

  return (
    <TableWrapper>
      <BillsTabs
        activeTab={activeTab}
        onTabChange={onTabChange}
        favouritedBillKeys={favouritedBillKeys}
        allBillsPagination={allBillsPagination}
      />

      <TableContainer>
        <StyledTable
          sx={{
            tableLayout: {
              xs: "auto",
              sm: "auto",
              md: "fixed",
            },
          }}
          aria-label="bills table"
        >
          <BillsTableHeader />
        </StyledTable>

        <ScrollableTableContainer>
          <StyledTable>
            <StyledTableBody>{renderTableContent()}</StyledTableBody>
          </StyledTable>
        </ScrollableTableContainer>
      </TableContainer>

      {pagination && (
        <PaginationContainer>
          <Pagination
            pagination={pagination}
            onPageChange={onPageChange}
            onPageSizeChange={onPageSizeChange}
          />
        </PaginationContainer>
      )}

      <BillModal
        bill={selectedBill}
        open={modalOpen}
        onClose={handleCloseModal}
      />
    </TableWrapper>
  );
};

export default BillsTable;
