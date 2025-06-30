# Oireachtas API Limitations and Considerations

## CORS Limitation

### Problem

The [Oireachtas API](https://api.oireachtas.ie/) does not support CORS. This means you cannot fetch data directly from the API in a browser-based application (such as this React app running on localhost or any other domain).

### Why This Happens

Browsers block requests to APIs that do not explicitly allow cross-origin requests for security reasons. The Oireachtas API does not send the required `Access-Control-Allow-Origin` header.

### Workarounds

- **Use a Proxy Server:** Set up a simple proxy server that makes requests to the Oireachtas API. The proxy server can add the necessary CORS headers.
- **Browser CORS Extension:** Install a CORS browser extension for development purposes.

## Rate Limiting and Performance

### Stress Test Results

- **100 concurrent requests**: All succeeded with ~3.7s average response time
- **200 concurrent requests**: All succeeded with ~6.0s average response time
- **No built-in rate limiting**: API accepts unlimited concurrent requests
- **Performance degrades gracefully**: Response times increase rather than requests failing

### Implications

- **No protection against abuse**
- **Response times become too long**
- **CDN caching helps**: CloudFront CDN reduces origin server load

## Data Limitations

### Bill Types

- **Limited variety**: All bills in dataset are "Public" type

### Language and Title Issues

- **Missing translations**: Some bills are missing both English and Irish titles
- **Inconsistent formatting**: Some bill titles contain raw HTML elements (e.g., `<p>` tags and line breaks) while others are plain text

## API Response Headers

### Current Configuration

- **Open CORS policy**: `Access-Control-Allow-Origin: *` (allows requests from any origin)
- **No authentication headers**: No API key or authentication required
