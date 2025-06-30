import React from "react";
import { Container, Box } from "@mui/material";

interface PageContainerProps {
  children: React.ReactNode;
  maxWidth?: "xs" | "sm" | "md" | "lg" | "xl";
  py?: number;
}

const PageContainer: React.FC<PageContainerProps> = ({
  children,
  maxWidth = "lg",
  py = 4,
}) => (
  <Container maxWidth={maxWidth} sx={{ py }}>
    <Box display="flex" flexDirection="column" width="100%">
      {children}
    </Box>
  </Container>
);

export default PageContainer;
