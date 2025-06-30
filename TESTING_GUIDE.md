# UI Component Unit Testing Guide

This guide demonstrates how to unit test UI system components using React Testing Library and Jest.

## Setup

### 1. Install Dependencies

```bash
npm install --save-dev @testing-library/react @testing-library/jest-dom @testing-library/user-event jest jest-environment-jsdom ts-jest @types/jest
```

### 2. Configuration Files

**jest.config.js**

```javascript
module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
  moduleNameMapping: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
  },
  testMatch: [
    "<rootDir>/src/**/__tests__/**/*.{ts,tsx}",
    "<rootDir>/src/**/*.{test,spec}.{ts,tsx}",
  ],
  collectCoverageFrom: [
    "src/**/*.{ts,tsx}",
    "!src/**/*.d.ts",
    "!src/index.tsx",
    "!src/setupTests.ts",
  ],
};
```

**src/setupTests.ts**

```typescript
import "@testing-library/jest-dom";

// Mock window.matchMedia for responsive design tests
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Mock IntersectionObserver for lazy loading tests
global.IntersectionObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));
```

## Testing Patterns

### 1. Component Rendering Tests

Test that components render correctly with different props and data.

```typescript
describe("Rendering Tests", () => {
  it("renders all bill information correctly", () => {
    render(<BillRow {...defaultProps} />);

    expect(screen.getByText("123/2024")).toBeInTheDocument();
    expect(screen.getByText("Public")).toBeInTheDocument();
    expect(screen.getByText("John Doe")).toBeInTheDocument();
  });

  it("renders with different data", () => {
    const differentBill = {
      ...mockBill,
      bill: { ...mockBill.bill, billNo: "456" },
    };
    render(<BillRow {...defaultProps} bill={differentBill} />);

    expect(screen.getByText("456/2024")).toBeInTheDocument();
  });

  it("handles missing data gracefully", () => {
    const billWithoutSponsor = { ...mockBill, sponsor: undefined };
    render(<BillRow {...defaultProps} bill={billWithoutSponsor} />);

    expect(screen.getByText("Unknown Sponsor")).toBeInTheDocument();
  });
});
```

### 2. User Interaction Tests

Test user interactions like clicks, form submissions, and state changes.

```typescript
describe("Interaction Tests", () => {
  it("calls onRowClick when row is clicked", () => {
    const onRowClick = jest.fn();
    render(<BillRow {...defaultProps} onRowClick={onRowClick} />);

    const row = screen.getByText("123/2024").closest("tr");
    fireEvent.click(row!);

    expect(onRowClick).toHaveBeenCalledWith(mockBill);
    expect(onRowClick).toHaveBeenCalledTimes(1);
  });

  it("calls onToggleFavourite when favourite button is clicked", () => {
    const onToggleFavourite = jest.fn();
    render(<BillRow {...defaultProps} onToggleFavourite={onToggleFavourite} />);

    const favouriteButton = screen.getByTestId("favourite-button");
    fireEvent.click(favouriteButton);

    expect(onToggleFavourite).toHaveBeenCalledWith(mockBill);
  });

  it("disables button when loading", () => {
    render(<BillRow {...defaultProps} favouritesLoading={true} />);

    const favouriteButton = screen.getByTestId("favourite-button");
    expect(favouriteButton).toBeDisabled();
  });
});
```

### 3. Accessibility Tests

Ensure components meet accessibility standards.

```typescript
describe("Accessibility Tests", () => {
  it("has proper ARIA attributes", () => {
    render(<BillRow {...defaultProps} />);

    const favouriteButton = screen.getByTestId("favourite-button");
    expect(favouriteButton).toHaveAttribute("aria-pressed", "false");
  });

  it("has proper table structure", () => {
    render(<BillRow {...defaultProps} />);

    const cells = screen.getAllByRole("cell");
    const headerCell = screen.getByRole("columnheader");

    expect(cells).toHaveLength(4);
    expect(headerCell).toBeInTheDocument();
  });
});
```

### 4. Edge Case Tests

Test how components handle unusual or error conditions.

```typescript
describe("Edge Case Tests", () => {
  it("handles very long text", () => {
    const longNameBill = {
      ...mockBill,
      sponsor: { ...mockBill.sponsor, name: "Very Long Name That Should Wrap" },
    };
    render(<BillRow {...defaultProps} bill={longNameBill} />);

    expect(screen.getByText(/Very Long Name/)).toBeInTheDocument();
  });

  it("handles special characters", () => {
    const specialCharBill = {
      ...mockBill,
      sponsor: { ...mockBill.sponsor, name: "O'Connor-Smith" },
    };
    render(<BillRow {...defaultProps} bill={specialCharBill} />);

    expect(screen.getByText("O'Connor-Smith")).toBeInTheDocument();
  });

  it("handles empty data gracefully", () => {
    const emptyBill = {
      bill: { billNo: "", billYear: "" },
      sponsor: { name: "" },
    };
    render(<BillRow {...defaultProps} bill={emptyBill} />);

    expect(screen.getByText("/")).toBeInTheDocument();
  });
});
```

### 5. Styling Tests

Verify that components apply correct CSS classes and styling.

```typescript
describe("Styling Tests", () => {
  it("applies correct CSS classes", () => {
    render(<BillRow {...defaultProps} />);

    const row = screen.getByText("123/2024").closest("tr");
    expect(row).toHaveClass("MuiTableRow-root");
  });

  it("renders with correct structure", () => {
    render(<BillRow {...defaultProps} />);

    expect(screen.getByText("123/2024")).toBeInTheDocument();
    expect(screen.getByText("Public")).toBeInTheDocument();
    expect(screen.getByTestId("favourite-button")).toBeInTheDocument();
  });
});
```

## Mocking Strategies

### 1. Mock Dependencies

```typescript
// Mock child components
jest.mock("../../../common", () => ({
  FavouriteButton: ({ bill, isFavourited, onToggle, disabled }) => (
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

// Mock utility functions
jest.mock("../../../../utils", () => ({
  getSponsorName: (bill) => bill.sponsor?.name || "Unknown Sponsor",
  getStatusColor: () => "primary",
}));
```

### 2. Mock API Calls

```typescript
// Mock fetch
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ data: mockBills }),
  })
) as jest.Mock;

// Mock axios
jest.mock("axios", () => ({
  get: jest.fn(() => Promise.resolve({ data: mockBills })),
  post: jest.fn(() => Promise.resolve({ data: { success: true } })),
}));
```

### 3. Test Wrappers

```typescript
// Theme provider wrapper
const TestWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ThemeProvider theme={createTheme()}>
    <table>
      <tbody>{children}</tbody>
    </table>
  </ThemeProvider>
);

// Router wrapper
const RouterWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => <MemoryRouter>{children}</MemoryRouter>;
```

## Test Data Management

### 1. Mock Data Factories

```typescript
export const createMockBill = (overrides = {}) => ({
  bill: {
    billNo: "123",
    billYear: "2024",
    billType: "Public",
    status: "Enacted",
    // ... other properties
  },
  sponsor: {
    sponsorId: 1,
    name: "John Doe",
    uri: "https://example.com/sponsor/1",
  },
  stages: [],
  debates: [],
  amendments: [],
  documents: [],
  ...overrides,
});
```

### 2. Test Utilities

```typescript
export const testUtils = {
  // Wait for async operations
  waitFor: (ms: number) => new Promise((resolve) => setTimeout(resolve, ms)),

  // Set viewport size for responsive tests
  setViewport: (width: number, height: number) => {
    Object.defineProperty(window, "innerWidth", { value: width });
    Object.defineProperty(window, "innerHeight", { value: height });
    window.dispatchEvent(new Event("resize"));
  },

  // Create mock API response
  createMockApiResponse: (data: any, status = 200) => ({
    data,
    status,
    statusText: status === 200 ? "OK" : "Error",
  }),
};
```

## Running Tests

### 1. Run All Tests

```bash
npm test
```

### 2. Run Tests in Watch Mode

```bash
npm test -- --watch
```

### 3. Run Tests with Coverage

```bash
npm test -- --coverage
```

### 4. Run Specific Test File

```bash
npm test -- BillRow.test.tsx
```

### 5. Run Tests Matching Pattern

```bash
npm test -- --testNamePattern="renders"
```

## Best Practices

### 1. Test Structure (AAA Pattern)

- **Arrange**: Set up test data and conditions
- **Act**: Execute the function/component being tested
- **Assert**: Verify the expected outcomes

### 2. Test Naming

- Use descriptive test names that explain the scenario
- Follow the pattern: "should [expected behavior] when [condition]"

### 3. Test Isolation

- Each test should be independent
- Use `beforeEach` to reset state between tests
- Avoid sharing state between tests

### 4. Assertions

- Test one thing per test
- Use specific assertions (e.g., `toBeInTheDocument()` instead of `toBeTruthy()`)
- Test for presence, not implementation details

### 5. Accessibility

- Always test for proper ARIA attributes
- Verify keyboard navigation works
- Test with screen readers in mind

### 6. Performance

- Mock heavy dependencies
- Use `data-testid` for reliable element selection
- Avoid testing implementation details

## Common Testing Patterns

### 1. Testing Async Operations

```typescript
it("loads data asynchronously", async () => {
  render(<BillsTable />);

  await waitFor(() => {
    expect(screen.getByText("Loading...")).not.toBeInTheDocument();
  });

  expect(screen.getByText("123/2024")).toBeInTheDocument();
});
```

### 2. Testing Form Submissions

```typescript
it("submits form with correct data", () => {
  const onSubmit = jest.fn();
  render(<SearchForm onSubmit={onSubmit} />);

  fireEvent.change(screen.getByLabelText("Search"), {
    target: { value: "test query" },
  });
  fireEvent.click(screen.getByText("Search"));

  expect(onSubmit).toHaveBeenCalledWith({ query: "test query" });
});
```

### 3. Testing Error States

```typescript
it("displays error message when API fails", async () => {
  // Mock API to return error
  jest.spyOn(api, "getBills").mockRejectedValue(new Error("API Error"));

  render(<BillsTable />);

  await waitFor(() => {
    expect(screen.getByText("Error loading bills")).toBeInTheDocument();
  });
});
```

This testing approach ensures your UI components are reliable, accessible, and maintainable.
