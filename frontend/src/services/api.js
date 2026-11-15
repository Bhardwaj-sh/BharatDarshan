import axios from 'axios';

// Create base Axios instance pointing to our Express server
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request Interceptor: Attach JWT token automatically if logged in
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('bharat_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Graceful 401 token handling
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Token expired or invalid
      console.warn('Authentication token expired or unauthorized');
    }
    return Promise.reject(error);
  }
);

// Auth Services
export const authService = {
  login: (credentials) => API.post('/auth/login', credentials),
  register: (userData) => API.post('/auth/register', userData),
  getMe: () => API.get('/auth/me')
};

// States & Regions Services
export const stateService = {
  getAll: (params) => API.get('/states', { params }),
  getBySlug: (slug) => API.get(`/states/${slug}`)
};

// Packages Services
export const packageService = {
  getAll: () => API.get('/packages'),
  getById: (id) => API.get(`/packages/${id}`)
};

// Bookings Services
export const bookingService = {
  create: (bookingData) => API.post('/bookings', bookingData),
  getMyTrips: () => API.get('/bookings/my-trips'),
  getByRef: (ref) => API.get(`/bookings/${ref}`)
};

// Admin Services
export const adminService = {
  getStats: () => API.get('/admin/dashboard'),
  getBookings: (params) => API.get('/admin/bookings', { params }),
  updateStatus: (id, status) => API.patch(`/admin/bookings/${id}/status`, { status }),
  getUsers: () => API.get('/admin/users')
};

export default API;
