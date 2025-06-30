import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();
const PORT = 3001;

// Enable CORS for all routes
app.use(cors());

// Dedicated bills endpoint with server-side pagination
app.get("/api/bills", async (req, res) => {
  try {
    const { page = 0, pageSize = 10, billType = "all" } = req.query;
    const pageNum = parseInt(page);
    const limit = parseInt(pageSize);
    const skip = pageNum * limit;

    // Build query parameters
    const params = {
      limit: limit.toString(),
      skip: skip.toString(),
    };

    // Add bill type filter if specified
    if (billType && billType !== "all") {
      params.bill_type = billType;
    }

    const queryString = new URLSearchParams(params).toString();
    const url = `https://api.oireachtas.ie/v1/legislation?${queryString}`;

    console.log("Fetching bills from Oireachtas API:", url);

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(
        `Oireachtas API error: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();

    // Calculate pagination metadata
    const totalCount =
      data.head?.counts?.billCount || data.results?.length || 0;
    const totalPages = Math.ceil(totalCount / limit);
    const hasNextPage = pageNum < totalPages - 1;
    const hasPrevPage = pageNum > 0;

    // Return paginated response
    const paginatedResponse = {
      data: data.results || [],
      pagination: {
        page: pageNum,
        pageSize: limit,
        totalCount,
        totalPages,
        hasNextPage,
        hasPrevPage,
      },
      meta: data.head || {},
    };

    console.log(
      `Returning ${data.results?.length || 0} bills (page ${
        pageNum + 1
      }/${totalPages})`
    );
    res.json(paginatedResponse);
  } catch (error) {
    console.error("Bills proxy error:", error);
    res.status(500).json({
      error: "Failed to fetch bills",
      message: error.message,
    });
  }
});

// Individual bills endpoint for favourites
app.get("/api/bills/individual", async (req, res) => {
  try {
    const { billIds } = req.query;

    if (!billIds) {
      return res.status(400).json({ error: "billIds parameter is required" });
    }

    const billIdArray = billIds.split(",");
    const bills = [];

    for (const billId of billIdArray) {
      const [billNo, billYear] = billId.split("/");

      if (!billNo || !billYear) {
        console.warn(`Invalid bill ID format: ${billId}`);
        continue;
      }

      const url = `https://api.oireachtas.ie/v1/legislation?bill_no=${billNo}&bill_year=${billYear}`;

      try {
        const response = await fetch(url);
        if (response.ok) {
          const data = await response.json();
          if (data.results && data.results.length > 0) {
            bills.push(data.results[0]);
          }
        } else {
          console.warn(`Failed to fetch bill ${billId}: ${response.status}`);
        }
      } catch (error) {
        console.warn(`Error fetching bill ${billId}:`, error.message);
      }
    }

    console.log(`Returning ${bills.length} individual bills`);
    res.json({ results: bills });
  } catch (error) {
    console.error("Individual bills proxy error:", error);
    res.status(500).json({
      error: "Failed to fetch individual bills",
      message: error.message,
    });
  }
});

app.get("/api/oireachtas/*", async (req, res) => {
  try {
    const path = req.params[0];
    const queryString = req.url.split("?")[1] || "";
    const url = `https://api.oireachtas.ie/v1/${path}${
      queryString ? "?" + queryString : ""
    }`;

    console.log("Fetching from:", url);

    const response = await fetch(url);
    const data = await response.json();

    console.log("Oireachtas API Response:", JSON.stringify(data, null, 2));

    res.json(data);
  } catch (error) {
    console.error("Proxy error:", error);
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

app.listen(PORT, () => {
  console.log(`Proxy server running on http://localhost:${PORT}`);
  console.log(
    "Bills endpoint: http://localhost:3001/api/bills?page=0&pageSize=10"
  );
  console.log(
    "Individual bills endpoint: http://localhost:3001/api/bills/individual?billIds=123/2022,456/2023"
  );
});
