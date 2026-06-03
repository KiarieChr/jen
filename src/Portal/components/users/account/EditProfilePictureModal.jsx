import React, { useState, useRef } from 'react';
import { useAuth } from '../../../../context/AuthContext';

const EditProfilePictureModal = ({ onClose }) => {
    const { user, uploadAvatar } = useAuth();

    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const fileInputRef = useRef(null);

    // Current avatar URL
    const currentAvatar = user?.profile_picture
        ? (user.profile_picture.startsWith('http')
            ? user.profile_picture
            : `${window.location.origin}${user.profile_picture}`)
        : null;

    const initials = (() => {
        const f = (user?.firstname || '').charAt(0).toUpperCase();
        const l = (user?.lastname || '').charAt(0).toUpperCase();
        return f + l || '?';
    })();

    const handleFileSelect = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
        if (!allowedTypes.includes(file.type)) {
            setError('Please select a valid image (JPEG, PNG, GIF, or WebP).');
            return;
        }
        if (file.size > 5 * 1024 * 1024) {
            setError('Image must be smaller than 5 MB.');
            return;
        }

        setError(null);
        setSelectedFile(file);
        const reader = new FileReader();
        reader.onloadend = () => setPreviewUrl(reader.result);
        reader.readAsDataURL(file);
    };

    const handleClearSelection = () => {
        setSelectedFile(null);
        setPreviewUrl(null);
        setError(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectedFile) {
            setError('Please select a photo first.');
            return;
        }

        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            await uploadAvatar(selectedFile);
            setSuccess(true);
            setTimeout(() => {
                onClose();
            }, 1200);
        } catch (err) {
            setError(err.message || 'Upload failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const displaySrc = previewUrl || currentAvatar;

    return (
        <div style={{
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            background: 'rgba(0,0,0,0.75)',
            backdropFilter: 'blur(6px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1100,
            padding: '1rem',
        }}>
            <div style={{
                background: 'var(--surface-1, #1A1625)',
                padding: '2rem',
                borderRadius: '1.25rem',
                width: '100%',
                maxWidth: '420px',
                border: '1px solid var(--border-color, rgba(255,255,255,0.1))',
                boxShadow: '0 30px 60px -12px rgba(0,0,0,0.6)',
                textAlign: 'center',
                color: 'var(--text-color, #f8fafc)',
            }}>
                {/* Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', textAlign: 'left' }}>
                    <div>
                        <h2 style={{ fontSize: '1.4rem', color: 'var(--primary)', margin: '0 0 0.2rem 0' }}>Profile Photo</h2>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem', margin: 0 }}>Max 5MB — JPEG, PNG, GIF, or WebP</p>
                    </div>
                    <button
                        onClick={onClose}
                        style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', fontSize: '1.6rem', cursor: 'pointer', lineHeight: 1 }}
                    >×</button>
                </div>

                <form onSubmit={handleSubmit}>
                    {/* Avatar preview */}
                    <div style={{ marginBottom: '1.5rem', position: 'relative', display: 'inline-block' }}>
                        <div style={{
                            width: '150px',
                            height: '150px',
                            borderRadius: '50%',
                            background: displaySrc ? 'transparent' : 'var(--primary)',
                            border: `4px solid ${previewUrl ? '#4f46e5' : 'var(--border-color)'}`,
                            margin: '0 auto',
                            overflow: 'hidden',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '3rem',
                            color: 'white',
                            fontWeight: '700',
                            transition: 'border-color 0.3s',
                        }}>
                            {displaySrc ? (
                                <img
                                    src={displaySrc}
                                    alt="Preview"
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                />
                            ) : initials}
                        </div>
                        {previewUrl && (
                            <div style={{
                                position: 'absolute',
                                top: 0,
                                right: '-8px',
                                background: '#4f46e5',
                                borderRadius: '50%',
                                width: '28px',
                                height: '28px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '0.75rem',
                                border: '2px solid var(--surface-1)',
                            }}>✓</div>
                        )}
                    </div>

                    {/* Alerts */}
                    {error && (
                        <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: '0.5rem', padding: '0.6rem 0.9rem', marginBottom: '1rem', color: '#f87171', fontSize: '0.85rem', textAlign: 'left' }}>
                            ⚠ {error}
                        </div>
                    )}
                    {success && (
                        <div style={{ background: 'rgba(74,222,128,0.1)', border: '1px solid rgba(74,222,128,0.3)', borderRadius: '0.5rem', padding: '0.6rem 0.9rem', marginBottom: '1rem', color: '#4ade80', fontSize: '0.85rem', textAlign: 'left' }}>
                            ✓ Photo updated successfully!
                        </div>
                    )}

                    {/* File pick button */}
                    <div style={{ display: 'grid', gap: '0.75rem', marginBottom: '1.5rem' }}>
                        <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            disabled={loading}
                            style={{
                                padding: '0.75rem',
                                borderRadius: '0.5rem',
                                border: '1px dashed var(--border-color)',
                                background: 'var(--bg-color, rgba(255,255,255,0.03))',
                                color: 'var(--text-color)',
                                cursor: 'pointer',
                                fontWeight: '600',
                                fontSize: '0.9rem',
                                transition: 'all 0.2s',
                            }}
                        >
                            📁 {selectedFile ? `Change: ${selectedFile.name.slice(0, 28)}...` : 'Select Photo'}
                        </button>
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileSelect}
                            accept="image/jpeg,image/png,image/gif,image/webp"
                            style={{ display: 'none' }}
                        />

                        {selectedFile && (
                            <button
                                type="button"
                                onClick={handleClearSelection}
                                disabled={loading}
                                style={{
                                    padding: '0.6rem',
                                    borderRadius: '0.5rem',
                                    border: '1px solid rgba(239,68,68,0.35)',
                                    background: 'rgba(239,68,68,0.08)',
                                    color: '#f87171',
                                    cursor: 'pointer',
                                    fontWeight: '600',
                                    fontSize: '0.85rem',
                                }}
                            >
                                ✕ Clear Selection
                            </button>
                        )}
                    </div>

                    {/* Action buttons */}
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={loading}
                            style={{
                                padding: '0.75rem 1.5rem',
                                borderRadius: '0.5rem',
                                border: '1px solid var(--border-color)',
                                background: 'transparent',
                                color: 'var(--text-muted)',
                                cursor: 'pointer',
                                fontSize: '0.9rem',
                            }}
                        >Cancel</button>
                        <button
                            type="submit"
                            disabled={loading || !selectedFile}
                            style={{
                                padding: '0.75rem 1.75rem',
                                borderRadius: '0.5rem',
                                border: 'none',
                                background: (loading || !selectedFile) ? 'var(--border-color)' : '#4f46e5',
                                color: (loading || !selectedFile) ? 'var(--text-muted)' : 'white',
                                fontWeight: '700',
                                cursor: (loading || !selectedFile) ? 'not-allowed' : 'pointer',
                                fontSize: '0.9rem',
                                transition: 'all 0.2s',
                            }}
                        >
                            {loading ? '⏳ Uploading...' : '☁ Upload Photo'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditProfilePictureModal;
