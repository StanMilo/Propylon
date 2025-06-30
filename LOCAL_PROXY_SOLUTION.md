# Local Proxy Server Solution for Oireachtas API

## Overview

This solution uses a local Express.js proxy server to bypass CORS restrictions when fetching data from the Oireachtas API. The proxy server acts as an intermediary between React frontend and the Oireachtas API.

## Architecture

### 1. Local Proxy Server (`proxy-server.js`)

- **Port**: 3001
- **Purpose**: Handles CORS and forwards requests to Oireachtas API

### 2. React Service (`src/services/oireachtasService.ts`)

- **Base URL**: `http://localhost:3001/api/oireachtas`
- **Purpose**: Makes requests to the local proxy instead of directly to the API

## Setup Instructions

### Step 1: Install Dependencies

```bash
npm install
```

### Step 2: Start Both Servers

```bash
npm run dev:with-proxy
```

This command starts both:

- **Proxy server** on `http://localhost:3001`
- **React app** on `http://localhost:5175`

### Step 3: Verify Setup

1. **Check proxy server console** - Should show:

   ```
   Proxy server running on http://localhost:3001
   You can now fetch from: http://localhost:3001/api/oireachtas/bills
   ```

2. **Check browser console** - Should show:
   ```
   Fetching from local proxy: http://localhost:3001/api/oireachtas/bills?limit=10&skip=0
   Oireachtas API Bills Data: {head: {...}, results: [...]}
   ```

## Alternative: Run Servers Separately

If you prefer to run them in separate terminals:

### Terminal 1: Start Proxy Server

```bash
npm run proxy
```

### Terminal 2: Start React App

```bash
npm run dev
```
