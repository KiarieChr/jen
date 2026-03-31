import React, { useState, useEffect, useRef } from 'react';
import { Html5Qrcode } from 'html5-qrcode';

const QRScannerModal = ({ onClose, onScan, eventName }) => {
    const [scanning, setScanning] = useState(false);
    const [error, setError] = useState(null);
    const [lastResult, setLastResult] = useState(null);
    const scannerRef = useRef(null);
    const html5QrCodeRef = useRef(null);

    const startScanner = async () => {
        setError(null);
        try {
            const html5QrCode = new Html5Qrcode('qr-reader');
            html5QrCodeRef.current = html5QrCode;

            await html5QrCode.start(
                { facingMode: 'environment' },
                {
                    fps: 10,
                    qrbox: { width: 250, height: 250 },
                    aspectRatio: 1.0
                },
                (decodedText) => {
                    // Validate format before sending
                    if (/^EVT-\d+-REG-\d+-[a-f0-9]{32}$/.test(decodedText)) {
                        setLastResult(decodedText);
                        onScan(decodedText);
                    } else {
                        setError('Invalid QR code scanned');
                    }
                },
                () => {} // ignore errors during scanning
            );
            setScanning(true);
        } catch (err) {
            console.error('Scanner error:', err);
            setError(
                err.toString().includes('NotAllowedError')
                    ? 'Camera permission denied. Please allow camera access.'
                    : err.toString().includes('NotFoundError')
                        ? 'No camera found on this device.'
                        : 'Failed to start camera: ' + err.message
            );
        }
    };

    const stopScanner = async () => {
        if (html5QrCodeRef.current && scanning) {
            try {
                await html5QrCodeRef.current.stop();
                html5QrCodeRef.current.clear();
            } catch (e) {
                console.warn('Scanner stop error:', e);
            }
            setScanning(false);
        }
    };

    useEffect(() => {
        startScanner();
        return () => {
            stopScanner();
        };
    }, []);

    const handleClose = async () => {
        await stopScanner();
        onClose();
    };

    return (
        <div style={{
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            background: 'rgba(0,0,0,0.7)',
            backdropFilter: 'blur(5px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999
        }}>
            <div style={{
                background: 'var(--surface-1, #1A1625)',
                borderRadius: '1rem',
                width: '90%',
                maxWidth: '500px',
                maxHeight: '90vh',
                overflow: 'auto',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                border: '1px solid var(--border-color)'
            }}>
                {/* Header */}
                <div style={{
                    padding: '1.25rem 1.5rem',
                    borderBottom: '1px solid var(--border-color)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <div>
                        <h2 style={{ margin: 0, fontSize: '1.2rem', color: 'var(--text-color)' }}>
                            QR Code Scanner
                        </h2>
                        {eventName && (
                            <p style={{ margin: '0.25rem 0 0', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                                {eventName}
                            </p>
                        )}
                    </div>
                    <button
                        onClick={handleClose}
                        style={{
                            background: 'none',
                            border: 'none',
                            color: 'var(--text-muted)',
                            fontSize: '1.5rem',
                            cursor: 'pointer',
                            padding: '0.25rem'
                        }}
                    >
                        &times;
                    </button>
                </div>

                {/* Scanner Area */}
                <div style={{ padding: '1.5rem' }}>
                    <div
                        id="qr-reader"
                        ref={scannerRef}
                        style={{
                            width: '100%',
                            borderRadius: '0.75rem',
                            overflow: 'hidden',
                            marginBottom: '1rem'
                        }}
                    />

                    {error && (
                        <div style={{
                            background: 'rgba(239, 68, 68, 0.15)',
                            border: '1px solid rgba(239, 68, 68, 0.3)',
                            borderRadius: '0.5rem',
                            padding: '0.75rem 1rem',
                            color: '#ef4444',
                            fontSize: '0.85rem',
                            marginBottom: '1rem',
                            textAlign: 'center'
                        }}>
                            {error}
                        </div>
                    )}

                    {lastResult && (
                        <div style={{
                            background: 'rgba(34, 197, 94, 0.1)',
                            border: '1px solid rgba(34, 197, 94, 0.3)',
                            borderRadius: '0.5rem',
                            padding: '0.75rem 1rem',
                            color: '#22c55e',
                            fontSize: '0.85rem',
                            marginBottom: '1rem',
                            textAlign: 'center'
                        }}>
                            QR code scanned! Processing check-in...
                        </div>
                    )}

                    <p style={{
                        color: 'var(--text-muted)',
                        fontSize: '0.8rem',
                        textAlign: 'center',
                        margin: '0.5rem 0 0'
                    }}>
                        Point your camera at a registrant's QR code to check them in automatically.
                        The scanner will continue running for multiple check-ins.
                    </p>
                </div>

                {/* Footer */}
                <div style={{
                    padding: '1rem 1.5rem',
                    borderTop: '1px solid var(--border-color)',
                    display: 'flex',
                    justifyContent: 'flex-end',
                    gap: '0.75rem'
                }}>
                    <button
                        onClick={handleClose}
                        style={{
                            padding: '0.6rem 1.25rem',
                            borderRadius: '0.5rem',
                            border: '1px solid var(--border-color)',
                            background: 'transparent',
                            color: 'var(--text-color)',
                            fontSize: '0.9rem',
                            cursor: 'pointer'
                        }}
                    >
                        Close Scanner
                    </button>
                </div>
            </div>
        </div>
    );
};

export default QRScannerModal;
