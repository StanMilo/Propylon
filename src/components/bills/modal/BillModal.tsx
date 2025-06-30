import { useState } from "react";
import { Tabs, Tab, Box, Typography } from "@mui/material";
import { Close } from "@mui/icons-material";
import type { Bill } from "../../../types/oireachtas";
import { t } from "../../../translations";
import TabPanel from "./TabPanel";
import BillContent from "./BillContent";
import {
  StyledDialog,
  StyledDialogTitle,
  StyledDialogContent,
  StyledIconButton,
} from "./BillModal.styled";

interface BillModalProps {
  bill: Bill | null;
  open: boolean;
  onClose: () => void;
}

function a11yProps(index: number) {
  return {
    id: `bill-tab-${index}`,
    "aria-controls": `bill-tabpanel-${index}`,
  };
}

const BillModal: React.FC<BillModalProps> = ({ bill, open, onClose }) => {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleClose = () => {
    setTabValue(0);
    onClose();
  };

  if (!bill) return null;

  return (
    <StyledDialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <StyledDialogTitle>
        <Box>
          <Typography variant="h6" component="div">
            {t("bills.modal.billDetails")} - {bill.bill.billNo}/
            {bill.bill.billYear}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {bill.bill.billType} • {bill.bill.status}
          </Typography>
        </Box>
        <StyledIconButton onClick={handleClose}>
          <Close />
        </StyledIconButton>
      </StyledDialogTitle>

      <StyledDialogContent>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          aria-label="bill language tabs"
        >
          <Tab label={t("bills.modal.englishTab")} {...a11yProps(0)} />
          <Tab label={t("bills.modal.irishTab")} {...a11yProps(1)} />
        </Tabs>

        <TabPanel value={tabValue} index={0}>
          <BillContent bill={bill} language="en" />
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <BillContent bill={bill} language="ga" />
        </TabPanel>
      </StyledDialogContent>
    </StyledDialog>
  );
};

export default BillModal;
