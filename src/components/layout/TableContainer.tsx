import React from "react";
import { Box } from "@mui/material";
import { tableContainerStyles } from "./TableContainer.styles";

interface TableContainerProps {
  children: React.ReactNode;
  height?: number;
  minHeight?: number;
}

const TableContainer: React.FC<TableContainerProps> = ({
  children,
  minHeight = 400,
}) => <Box sx={tableContainerStyles(minHeight)}>{children}</Box>;

export default TableContainer;
