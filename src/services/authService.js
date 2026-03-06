/**
 * Authentication Service
 * Handles login, register, logout, and user management
 */

import api, { setTokens, clearTokens, getRefreshToken } from './api';

/**
 * Login user
 * @param {string} email - User email
 * @param {string} password - User password
 * @returns {Promise<Object>} - User data and tokens
 */
export const login = async (email, password) => {
  const response = await api.post('/auth/login.php', {
    email,
    password,
  });

  if (response.success) {
    const { access_token, refresh_token, user } = response.data;
    setTokens(access_token, refresh_token);
    return { user, success: true };
  }

  throw new Error(response.error || 'Login failed');
};

/**
 * Register new user
 * @param {Object} userData - Registration data
 * @returns {Promise<Object>} - User data and tokens
 */
export const register = async (userData) => {
  const response = await api.post('/auth/register.php', userData);

  if (response.success) {
    const { access_token, refresh_token, user } = response.data;
    setTokens(access_token, refresh_token);
    return { user, success: true };
  }

  throw new Error(response.error || 'Registration failed');
};

/**
 * Logout user
 * @param {boolean} allDevices - Logout from all devices
 */
export const logout = async (allDevices = false) => {
  try {
    const refreshToken = getRefreshToken();
    await api.post('/auth/logout.php', {
      refresh_token: refreshToken,
      all_devices: allDevices,
    });
  } catch (error) {
    // Even if API call fails, clear local tokens
    console.error('Logout API error:', error);
  } finally {
    clearTokens();
  }
};

/**
 * Get current authenticated user
 * @returns {Promise<Object>} - User data
 */
export const getCurrentUser = async () => {
  const response = await api.get('/auth/me.php');

  if (response.success) {
    return response.data;
  }

  throw new Error(response.error || 'Failed to get user');
};

/**
 * Check if user is authenticated (has valid token)
 * @returns {boolean}
 */
export const isAuthenticated = () => {
  const token = localStorage.getItem('jen_access_token');
  if (!token) return false;

  // Check if token is expired (basic check)
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.exp > Date.now() / 1000;
  } catch {
    return false;
  }
};

/**
 * Update user profile
 * @param {Object} profileData - Profile data to update
 */
export const updateProfile = async (profileData) => {
  const response = await api.put('/auth/profile.php', profileData);

  if (response.success) {
    return response.data;
  }

  throw new Error(response.error || 'Failed to update profile');
};

/**
 * Change password
 * @param {string} currentPassword
 * @param {string} newPassword
 */
export const changePassword = async (currentPassword, newPassword) => {
  const response = await api.post('/auth/change-password.php', {
    current_password: currentPassword,
    new_password: newPassword,
  });

  if (response.success) {
    return response.data;
  }

  throw new Error(response.error || 'Failed to change password');
};

/**
 * Request password reset
 * @param {string} email
 */
export const requestPasswordReset = async (email) => {
  const response = await api.post('/auth/forgot-password.php', { email });

  if (response.success) {
    return response.data;
  }

  throw new Error(response.error || 'Failed to request password reset');
};

export default {
  login,
  register,
  logout,
  getCurrentUser,
  isAuthenticated,
  updateProfile,
  changePassword,
  requestPasswordReset,
};
