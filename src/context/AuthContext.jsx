import React, { createContext, useState, useEffect, useCallback } from 'react';
import { login as loginApi, logout as logoutApi, getCurrentUser, isAuthenticated as checkAuth } from '../services/authService';
import { clearTokens, getAccessToken } from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [permissions, setPermissions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Check if user is authenticated
    const isAuthenticated = !!user;

    // Load user on mount if token exists
    useEffect(() => {
        const initAuth = async () => {
            const token = getAccessToken();

            if (token && checkAuth()) {
                try {
                    const response = await getCurrentUser();
                    setUser(response.user);
                    setPermissions(response.permissions || []);
                } catch (err) {
                    console.error('Failed to load user:', err);
                    clearTokens();
                }
            }
            setLoading(false);
        };

        initAuth();
    }, []);

    // Login function
    const login = useCallback(async (email, password) => {
        setError(null);
        setLoading(true);

        try {
            const result = await loginApi(email, password);
            setUser(result.user);

            // Fetch full user data with permissions
            try {
                const response = await getCurrentUser();
                setUser(response.user);
                setPermissions(response.permissions || []);
            } catch (e) {
                // If fetching full user fails, use login response data
                console.warn('Could not fetch full user data:', e);
            }

            return { success: true, user: result.user };
        } catch (err) {
            const errorMessage = err.message || 'Login failed';
            setError(errorMessage);
            return { success: false, error: errorMessage };
        } finally {
            setLoading(false);
        }
    }, []);

    // Logout function
    const logout = useCallback(async (allDevices = false) => {
        setLoading(true);

        try {
            await logoutApi(allDevices);
        } catch (err) {
            console.error('Logout error:', err);
        } finally {
            setUser(null);
            setPermissions([]);
            setError(null);
            setLoading(false);
        }
    }, []);

    // Check if user has a specific permission
    const hasPermission = useCallback((permissionCode) => {
        return permissions.some(p => p.permission_code === permissionCode);
    }, [permissions]);

    // Check if user has any of the specified permissions
    const hasAnyPermission = useCallback((permissionCodes) => {
        return permissionCodes.some(code => hasPermission(code));
    }, [hasPermission]);

    // Check if user has all specified permissions
    const hasAllPermissions = useCallback((permissionCodes) => {
        return permissionCodes.every(code => hasPermission(code));
    }, [hasPermission]);

    // Refresh user data
    const refreshUser = useCallback(async () => {
        try {
            const response = await getCurrentUser();
            setUser(response.user);
            setPermissions(response.permissions || []);
            return response.user;
        } catch (err) {
            console.error('Failed to refresh user:', err);
            throw err;
        }
    }, []);

    // Clear error
    const clearError = useCallback(() => {
        setError(null);
    }, []);

    const value = {
        // State
        user,
        permissions,
        loading,
        error,
        isAuthenticated,

        // Actions
        login,
        logout,
        refreshUser,
        clearError,

        // Permission helpers
        hasPermission,
        hasAnyPermission,
        hasAllPermissions,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook for using auth context
export const useAuth = () => {
    const context = React.useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export default AuthContext;
