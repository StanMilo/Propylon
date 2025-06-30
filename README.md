# Oireachtas Bills Viewer

A React application for viewing and managing Oireachtas bills with server-side pagination, filtering, and favourites functionality.

## Features

- **Server-side pagination** - Fast loading with only requested data (5,884+ bills)
- **Bill filtering** - Filter by bill type (Public, Private Member, etc.)
- **Favourites system** - Save and manage favourite bills
- **Bill details modal** - View comprehensive bill information
- **CORS proxy** - Handles Oireachtas API CORS limitations

## Quick Start

### Prerequisites

Make sure you have the following installed on your system:

- **Node.js** (version 18 or higher)
- **npm** (comes with Node.js) or **yarn** or **pnpm**

### Development Setup

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Start the development server with proxy**

   ```bash
   npm run dev:with-proxy
   ```

   This starts both:

   - **Proxy server** on `http://localhost:3001` (handles CORS and server-side pagination)
   - **React app** on `http://localhost:5175`

3. **Open your browser**
   The development server will start and provide you with a local URL (typically `http://localhost:5175`). Open this URL in your browser to see the application running.

### Available Scripts

- `npm run dev` - Start the development server with hot module replacement (HMR)
- `npm run dev:with-proxy` - Start both React app and proxy server
- `npm run proxy` - Start only the proxy server
- `npm run build` - Build the project for production
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint to check for code quality issues

## Server-side Pagination

The application implements server-side pagination for optimal performance:

- **API Endpoint**: `GET /api/bills?page=0&pageSize=10&billType=all`
- **Benefits**: Only loads requested data (e.g., 10 items instead of 5,884)
- **Scalability**: Handles large datasets efficiently
- **User Experience**: Faster initial load and navigation
- **Prefetching**: Automatically prefetches next/previous pages for instant navigation

### Pagination Parameters

- `page` (number): Page number (0-based)
- `pageSize` (number): Items per page (5, 10, 25, 50)
- `billType` (string): Filter by bill type ("all", "Public", "Private Member")

### API Integration

This project includes integration with the [Oireachtas API](https://api.oireachtas.ie/) to fetch Irish Parliament data.

### Checkout OIREACHTAS_API_LIMITATIONS file for API analysys
