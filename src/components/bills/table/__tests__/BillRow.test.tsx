import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { screen } from "@testing-library/dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import BillRow from "../BillRow";
import type { Bill } from "../../../../types/oireachtas";
import "@testing-library/jest-dom";

jest.mock("../../../common", () => ({
  FavouriteButton: ({
    bill,
    isFavourited,
    onToggle,
    disabled,
  }: {
    bill: Bill;
    isFavourited: boolean;
    onToggle: (bill: Bill) => void;
    disabled: boolean;
  }) => (
    <button
      data-testid="favourite-button"
      onClick={() => onToggle(bill)}
      disabled={disabled}
      aria-pressed={isFavourited}
    >
      {isFavourited ? "★" : "☆"}
    </button>
  ),
}));

jest.mock("../../../../utils", () => ({
  getSponsorName: (bill: Bill) =>
    bill.bill?.sponsors?.[0]?.sponsor?.by?.showAs || "Unknown Sponsor",
  getStatusColor: () => "primary",
}));

const testTheme = createTheme();

const TestWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ThemeProvider theme={testTheme}>
    <table>
      <tbody>{children}</tbody>
    </table>
  </ThemeProvider>
);

const createMockBill = (overrides = {}) => ({
  bill: {
    billNo: "123",
    billYear: "2024",
    billType: "Public",
    billTypeURI: "https://example.com/public",
    shortTitleEn: "Test Bill",
    shortTitleGa: "Bille Tástála",
    longTitleEn: "A Bill to test the system",
    longTitleGa: "Bille chun an córas a thástáil",
    status: "Enacted",
    statusURI: "https://example.com/enacted",
    source: "Dáil",
    sourceURI: "https://example.com/source",
    method: "Government",
    methodURI: "https://example.com/method",
    originHouse: {
      showAs: "Dáil Éireann",
      uri: "https://example.com/origin-house",
    },
    originHouseURI: "https://example.com/origin-house",
    sponsors: [
      {
        sponsor: {
          by: {
            showAs: "John Doe",
            uri: "https://example.com/sponsor/1",
          },
          as: {
            showAs: null,
            uri: null,
          },
          isPrimary: true,
        },
      },
    ],
    lastUpdated: "2024-01-01",
    uri: "https://example.com/bill/123",
    ...overrides,
  },
});

const mockBill = createMockBill();

describe("BillRow Component", () => {
  const defaultProps = {
    bill: mockBill,
    onRowClick: jest.fn(),
    isFavourited: false,
    onToggleFavourite: jest.fn(),
    favouritesLoading: false,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Rendering Tests", () => {
    it("renders all bill information correctly", () => {
      render(
        <TestWrapper>
          <BillRow {...defaultProps} />
        </TestWrapper>
      );

      expect(screen.getByText("123/2024")).toBeInTheDocument();
      expect(screen.getByText("Public")).toBeInTheDocument();
      expect(screen.getByText("Enacted")).toBeInTheDocument();
      expect(screen.getByText("John Doe")).toBeInTheDocument();
      expect(screen.getByTestId("favourite-button")).toBeInTheDocument();
    });

    it("renders with different bill data", () => {
      const differentBill = createMockBill({ billNo: "456", billYear: "2023" });

      render(
        <TestWrapper>
          <BillRow {...defaultProps} bill={differentBill} />
        </TestWrapper>
      );

      expect(screen.getByText("456/2023")).toBeInTheDocument();
      expect(screen.getByText("John Doe")).toBeInTheDocument();
    });

    it("handles missing sponsor gracefully", () => {
      const billWithoutSponsor = createMockBill({ sponsors: [] });

      render(
        <TestWrapper>
          <BillRow {...defaultProps} bill={billWithoutSponsor} />
        </TestWrapper>
      );

      expect(screen.getByText("Unknown Sponsor")).toBeInTheDocument();
    });
  });

  describe("Interaction Tests", () => {
    it("calls onRowClick when row is clicked", () => {
      const onRowClick = jest.fn();

      render(
        <TestWrapper>
          <BillRow {...defaultProps} onRowClick={onRowClick} />
        </TestWrapper>
      );

      const row = screen.getByText("123/2024").closest("tr");
      fireEvent.click(row!);

      expect(onRowClick).toHaveBeenCalledWith(mockBill);
      expect(onRowClick).toHaveBeenCalledTimes(1);
    });

    it("calls onToggleFavourite when favourite button is clicked", () => {
      const onToggleFavourite = jest.fn();

      render(
        <TestWrapper>
          <BillRow {...defaultProps} onToggleFavourite={onToggleFavourite} />
        </TestWrapper>
      );

      const favouriteButton = screen.getByTestId("favourite-button");
      fireEvent.click(favouriteButton);

      expect(onToggleFavourite).toHaveBeenCalledWith(mockBill);
      expect(onToggleFavourite).toHaveBeenCalledTimes(1);
    });

    it("disables favourite button when loading", () => {
      render(
        <TestWrapper>
          <BillRow {...defaultProps} favouritesLoading={true} />
        </TestWrapper>
      );

      const favouriteButton = screen.getByTestId("favourite-button");
      expect(favouriteButton).toBeDisabled();
    });

    it("shows correct favourite state", () => {
      render(
        <TestWrapper>
          <BillRow {...defaultProps} isFavourited={true} />
        </TestWrapper>
      );

      const favouriteButton = screen.getByTestId("favourite-button");
      expect(favouriteButton).toHaveAttribute("aria-pressed", "true");
      expect(favouriteButton).toHaveTextContent("★");
    });
  });

  describe("Accessibility Tests", () => {
    it("has proper table structure and ARIA attributes", () => {
      render(
        <TestWrapper>
          <BillRow {...defaultProps} />
        </TestWrapper>
      );

      // Check table structure
      const cells = screen.getAllByRole("cell");
      const headerCell = screen.getByRole("rowheader");

      expect(cells).toHaveLength(4);
      expect(headerCell).toBeInTheDocument();
    });
  });

  describe("Edge Case Tests", () => {
    it("handles very long sponsor names", () => {
      const longSponsorBill = createMockBill();
      longSponsorBill.bill.sponsors[0].sponsor.by.showAs =
        "Very Long Sponsor Name That Should Be Truncated Or Wrapped";

      render(
        <TestWrapper>
          <BillRow {...defaultProps} bill={longSponsorBill} />
        </TestWrapper>
      );

      expect(screen.getByText(/Very Long Sponsor Name/)).toBeInTheDocument();
    });

    it("handles special characters in bill data", () => {
      const specialCharBill = createMockBill({ billType: "Public & Private" });
      specialCharBill.bill.sponsors[0].sponsor.by.showAs = "O'Connor-Smith";

      render(
        <TestWrapper>
          <BillRow {...defaultProps} bill={specialCharBill} />
        </TestWrapper>
      );

      expect(screen.getByText("Public & Private")).toBeInTheDocument();
      expect(screen.getByText("O'Connor-Smith")).toBeInTheDocument();
    });

    it("handles empty bill data gracefully", () => {
      const emptyBill = createMockBill({
        billNo: "",
        billYear: "",
        billType: "",
        billTypeURI: "",
        shortTitleEn: "",
        shortTitleGa: "",
        longTitleEn: "",
        longTitleGa: "",
        status: "",
        statusURI: "",
        source: "",
        sourceURI: "",
        method: "",
        methodURI: "",
        originHouse: { showAs: "", uri: "" },
        originHouseURI: "",
        sponsors: [],
        lastUpdated: "",
        uri: "",
      });

      render(
        <TestWrapper>
          <BillRow {...defaultProps} bill={emptyBill} />
        </TestWrapper>
      );

      expect(screen.getByText("/")).toBeInTheDocument();
      expect(screen.getByTestId("favourite-button")).toBeInTheDocument();
    });
  });

  describe("Styling Tests", () => {
    it("renders with correct table structure", () => {
      render(
        <TestWrapper>
          <BillRow {...defaultProps} />
        </TestWrapper>
      );

      expect(screen.getByText("123/2024")).toBeInTheDocument();
      expect(screen.getByText("Public")).toBeInTheDocument();
      expect(screen.getByText("Enacted")).toBeInTheDocument();
      expect(screen.getByText("John Doe")).toBeInTheDocument();
      expect(screen.getByTestId("favourite-button")).toBeInTheDocument();
    });
  });
});
