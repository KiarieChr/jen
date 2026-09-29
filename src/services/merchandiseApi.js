const API_BASE_URL = import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL.replace(/\/$/, "") : 'http://localhost/jen/api';

export const getImageUrl = (path) => {
    if (!path) return '';
    if (path.startsWith('http')) return path;
    
    // Check if there is an explicit uploads URL in env
    if (import.meta.env.VITE_UPLOADS_URL) {
        const base = import.meta.env.VITE_UPLOADS_URL.replace(/\/$/, "");
        return `${base}${path.startsWith('/') ? '' : '/'}${path}`;
    }

    // Fallback to deriving it from API_BASE_URL
    try {
        const url = new URL(API_BASE_URL);
        return `${url.origin}${path.startsWith('/') ? '' : '/'}${path}`;
    } catch (e) {
        return path;
    }
};

export const fetchProducts = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/merchandise_products.php`);
        const result = await response.json();
        return result.data || [];
    } catch (error) {
        console.error("Failed to fetch products:", error);
        return [];
    }
};

export const createOrder = async (orderData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/merchandise_orders.php`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(orderData)
        });
        return await response.json();
    } catch (error) {
        console.error("Failed to create order:", error);
        return { success: false, error: error.message };
    }
};

export const createProduct = async (productData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/admin_merchandise_products.php`, {
            method: 'POST',
            body: productData
        });
        return await response.json();
    } catch (error) {
        console.error("Failed to create product:", error);
        return { success: false, error: error.message };
    }
};

export const fetchOrders = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/admin_merchandise_orders.php`);
        const result = await response.json();
        return result.data || [];
    } catch (error) {
        console.error("Failed to fetch orders:", error);
        return [];
    }
};

export const updateOrderStatus = async (orderId, status) => {
    try {
        const response = await fetch(`${API_BASE_URL}/admin_merchandise_orders.php`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ order_id: orderId, status })
        });
        return await response.json();
    } catch (error) {
        console.error("Failed to update order status:", error);
        return { success: false, error: error.message };
    }
};
