import React from "react";
import { TableCell, TableRow, TableHead } from "@mui/material";
import { t } from "../../../translations";

const BillsTableHeader: React.FC = () => (
  <TableHead>
    <TableRow
      sx={{
        background: (theme) =>
          `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
        "& .MuiTableCell-head": {
          color: "white",
          fontWeight: 700,
          fontSize: {
            xs: "0.7rem",
            sm: "0.75rem",
            md: "0.9rem",
          },
          textTransform: "uppercase",
          letterSpacing: "0.5px",
          borderBottom: "none",
          py: {
            xs: 1,
            sm: 1.5,
            md: 2,
          },
          background: "inherit",
          position: "sticky",
          top: 0,
          zIndex: 10,
        },
      }}
    >
      <TableCell
        sx={{
          width: "15%",
          fontSize: {
            xs: "0.6rem",
            sm: "0.7rem",
            md: "0.8rem",
          },
        }}
      >
        {t("bills.table.billNumber")}
      </TableCell>
      <TableCell
        sx={{
          width: "15%",
          fontSize: {
            xs: "0.6rem",
            sm: "0.7rem",
            md: "0.8rem",
          },
        }}
      >
        {t("bills.table.billType")}
      </TableCell>
      <TableCell
        sx={{
          width: "15%",
          fontSize: {
            xs: "0.6rem",
            sm: "0.7rem",
            md: "0.8rem",
          },
        }}
      >
        {t("bills.table.billStatus")}
      </TableCell>
      <TableCell
        sx={{
          width: "40%",
          fontSize: {
            xs: "0.6rem",
            sm: "0.7rem",
            md: "0.8rem",
          },
        }}
      >
        {t("bills.table.sponsor")}
      </TableCell>
      <TableCell
        align="center"
        sx={{
          width: "15%",
          fontSize: {
            xs: "0.6rem",
            sm: "0.7rem",
            md: "0.8rem",
          },
        }}
      >
        {t("bills.table.favourite")}
      </TableCell>
    </TableRow>
  </TableHead>
);

export default BillsTableHeader;
