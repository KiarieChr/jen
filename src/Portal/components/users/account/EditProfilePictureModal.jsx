import React, { useState, useRef } from 'react';

const EditProfilePictureModal = ({ onClose }) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const fileInputRef = useRef(null);

    const handleFileSelect = (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith('image/')) {
            setSelectedFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewUrl(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            alert('Please select a valid image file.');
        }
    };

    const handleRemovePicture = () => {
        setSelectedFile(null);
        setPreviewUrl(null);
        // In a real app, this might set a flag to delete the current picture
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const action = selectedFile ? 'Updated' : 'Removed';
        alert(`Profile Picture ${action} simulated! File: ${selectedFile ? selectedFile.name : 'None'}`);
        onClose();
    };

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
                background: '#1A1625',
                padding: '2rem',
                borderRadius: '1rem',
                width: '100%',
                maxWidth: '450px',
                border: '1px solid rgba(255,255,255,0.1)',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                textAlign: 'center'
            }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <h2 style={{ fontSize: '1.5rem', color: '#22c1e6', margin: 0 }}>Edit Profile Picture</h2>
                    <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: '#94a3b8', fontSize: '1.5rem', cursor: 'pointer' }}>×</button>
                </div>

                <form onSubmit={handleSubmit}>

                    {/* Preview Area */}
                    <div style={{ marginBottom: '1.5rem' }}>
                        <div style={{
                            width: '150px',
                            height: '150px',
                            borderRadius: '50%',
                            background: '#120D20',
                            border: '4px solid #22c1e6',
                            margin: '0 auto',
                            overflow: 'hidden',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            position: 'relative'
                        }}>
                            {previewUrl ? (
                                <img src={previewUrl} alt="Profile Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            ) : (
                                <span style={{ fontSize: '3rem', color: '#eff3c1' }}>TM</span> // Initials or default generic avatar
                            )}
                        </div>
                    </div>

                    {/* Actions */}
                    <div style={{ display: 'grid', gap: '1rem' }}>
                        <button
                            type="button"
                            onClick={() => fileInputRef.current.click()}
                            style={{
                                padding: '0.75rem',
                                borderRadius: '0.5rem',
                                border: '1px solid rgba(255,255,255,0.1)',
                                background: 'rgba(255,255,255,0.05)',
                                color: '#eff3c1',
                                cursor: 'pointer',
                                fontWeight: '600'
                            }}
                        >
                            Select New Photo
                        </button>
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileSelect}
                            accept="image/*"
                            style={{ display: 'none' }}
                        />

                        {previewUrl && (
                            <button
                                type="button"
                                onClick={handleRemovePicture}
                                style={{
                                    padding: '0.75rem',
                                    borderRadius: '0.5rem',
                                    border: '1px solid rgba(255, 77, 77, 0.3)',
                                    background: 'rgba(255, 77, 77, 0.1)',
                                    color: '#ff4d4d',
                                    cursor: 'pointer',
                                    fontWeight: '600'
                                }}
                            >
                                Remove Picture
                            </button>
                        )}
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '2rem' }}>
                        <button type="button" onClick={onClose} style={{
                            padding: '0.75rem 1.5rem',
                            borderRadius: '0.5rem',
                            border: '1px solid rgba(255,255,255,0.1)',
                            background: 'transparent',
                            color: '#94a3b8',
                            cursor: 'pointer'
                        }}>Cancel</button>
                        <button type="submit" style={{
                            padding: '0.75rem 1.5rem',
                            borderRadius: '0.5rem',
                            border: 'none',
                            background: '#22c1e6',
                            color: '#120D20',
                            fontWeight: '700',
                            cursor: 'pointer'
                        }}>Save Changes</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditProfilePictureModal;
