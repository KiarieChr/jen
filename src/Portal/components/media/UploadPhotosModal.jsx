import React, { useState, useRef } from 'react';

const UploadPhotosModal = ({ onClose }) => {
    const [uploadType, setUploadType] = useState('file'); // 'file' or 'url'
    const [files, setFiles] = useState([]);
    const [formData, setFormData] = useState({
        title: '',
        date: '',
        category: 'Event Gallery',
        galleryUrl: '',
        description: ''
    });
    const fileInputRef = useRef(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileSelect = (e) => {
        const selectedFiles = Array.from(e.target.files);
        const validFiles = selectedFiles.filter(file => file.type.startsWith('image/'));

        if (validFiles.length !== selectedFiles.length) {
            alert('Some files were skipped because they are not images.');
        }

        setFiles(prev => [...prev, ...validFiles]);
    };

    const removeFile = (index) => {
        setFiles(prev => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (uploadType === 'file' && files.length === 0) {
            alert('Please select at least one photo.');
            return;
        }
        if (uploadType === 'url' && !formData.galleryUrl) {
            alert('Please enter a gallery URL.');
            return;
        }

        alert('Photo gallery creation simulated: ' + JSON.stringify({
            ...formData,
            uploadType,
            photoCount: files.length,
            fileNames: files.map(f => f.name)
        }));
        onClose();
    };

    const inputStyle = {
        width: '100%',
        padding: '0.75rem',
        background: 'var(--bg-color)',
        border: '1px solid var(--border-color)',
        borderRadius: '0.5rem',
        color: 'var(--text-color)',
        fontSize: '0.9rem',
        marginTop: '0.4rem'
    };

    const labelStyle = {
        color: 'var(--text-muted)',
        fontSize: '0.85rem',
        fontWeight: '500'
    };

    const tabStyle = (isActive) => ({
        padding: '0.5rem 1rem',
        cursor: 'pointer',
        borderBottom: isActive ? '2px solid #22c1e6' : '2px solid transparent',
        color: isActive ? 'var(--text-color)' : 'var(--text-muted)',
        fontWeight: isActive ? '600' : '400',
        transition: 'all 0.2s'
    });

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.7)',
            backdropFilter: 'blur(5px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1100
        }}>
            <div style={{
                background: 'var(--surface-1, #1A1625)',
                padding: '2rem',
                borderRadius: '1rem',
                width: '100%',
                maxWidth: '600px',
                maxHeight: '90vh',
                overflowY: 'auto',
                border: '1px solid var(--border-color, rgba(255,255,255,0.1))',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                color: 'var(--text-color, #f8fafc)'
            }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <h2 style={{ fontSize: '1.5rem', color: 'var(--primary)', margin: 0 }}>Create Photo Gallery</h2>
                    <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', fontSize: '1.5rem', cursor: 'pointer' }}>×</button>
                </div>

                <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-color)' }}>
                    <div style={tabStyle(uploadType === 'file')} onClick={() => setUploadType('file')}>Upload Photos</div>
                    <div style={tabStyle(uploadType === 'url')} onClick={() => setUploadType('url')}>Gallery Link</div>
                </div>

                <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1.25rem' }}>

                    {/* File Upload Area */}
                    {uploadType === 'file' ? (
                        <>
                            <div
                                onClick={() => fileInputRef.current.click()}
                                style={{
                                    border: '2px dashed rgba(255,255,255,0.2)',
                                    borderRadius: '0.75rem',
                                    padding: '1.5rem',
                                    textAlign: 'center',
                                    cursor: 'pointer',
                                    background: 'var(--surface-2)'
                                }}
                            >
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handleFileSelect}
                                    accept="image/*"
                                    multiple
                                    style={{ display: 'none' }}
                                />
                                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🖼️</div>
                                <div style={{ color: 'var(--text-color)', fontWeight: '500' }}>Click to select photos</div>
                                <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '0.2rem' }}>JPG, PNG, WEBP (Multiple allowed)</div>
                            </div>

                            {/* Selected Files Preview */}
                            {files.length > 0 && (
                                <div style={{
                                    display: 'flex',
                                    flexWrap: 'wrap',
                                    gap: '0.5rem',
                                    padding: '0.5rem',
                                    background: 'var(--border-color)',
                                    borderRadius: '0.5rem',
                                    maxHeight: '100px',
                                    overflowY: 'auto'
                                }}>
                                    {files.map((file, index) => (
                                        <div key={index} style={{
                                            background: 'var(--primary)',
                                            color: 'var(--bg-color)',
                                            padding: '0.2rem 0.6rem',
                                            borderRadius: '1rem',
                                            fontSize: '0.8rem',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '0.3rem'
                                        }}>
                                            <span style={{ maxWidth: '100px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{file.name}</span>
                                            <span onClick={() => removeFile(index)} style={{ cursor: 'pointer', fontWeight: 'bold' }}>×</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </>
                    ) : (
                        <div>
                            <label style={labelStyle}>Gallery Link (Google Photos, Flickr, etc.)</label>
                            <input
                                type="url"
                                name="galleryUrl"
                                value={formData.galleryUrl}
                                onChange={handleChange}
                                placeholder="https://photos.google.com/..."
                                style={inputStyle}
                                required={uploadType === 'url'}
                            />
                        </div>
                    )}

                    {/* Title */}
                    <div>
                        <label style={labelStyle}>Gallery Title</label>
                        <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="e.g. Youth Camp 2026" style={inputStyle} required />
                    </div>

                    {/* Date & Category */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <div>
                            <label style={labelStyle}>Event Date</label>
                            <input type="date" name="date" value={formData.date} onChange={handleChange} style={inputStyle} required />
                        </div>
                        <div>
                            <label style={labelStyle}>Category</label>
                            <select name="category" value={formData.category} onChange={handleChange} style={inputStyle}>
                                <option>Event Gallery</option>
                                <option>Sunday Service</option>
                                <option>Outreach</option>
                                <option>Facility Update</option>
                                <option>Other</option>
                            </select>
                        </div>
                    </div>

                    {/* Description */}
                    <div>
                        <label style={labelStyle}>Description</label>
                        <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Brief description of the gallery..." style={{ ...inputStyle, minHeight: '80px', resize: 'vertical' }} />
                    </div>

                    {/* Actions */}
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
                        <button type="button" onClick={onClose} style={{
                            padding: '0.75rem 1.5rem',
                            borderRadius: '0.5rem',
                            border: '1px solid var(--border-color)',
                            background: 'transparent',
                            color: 'var(--text-muted)',
                            cursor: 'pointer'
                        }}>Cancel</button>
                        <button type="submit" style={{
                            padding: '0.75rem 1.5rem',
                            borderRadius: '0.5rem',
                            border: 'none',
                            background: 'var(--primary)',
                            color: 'var(--bg-color)',
                            fontWeight: '700',
                            cursor: 'pointer'
                        }}>Create Gallery</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UploadPhotosModal;
