import { useState, useMemo } from "react";
import {
  Typography,
  Box,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import type { SelectChangeEvent } from "@mui/material";

import { BillsTable } from "../components/bills/table";
import { PageContainer } from "../components/layout";
import { useBills, useFavouritedBills, useFavourites } from "../hooks";
import { t } from "../translations";
import { getUniqueBillTypes } from "../utils";

const BillsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [favouritesPage, setFavouritesPage] = useState(0);
  const [favouritesPageSize, setFavouritesPageSize] = useState(10);
  const [billTypeFilter, setBillTypeFilter] = useState("all");

  const {
    bills,
    pagination,
    loading,
    error,
    changePage,
    changePageSize,
    changeBillType,
  } = useBills();
  const favourites = useFavourites();

  // Simple filtering of favourite keys
  const favouritedBillKeys = useMemo(() => {
    return favourites.favourites.filter((key) => {
      if (!key || typeof key !== "string") return false;
      const [billNo, billYear] = key.split("/");
      return billNo && billYear && billYear !== "undefined";
    });
  }, [favourites.favourites]);

  const favouritedBillKeysString = favouritedBillKeys.join(",");

  const {
    bills: favouritedBills,
    pagination: favouritedPagination,
    loading: favouritesLoading,
    error: favouritesError,
  } = useFavouritedBills(
    favouritedBillKeysString,
    favouritesPage,
    favouritesPageSize
  );

  const displayBills = activeTab === 0 ? bills : favouritedBills;
  const displayPagination = activeTab === 0 ? pagination : favouritedPagination;
  const displayLoading = activeTab === 0 ? loading : favouritesLoading;
  const displayError = activeTab === 0 ? error : favouritesError;

  const handleFavouritesPageChange = (newPage: number) =>
    setFavouritesPage(newPage);
  const handleFavouritesPageSizeChange = (newPageSize: number) => {
    setFavouritesPageSize(newPageSize);
    setFavouritesPage(0);
  };

  const handleTabChange = (newTab: number) => {
    setActiveTab(newTab);
    if (newTab === 1) setFavouritesPage(0);
  };

  const uniqueBillTypes = useMemo(() => getUniqueBillTypes(bills), [bills]);

  const handleBillTypeFilterChange = (event: SelectChangeEvent) => {
    const newType = event.target.value as string;
    setBillTypeFilter(newType);
    setFavouritesPage(0);
    changeBillType(newType);
  };

  return (
    <PageContainer>
      <Box display="flex" flexDirection="column" mb={3}>
        <Typography variant="h4" component="h1" gutterBottom>
          {t("bills.title")}
        </Typography>
        <Box display="flex" alignItems="flex-start" mt={1}>
          <FormControl sx={{ minWidth: 200 }} size="small">
            <InputLabel id="bill-type-filter-label">
              {t("bills.table.filterByType")}
            </InputLabel>
            <Select
              labelId="bill-type-filter-label"
              id="bill-type-filter"
              value={billTypeFilter}
              label={t("bills.table.filterByType")}
              onChange={handleBillTypeFilterChange}
            >
              <MenuItem value="all">{t("bills.table.allTypes")}</MenuItem>
              {uniqueBillTypes.map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Box>

      {displayError && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {displayError}
        </Alert>
      )}

      <BillsTable
        bills={displayBills}
        pagination={displayPagination}
        loading={displayLoading}
        onPageChange={activeTab === 0 ? changePage : handleFavouritesPageChange}
        onPageSizeChange={
          activeTab === 0 ? changePageSize : handleFavouritesPageSizeChange
        }
        favourites={{
          isFavourited: favourites.isFavourited,
          toggleFavourite: favourites.toggleFavourite,
          isLoading: false,
        }}
        activeTab={activeTab}
        onTabChange={handleTabChange}
        favouritedBillKeys={favouritedBillKeys}
        allBillsPagination={pagination}
      />
    </PageContainer>
  );
};

export default BillsPage;
