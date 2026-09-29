import React, { useState, useEffect } from 'react';
import { fetchProducts, createProduct, getImageUrl } from '../../../services/merchandiseApi';

const MerchandiseDashboard = () => {
    const [products, setProducts] = useState([]);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [toast, setToast] = useState(null);
    const [editingProductId, setEditingProductId] = useState(null);
    
    // New Product State
    const [newProduct, setNewProduct] = useState({
        name: '',
        description: '',
        base_price: '',
        image: null
    });
    const [variants, setVariants] = useState([{ color: '', size: '', price_adjustment: '0.00', stock: 10 }]);

    useEffect(() => {
        loadProducts();
    }, []);

    const loadProducts = async () => {
        const data = await fetchProducts();
        setProducts(data);
    };

    const showToast = (message, type = 'success') => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 4000);
    };

    const handleAddVariant = () => {
        setVariants([...variants, { color: '', size: '', price_adjustment: '0.00', stock: 10 }]);
    };

    const handleRemoveVariant = (index) => {
        const newVariants = [...variants];
        newVariants.splice(index, 1);
        setVariants(newVariants);
    };

    const handleVariantChange = (index, field, value) => {
        const newVariants = [...variants];
        newVariants[index][field] = value;
        setVariants(newVariants);
    };

    const handleEditProduct = (product) => {
        setEditingProductId(product.id);
        setNewProduct({
            name: product.name,
            description: product.description,
            base_price: product.base_price,
            image: null // Can't easily pre-populate file input, but we won't overwrite unless they pick a new one
        });
        
        if (product.variants && product.variants.length > 0) {
            setVariants(product.variants.map(v => ({
                color: v.color,
                size: v.size,
                price_adjustment: v.price,
                stock: v.stock
            })));
        } else {
            setVariants([{ color: '', size: '', price_adjustment: '0.00', stock: 10 }]);
        }
        setIsAddModalOpen(true);
    };

    const handleOpenAddModal = () => {
        setEditingProductId(null);
        setNewProduct({ name: '', description: '', base_price: '', image: null });
        setVariants([{ color: '', size: '', price_adjustment: '0.00', stock: 10 }]);
        setIsAddModalOpen(true);
    };

    const handleSaveProduct = async () => {
        if (!newProduct.name || !newProduct.base_price) return showToast("Name and Base Price are required.", "error");
        
        const formData = new FormData();
        if (editingProductId) {
            formData.append('product_id', editingProductId);
        }
        formData.append('name', newProduct.name);
        formData.append('description', newProduct.description);
        formData.append('base_price', newProduct.base_price);
        if (newProduct.image) {
            formData.append('image', newProduct.image);
        }
        
        const validVariants = variants.filter(v => v.color && v.size);
        formData.append('variants', JSON.stringify(validVariants));
        
        const result = await createProduct(formData);
        if (result.success) {
            showToast(editingProductId ? "Product updated successfully!" : "Product added successfully!");
            setIsAddModalOpen(false);
            setEditingProductId(null);
            setNewProduct({ name: '', description: '', base_price: '', image: null });
            setVariants([{ color: '', size: '', price_adjustment: '0.00', stock: 10 }]);
            loadProducts();
        } else {
            showToast("Failed to add product: " + result.error, "error");
        }
    };

    return (
        <div className="admin-merch-page">
            <div className="admin-header">
                <div>
                    <h1 className="admin-title">Store Inventory</h1>
                    <p className="admin-subtitle">Manage your merchandise and variants</p>
                </div>
                <button onClick={handleOpenAddModal} className="admin-btn-primary">
                    <span className="icon">+</span> Add New Item
                </button>
            </div>

            {/* Inventory Grid */}
            <div className="admin-grid">
                {products.map(product => (
                    <div key={product.id} className="admin-card">
                        <div className="admin-card-img-wrap">
                            <img src={getImageUrl(product.image_url) || 'https://via.placeholder.com/300?text=No+Image'} alt={product.name} className="admin-card-img" />
                        </div>
                        <div className="admin-card-body">
                            <h3 className="admin-card-title">{product.name}</h3>
                            <div className="admin-card-footer">
                                <span className="admin-card-price">Ksh {parseFloat(product.base_price).toFixed(2)}</span>
                                <span className="admin-card-badge">
                                    {product.variants?.length || 0} Variants
                                </span>
                            </div>
                            <button onClick={() => handleEditProduct(product)} className="admin-btn-secondary" style={{ width: '100%', marginTop: '15px' }}>
                                Edit Product
                            </button>
                        </div>
                    </div>
                ))}
                {products.length === 0 && (
                    <div className="admin-empty-state">
                        <p>No merchandise found. Click "Add New Item" to create one.</p>
                    </div>
                )}
            </div>

            {/* Add Product Modal */}
            {isAddModalOpen && (
                <div className="admin-modal-overlay">
                    <div className="admin-modal-backdrop" onClick={() => setIsAddModalOpen(false)}></div>
                    <div className="admin-modal">
                        <div className="admin-modal-header">
                            <h2>{editingProductId ? "Edit Merchandise" : "Add New Merchandise"}</h2>
                            <button onClick={() => setIsAddModalOpen(false)} className="admin-modal-close">✕</button>
                        </div>
                        
                        <div className="admin-modal-body">
                            <div className="admin-form-row">
                                <div className="admin-form-group full-width">
                                    <label>Product Name</label>
                                    <input type="text" value={newProduct.name} onChange={e => setNewProduct({...newProduct, name: e.target.value})} placeholder="e.g. Kingdom Hoodie" />
                                </div>
                            </div>
                            <div className="admin-form-row">
                                <div className="admin-form-group">
                                    <label>Base Price (Ksh)</label>
                                    <input type="number" step="0.01" value={newProduct.base_price} onChange={e => setNewProduct({...newProduct, base_price: e.target.value})} placeholder="4500.00" />
                                </div>
                                <div className="admin-form-group">
                                    <label>Product Image</label>
                                    <input type="file" accept="image/*" onChange={e => setNewProduct({...newProduct, image: e.target.files[0]})} />
                                </div>
                            </div>
                            <div className="admin-form-row">
                                <div className="admin-form-group full-width">
                                    <label>Description</label>
                                    <textarea rows="3" value={newProduct.description} onChange={e => setNewProduct({...newProduct, description: e.target.value})} placeholder="Product details..."></textarea>
                                </div>
                            </div>

                            <div className="admin-variants-section">
                                <div className="admin-variants-header">
                                    <h3>Variants Builder (Color / Size)</h3>
                                    <button onClick={handleAddVariant} className="admin-text-btn">+ Add Variant</button>
                                </div>
                                
                                <div className="admin-variants-list">
                                    {variants.map((v, idx) => (
                                        <div key={idx} className="admin-variant-row">
                                            <div className="variant-col">
                                                <input type="text" placeholder="Color (e.g. Black)" value={v.color} onChange={e => handleVariantChange(idx, 'color', e.target.value)} />
                                            </div>
                                            <div className="variant-col small">
                                                <input type="text" placeholder="Size (XL)" value={v.size} onChange={e => handleVariantChange(idx, 'size', e.target.value)} />
                                            </div>
                                            <div className="variant-col small">
                                                <input type="number" step="0.01" placeholder="+Price" value={v.price_adjustment} onChange={e => handleVariantChange(idx, 'price_adjustment', e.target.value)} />
                                            </div>
                                            <div className="variant-col small">
                                                <input type="number" placeholder="Stock" value={v.stock} onChange={e => handleVariantChange(idx, 'stock', e.target.value)} />
                                            </div>
                                            <button onClick={() => handleRemoveVariant(idx)} className="variant-remove-btn">✕</button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        
                        <div className="admin-modal-footer">
                            <button onClick={() => setIsAddModalOpen(false)} className="admin-btn-secondary">Cancel</button>
                            <button onClick={handleSaveProduct} className="admin-btn-primary">Save Product</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Toast Notification */}
            {toast && (
                <div style={{
                    position: 'fixed', bottom: '20px', right: '20px', padding: '12px 24px', 
                    borderRadius: '8px', color: '#fff', fontWeight: '500', zIndex: 9999,
                    background: toast.type === 'error' ? 'rgba(239,68,68,0.95)' : 'rgba(34,197,94,0.95)',
                    boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
                    animation: 'fadeIn 0.3s'
                }}>
                    {toast.message}
                </div>
            )}

            <style>{`
                .admin-merch-page {
                    font-family: 'Inter', sans-serif;
                    color: #fff;
                    padding: 10px;
                }
                .admin-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 30px;
                }
                .admin-title {
                    font-size: 24px;
                    font-weight: 800;
                    text-transform: uppercase;
                    letter-spacing: 2px;
                    margin: 0 0 5px 0;
                    color: #fff;
                }
                .admin-subtitle {
                    font-size: 12px;
                    color: rgba(255,255,255,0.5);
                    text-transform: uppercase;
                    letter-spacing: 1px;
                    margin: 0;
                }
                
                /* Buttons */
                .admin-btn-primary {
                    background: linear-gradient(135deg, #22c1e6 0%, #1aa3c4 100%);
                    color: white;
                    border: none;
                    padding: 12px 24px;
                    border-radius: 8px;
                    font-weight: 700;
                    font-size: 13px;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                    cursor: pointer;
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    box-shadow: 0 4px 15px rgba(34, 193, 230, 0.3);
                    transition: all 0.3s ease;
                }
                .admin-btn-primary:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 6px 20px rgba(34, 193, 230, 0.4);
                }
                .admin-btn-secondary {
                    background: transparent;
                    color: rgba(255,255,255,0.6);
                    border: 1px solid rgba(255,255,255,0.1);
                    padding: 12px 24px;
                    border-radius: 8px;
                    font-weight: 700;
                    font-size: 13px;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                    cursor: pointer;
                    transition: all 0.3s ease;
                }
                .admin-btn-secondary:hover {
                    background: rgba(255,255,255,0.05);
                    color: #fff;
                }
                .admin-text-btn {
                    background: transparent;
                    border: none;
                    color: #22c1e6;
                    font-size: 12px;
                    font-weight: 700;
                    text-transform: uppercase;
                    cursor: pointer;
                }
                .admin-text-btn:hover {
                    text-decoration: underline;
                }

                /* Grid & Cards */
                .admin-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
                    gap: 24px;
                }
                .admin-card {
                    background: #161226;
                    border: 1px solid rgba(255,255,255,0.05);
                    border-radius: 16px;
                    overflow: hidden;
                    transition: all 0.3s ease;
                }
                .admin-card:hover {
                    border-color: rgba(34, 193, 230, 0.3);
                    box-shadow: 0 10px 30px rgba(0,0,0,0.5);
                    transform: translateY(-5px);
                }
                .admin-card-img-wrap {
                    aspect-ratio: 1;
                    background: rgba(255,255,255,0.02);
                    padding: 20px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .admin-card-img {
                    width: 100%;
                    height: 100%;
                    object-fit: contain;
                }
                .admin-card-body {
                    padding: 20px;
                    border-top: 1px solid rgba(255,255,255,0.05);
                }
                .admin-card-title {
                    margin: 0 0 10px 0;
                    font-size: 15px;
                    font-weight: 800;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                }
                .admin-card-footer {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
                .admin-card-price {
                    color: #22c1e6;
                    font-weight: 800;
                    font-size: 18px;
                }
                .admin-card-badge {
                    background: rgba(255,255,255,0.05);
                    padding: 4px 10px;
                    border-radius: 20px;
                    font-size: 10px;
                    font-weight: 700;
                    text-transform: uppercase;
                    color: rgba(255,255,255,0.6);
                }
                .admin-empty-state {
                    grid-column: 1 / -1;
                    text-align: center;
                    padding: 60px;
                    background: rgba(255,255,255,0.02);
                    border-radius: 16px;
                    border: 1px dashed rgba(255,255,255,0.1);
                    color: rgba(255,255,255,0.5);
                    font-style: italic;
                }

                /* Modal */
                .admin-modal-overlay {
                    position: fixed;
                    inset: 0;
                    z-index: 1000;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 20px;
                }
                .admin-modal-backdrop {
                    position: absolute;
                    inset: 0;
                    background: rgba(0,0,0,0.8);
                    backdrop-filter: blur(5px);
                }
                .admin-modal {
                    position: relative;
                    width: 100%;
                    max-width: 700px;
                    background: #161226;
                    border-radius: 20px;
                    border: 1px solid rgba(255,255,255,0.1);
                    display: flex;
                    flex-direction: column;
                    max-height: 90vh;
                    box-shadow: 0 25px 50px rgba(0,0,0,0.5);
                }
                .admin-modal-header {
                    padding: 24px;
                    border-bottom: 1px solid rgba(255,255,255,0.05);
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
                .admin-modal-header h2 {
                    margin: 0;
                    font-size: 18px;
                    font-weight: 800;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                }
                .admin-modal-close {
                    background: none;
                    border: none;
                    color: rgba(255,255,255,0.4);
                    font-size: 20px;
                    cursor: pointer;
                }
                .admin-modal-close:hover {
                    color: #fff;
                }
                .admin-modal-body {
                    padding: 24px;
                    overflow-y: auto;
                    flex: 1;
                }
                .admin-form-row {
                    display: flex;
                    gap: 20px;
                    margin-bottom: 20px;
                }
                .admin-form-group {
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                }
                .admin-form-group.full-width {
                    width: 100%;
                }
                .admin-form-group label {
                    font-size: 11px;
                    font-weight: 700;
                    text-transform: uppercase;
                    color: rgba(255,255,255,0.5);
                    margin-bottom: 8px;
                    letter-spacing: 1px;
                }
                .admin-form-group input, .admin-form-group textarea {
                    background: rgba(255,255,255,0.03);
                    border: 1px solid rgba(255,255,255,0.1);
                    padding: 12px 16px;
                    border-radius: 8px;
                    color: #fff;
                    font-family: inherit;
                    font-size: 14px;
                    outline: none;
                    transition: border-color 0.3s;
                }
                .admin-form-group input:focus, .admin-form-group textarea:focus {
                    border-color: #22c1e6;
                }
                
                /* Variants Builder */
                .admin-variants-section {
                    margin-top: 30px;
                    padding-top: 20px;
                    border-top: 1px solid rgba(255,255,255,0.05);
                }
                .admin-variants-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 15px;
                }
                .admin-variants-header h3 {
                    margin: 0;
                    font-size: 13px;
                    font-weight: 700;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                    color: rgba(255,255,255,0.8);
                }
                .admin-variant-row {
                    display: flex;
                    gap: 15px;
                    margin-bottom: 15px;
                    align-items: center;
                }
                .variant-col {
                    flex: 1;
                }
                .variant-col.small {
                    flex: 0 0 100px;
                }
                .variant-col input {
                    width: 100%;
                    background: rgba(255,255,255,0.03);
                    border: 1px solid rgba(255,255,255,0.1);
                    padding: 10px 12px;
                    border-radius: 6px;
                    color: #fff;
                    font-size: 13px;
                    outline: none;
                }
                .variant-col input:focus {
                    border-color: #22c1e6;
                }
                .variant-remove-btn {
                    background: rgba(239, 68, 68, 0.1);
                    color: #ef4444;
                    border: none;
                    width: 32px;
                    height: 32px;
                    border-radius: 6px;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .variant-remove-btn:hover {
                    background: rgba(239, 68, 68, 0.2);
                }

                .admin-modal-footer {
                    padding: 24px;
                    border-top: 1px solid rgba(255,255,255,0.05);
                    background: rgba(0,0,0,0.2);
                    display: flex;
                    justify-content: flex-end;
                    gap: 15px;
                    border-bottom-left-radius: 20px;
                    border-bottom-right-radius: 20px;
                }

                @media (max-width: 768px) {
                    .admin-header {
                        flex-direction: column;
                        align-items: flex-start;
                        gap: 15px;
                    }
                    .admin-form-row {
                        flex-direction: column;
                        gap: 15px;
                    }
                    .admin-variant-row {
                        flex-wrap: wrap;
                    }
                    .variant-col.small {
                        flex: 1;
                    }
                }
            `}</style>
        </div>
    );
};

export default MerchandiseDashboard;
