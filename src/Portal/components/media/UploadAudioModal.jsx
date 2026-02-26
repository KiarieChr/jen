import React, { useState, useRef } from 'react';

const UploadAudioModal = ({ onClose }) => {
    const [uploadType, setUploadType] = useState('url'); // 'url' or 'file'
    const [file, setFile] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        preacher: '',
        date: '',
        series: 'Sunday Service',
        audioUrl: '',
        description: ''
    });
    const fileInputRef = useRef(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileSelect = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            if (selectedFile.type.startsWith('audio/')) {
                setFile(selectedFile);
            } else {
                alert('Please upload an audio file (MP3, WAV, etc.)');
            }
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (uploadType === 'file' && !file) {
            alert('Please select an audio file.');
            return;
        }
        if (uploadType === 'url' && !formData.audioUrl) {
            alert('Please enter an audio URL.');
            return;
        }

        alert('Audio upload simulated: ' + JSON.stringify({
            ...formData,
            uploadType,
            fileName: file ? file.name : null
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
                background: 'var(--surface-1)',
                padding: '2rem',
                borderRadius: '1rem',
                width: '100%',
                maxWidth: '600px',
                border: '1px solid var(--border-color)',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
            }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <h2 style={{ fontSize: '1.5rem', color: 'var(--primary)', margin: 0 }}>Upload Audio Sermon</h2>
                    <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', fontSize: '1.5rem', cursor: 'pointer' }}>×</button>
                </div>

                <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-color)' }}>
                    <div style={tabStyle(uploadType === 'url')} onClick={() => setUploadType('url')}>Audio Link</div>
                    <div style={tabStyle(uploadType === 'file')} onClick={() => setUploadType('file')}>Upload Audio File</div>
                </div>

                <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1.25rem' }}>

                    {/* Audio Source */}
                    {uploadType === 'file' ? (
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
                                accept="audio/*"
                                style={{ display: 'none' }}
                            />
                            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🎤</div>
                            {file ? (
                                <div style={{ color: 'var(--primary)', fontWeight: '500' }}>{file.name}</div>
                            ) : (
                                <>
                                    <div style={{ color: 'var(--text-color)', fontWeight: '500' }}>Click to select audio file</div>
                                    <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '0.2rem' }}>MP3, WAV, AAC supported</div>
                                </>
                            )}
                        </div>
                    ) : (
                        <div>
                            <label style={labelStyle}>Audio Link (SoundCloud, Spotify, etc.)</label>
                            <input
                                type="url"
                                name="audioUrl"
                                value={formData.audioUrl}
                                onChange={handleChange}
                                placeholder="https://soundcloud.com/..."
                                style={inputStyle}
                                required={uploadType === 'url'}
                            />
                        </div>
                    )}

                    {/* Title */}
                    <div>
                        <label style={labelStyle}>Sermon Title</label>
                        <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="e.g. The Power of Faith" style={inputStyle} required />
                    </div>

                    {/* Preacher & Date */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <div>
                            <label style={labelStyle}>Preacher / Speaker</label>
                            <input type="text" name="preacher" value={formData.preacher} onChange={handleChange} placeholder="e.g. Pst. John Doe" style={inputStyle} required />
                        </div>
                        <div>
                            <label style={labelStyle}>Date Preached</label>
                            <input type="date" name="date" value={formData.date} onChange={handleChange} style={inputStyle} required />
                        </div>
                    </div>

                    {/* Series */}
                    <div>
                        <label style={labelStyle}>Series / Category</label>
                        <select name="series" value={formData.series} onChange={handleChange} style={inputStyle}>
                            <option>Sunday Service</option>
                            <option>Mid-Week Service</option>
                            <option>Special Conference</option>
                            <option>Youth Service</option>
                            <option>Revival Meeting</option>
                        </select>
                    </div>

                    {/* Description */}
                    <div>
                        <label style={labelStyle}>Description / Notes</label>
                        <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Brief summary..." style={{ ...inputStyle, minHeight: '80px', resize: 'vertical' }} />
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
                        }}>Upload Sermon</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UploadAudioModal;
