import type { PaginatedBillsResponse } from "../types/oireachtas";
import { API_BASE_URL } from "../constants/api";

export const fetchBills = async (
  page = 0,
  pageSize = 10,
  billType = "all"
): Promise<PaginatedBillsResponse> => {
  const params: Record<string, string> = {
    page: page.toString(),
    pageSize: pageSize.toString(),
    billType,
  };

  const queryString = new URLSearchParams(params).toString();
  const url = `${API_BASE_URL}/bills?${queryString}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(
      `Failed to fetch bills: ${response.status} ${response.statusText}`
    );
  }

  const data: PaginatedBillsResponse = await response.json();
  return data;
};
