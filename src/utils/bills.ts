import type { Bill } from "../types/oireachtas";
import { t } from "../translations";

/**
 * Extracts the sponsor name from a bill
 * @param bill - The bill object
 * @returns The sponsor name or a fallback message
 */
export const getSponsorName = (bill: Bill): string => {
  if (bill.bill.sponsors && bill.bill.sponsors.length > 0) {
    const primarySponsor = bill.bill.sponsors.find(
      (sponsor) => sponsor.sponsor.isPrimary
    );
    const sponsor = primarySponsor || bill.bill.sponsors[0];

    if (sponsor.sponsor.as && sponsor.sponsor.as.showAs) {
      return sponsor.sponsor.as.showAs;
    } else if (sponsor.sponsor.by && sponsor.sponsor.by.showAs) {
      return sponsor.sponsor.by.showAs;
    }
  }
  return t("bills.sponsor.noSponsor");
};

export const getStatusColor = (
  status: string
): "primary" | "success" | "error" | "warning" | "default" => {
  switch (status.toLowerCase()) {
    case "active":
      return "primary";
    case "enacted":
      return "success";
    case "withdrawn":
      return "error";
    case "defeated":
      return "error";
    case "lapsed":
      return "warning";
    default:
      return "default";
  }
};

export const getUniqueBillTypes = (bills: Bill[]): string[] => {
  const types = new Set(bills.map((bill) => bill.bill.billType));
  return Array.from(types).sort();
};
