import { Box, Typography } from "@mui/material";
import type { Bill } from "../../../types/oireachtas";
import { t } from "../../../translations";
import { formatLongTitle } from "../../../utils";

interface BillContentProps {
  bill: Bill;
  language: "en" | "ga";
}

const BillContent: React.FC<BillContentProps> = ({ bill, language }) => {
  const isEnglish = language === "en";

  const shortTitle = isEnglish
    ? bill.bill.shortTitleEn
    : bill.bill.shortTitleGa;
  const longTitle = isEnglish ? bill.bill.longTitleEn : bill.bill.longTitleGa;
  const shortTitleLabel = isEnglish
    ? t("bills.modal.shortTitle")
    : t("bills.modal.shortTitleIrish");
  const longTitleLabel = isEnglish
    ? t("bills.modal.longTitle")
    : t("bills.modal.longTitleIrish");

  const renderFormattedTitle = (title: string) => {
    const formattedLines = formatLongTitle(title);
    return formattedLines.map((line, index) => (
      <Typography
        key={index}
        variant="body1"
        sx={{
          mb: line.endsWith(";") ? 1 : 0,
          textAlign: "justify",
          lineHeight: 1.6,
        }}
      >
        {line}
      </Typography>
    ));
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        {shortTitleLabel}
      </Typography>
      <Typography variant="body1" paragraph sx={{ mb: 3 }}>
        {shortTitle}
      </Typography>

      <Typography variant="h6" gutterBottom>
        {longTitleLabel}
      </Typography>
      <Box sx={{ mt: 2 }}>{renderFormattedTitle(longTitle)}</Box>
    </Box>
  );
};

export default BillContent;
