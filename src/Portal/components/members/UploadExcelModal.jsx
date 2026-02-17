import React, { useState, useRef } from 'react';

const UploadExcelModal = ({ onClose }) => {
    const [file, setFile] = useState(null);
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef(null);

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        const droppedFile = e.dataTransfer.files[0];
        if (droppedFile && (droppedFile.name.endsWith('.xlsx') || droppedFile.name.endsWith('.xls') || droppedFile.name.endsWith('.csv'))) {
            setFile(droppedFile);
        } else {
            alert('Please upload an Excel or CSV file.');
        }
    };

    const handleFileSelect = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!file) {
            alert('Please select a file first.');
            return;
        }
        alert(`Uploading file: ${file.name}`);
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
                maxWidth: '500px',
                border: '1px solid rgba(255,255,255,0.1)',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
            }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <h2 style={{ fontSize: '1.5rem', color: '#eff3c1', margin: 0 }}>Upload Members</h2>
                    <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: '#94a3b8', fontSize: '1.5rem', cursor: 'pointer' }}>×</button>
                </div>

                <form onSubmit={handleSubmit}>
                    <div
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        onClick={() => fileInputRef.current.click()}
                        style={{
                            border: `2px dashed ${isDragging ? '#22c1e6' : 'rgba(255,255,255,0.2)'}`,
                            borderRadius: '1rem',
                            padding: '3rem 2rem',
                            textAlign: 'center',
                            cursor: 'pointer',
                            background: isDragging ? 'rgba(34, 193, 230, 0.05)' : 'transparent',
                            transition: 'all 0.2s',
                            marginBottom: '1rem'
                        }}
                    >
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileSelect}
                            style={{ display: 'none' }}
                            accept=".xlsx,.xls,.csv"
                        />
                        {file ? (
                            <div>
                                <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>📄</div>
                                <div style={{ color: '#eff3c1', fontWeight: '600' }}>{file.name}</div>
                                <div style={{ color: '#94a3b8', fontSize: '0.9rem' }}>{(file.size / 1024).toFixed(2)} KB</div>
                            </div>
                        ) : (
                            <div>
                                <div style={{ fontSize: '2rem', marginBottom: '1rem', opacity: 0.7 }}>☁️</div>
                                <div style={{ color: '#eff3c1', fontWeight: '600', marginBottom: '0.5rem' }}>Click or Drag file here</div>
                                <div style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Supports .xlsx, .xls, .csv</div>
                            </div>
                        )}
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                        <a href="#" style={{ color: '#22c1e6', fontSize: '0.9rem', textDecoration: 'none', borderBottom: '1px solid currentColor' }}>Download Template</a>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                        <button type="button" onClick={onClose} style={{
                            padding: '0.75rem 1.5rem',
                            borderRadius: '0.5rem',
                            border: '1px solid rgba(255,255,255,0.1)',
                            background: 'transparent',
                            color: '#94a3b8',
                            cursor: 'pointer'
                        }}>Cancel</button>
                        <button type="submit" disabled={!file} style={{
                            padding: '0.75rem 1.5rem',
                            borderRadius: '0.5rem',
                            border: 'none',
                            background: file ? '#22c1e6' : 'rgba(255,255,255,0.1)',
                            color: file ? '#120D20' : 'rgba(255,255,255,0.3)',
                            fontWeight: '600',
                            cursor: file ? 'pointer' : 'not-allowed'
                        }}>Upload File</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UploadExcelModal;
