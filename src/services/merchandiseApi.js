const API_BASE_URL = import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL.replace(/\/$/, "") : 'http://localhost/jen/api';

export const getFullImageUrl = (path) => {
    if (!path) return 'https://via.placeholder.com/400x400?text=No+Image';
    if (path.startsWith('http://') || path.startsWith('https://')) return path;

    // Strip leading slashes and legacy '/jen/' prefix
    const cleanPath = path.replace(/^\/+/, '').replace(/^jen\/+/, '');

    // If explicit uploads URL is configured in environment
    if (import.meta.env.VITE_UPLOADS_URL) {
        const uploadsBase = import.meta.env.VITE_UPLOADS_URL.replace(/\/+$/, '');
        // Avoid duplicate "uploads/" in path
        const subPath = cleanPath.replace(/^uploads\/+/, '');
        return `${uploadsBase}/${subPath}`;
    }

    // Fallback to deriving base URL from VITE_API_URL or default domain
    const apiBase = import.meta.env.VITE_API_URL 
        ? import.meta.env.VITE_API_URL.replace(/\/api\/?$/, '').replace(/\/+$/, '') 
        : 'https://jesusenthroned.royalsoftwares.co.ke';

    const finalPath = cleanPath.startsWith('uploads/') ? cleanPath : `uploads/${cleanPath}`;
    return `${apiBase}/${finalPath}`;
};

export const getImageUrl = getFullImageUrl;

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
