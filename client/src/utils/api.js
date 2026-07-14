// Get the base API URL from environment variables, fallback to local server.
let rawApiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Normalize the API URL:
// 1. If it doesn't end with '/api', automatically append it (unless it ends with '/api/')
if (rawApiUrl && !rawApiUrl.endsWith('/api') && !rawApiUrl.endsWith('/api/')) {
  // Trim trailing slash first if present
  const trimmed = rawApiUrl.replace(/\/+$/, '');
  rawApiUrl = `${trimmed}/api`;
}

const API_URL = rawApiUrl;
console.log('[API Service] Initialized with endpoint:', API_URL);

// Helper to get headers with authorization
const getHeaders = (isMultipart = false) => {
  const token = localStorage.getItem('token');
  const headers = {};
  if (!isMultipart) {
    headers['Content-Type'] = 'application/json';
  }
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
};

// Helper to handle response parsing safely and throw descriptive messages
const handleResponse = async (res) => {
  const contentType = res.headers.get('content-type') || '';
  
  if (!contentType.includes('application/json')) {
    const text = await res.text();
    console.error('[API Service] Non-JSON response received:', text.substring(0, 300));
    
    // Check if it's a Vercel routing fallback or local HTML redirect
    if (text.includes('<!DOCTYPE html>') || text.includes('<html')) {
      throw new Error(
        `API URL Configuration Issue: The server returned an HTML page instead of JSON data. ` +
        `This usually means the frontend domain is calling itself (Vercel) for API requests instead of the Render backend URL. ` +
        `Please check that VITE_API_URL is correctly set to your Render backend (e.g., https://your-app.onrender.com/api) and redeploy on Vercel.`
      );
    }
    throw new Error(`Server returned non-JSON response (Status ${res.status})`);
  }

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || 'API error');
  }
  return data;
};

export const api = {
  // GET request
  get: async (endpoint) => {
    const res = await fetch(`${API_URL}${endpoint}`, {
      method: 'GET',
      headers: getHeaders(),
    });
    return handleResponse(res);
  },

  // POST request
  post: async (endpoint, body) => {
    const res = await fetch(`${API_URL}${endpoint}`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(body),
    });
    return handleResponse(res);
  },

  // PUT request
  put: async (endpoint, body) => {
    const res = await fetch(`${API_URL}${endpoint}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(body),
    });
    return handleResponse(res);
  },

  // DELETE request
  delete: async (endpoint) => {
    const res = await fetch(`${API_URL}${endpoint}`, {
      method: 'DELETE',
      headers: getHeaders(),
    });
    return handleResponse(res);
  },

  // Upload file (multipart)
  upload: async (file, isPublic = false) => {
    const formData = new FormData();
    formData.append('file', file);

    const endpoint = isPublic ? '/upload/public' : '/upload';
    const res = await fetch(`${API_URL}${endpoint}`, {
      method: 'POST',
      headers: getHeaders(true),
      body: formData,
    });
    return handleResponse(res);
  },
};
