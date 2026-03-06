/**
 * API Configuration and Axios Instance
 * Central configuration for all API calls
 */

import axios from 'axios';

// API Base URL - change for production
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://jen.royalsoftwares.co.ke/api/';

// Create axios instance with default config
const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true, // Send cookies with requests
    timeout: 30000, // 30 second timeout
});

// Token storage keys
const ACCESS_TOKEN_KEY = 'jen_access_token';
const REFRESH_TOKEN_KEY = 'jen_refresh_token';

/**
 * Get stored access token
 */
export const getAccessToken = () => {
    return localStorage.getItem(ACCESS_TOKEN_KEY);
};

/**
 * Get stored refresh token
 */
export const getRefreshToken = () => {
    return localStorage.getItem(REFRESH_TOKEN_KEY);
};

/**
 * Store tokens
 */
export const setTokens = (accessToken, refreshToken) => {
    if (accessToken) {
        localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
    }
    if (refreshToken) {
        localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
    }
};

/**
 * Clear tokens (logout)
 */
export const clearTokens = () => {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
};

// Request interceptor - add auth token to requests
api.interceptors.request.use(
    (config) => {
        const token = getAccessToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor - handle token refresh and errors
api.interceptors.response.use(
    (response) => {
        // Return successful response data directly
        return response.data;
    },
    async (error) => {
        const originalRequest = error.config;
        
        // Don't try to refresh for auth endpoints - just return the error
        const isAuthEndpoint = originalRequest.url?.includes('/auth/login') || 
                               originalRequest.url?.includes('/auth/register');

        // If 401 and not already retrying and not an auth endpoint, try to refresh token
        if (error.response?.status === 401 && !originalRequest._retry && !isAuthEndpoint) {
            originalRequest._retry = true;

            const refreshToken = getRefreshToken();

            if (refreshToken) {
                try {
                    // Try to refresh the token
                    const response = await axios.post(`${API_BASE_URL}/auth/refresh.php`, {
                        refresh_token: refreshToken,
                    });

                    const { access_token, refresh_token: newRefreshToken } = response.data.data;

                    // Store new tokens
                    setTokens(access_token, newRefreshToken);

                    // Retry original request with new token
                    originalRequest.headers.Authorization = `Bearer ${access_token}`;
                    return api(originalRequest);
                } catch (refreshError) {
                    // Refresh failed - clear tokens (don't redirect, let UI handle it)
                    clearTokens();
                    return Promise.reject(new Error('Session expired. Please login again.'));
                }
            }
        }

        // Handle other errors - return error message without redirect
        const errorMessage = error.response?.data?.error || error.message || 'An error occurred';
        return Promise.reject(new Error(errorMessage));
    }
);

export default api;
