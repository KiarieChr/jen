import React, { useState, useEffect } from 'react';
import api, { API_BASE_URL as API_URL } from '../../services/api';

const TeamManagement = () => {
    const [team, setTeam] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [editingMember, setEditingMember] = useState(null);

    const fetchTeam = async () => {
        try {
            setLoading(true);
            const response = await api.get('get_team.php');
            if (response.success) {
                setTeam(response.data.team || []);
            } else {
                setError(response.error || 'Failed to load team');
            }
        } catch (err) {
            console.error('Error fetching team:', err);
            setError('Connection error');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTeam();
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this team member?')) return;
        try {
            const response = await api.post('delete_team_member.php', { id });
            if (response.success) {
                fetchTeam();
            } else {
                alert(response.error || 'Failed to delete');
            }
        } catch (err) {
            console.error('Delete error:', err);
        }
    };

    return (
        <div style={{ padding: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h1 style={{ color: 'var(--primary)', margin: 0 }}>Team Management</h1>
                <button 
                    onClick={() => { setEditingMember(null); setShowModal(true); }}
                    style={{ padding: '0.75rem 1.5rem', borderRadius: '8px', background: 'var(--primary)', color: 'white', border: 'none', cursor: 'pointer' }}
                >
                    + Add Member
                </button>
            </div>

            {loading ? <p>Loading...</p> : error ? <p style={{ color: 'red' }}>{error}</p> : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
                    {team.map(member => (
                        <div key={member.id} style={{ 
                            background: 'var(--surface-1)', 
                            borderRadius: '12px', 
                            padding: '1.5rem',
                            border: '1px solid var(--border-color)'
                        }}>
                            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1rem' }}>
                                <img 
                                    src={member.image_url ? (member.image_url.startsWith('http') ? member.image_url : `${API_URL.replace('api/', '')}${member.image_url}`) : 'https://via.placeholder.com/150'} 
                                    alt={member.name}
                                    style={{ width: '60px', height: '60px', borderRadius: '50%', objectFit: 'cover' }}
                                />
                                <div>
                                    <h3 style={{ margin: 0 }}>{member.name}</h3>
                                    <p style={{ margin: 0, color: 'var(--primary)', fontSize: '0.9rem' }}>{member.role}</p>
                                </div>
                            </div>
                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                <button 
                                    onClick={() => { setEditingMember(member); setShowModal(true); }}
                                    style={{ flex: 1, padding: '0.5rem', borderRadius: '6px', background: 'rgba(34, 193, 230, 0.1)', color: 'var(--primary)', border: 'none', cursor: 'pointer' }}
                                >
                                    Edit
                                </button>
                                <button 
                                    onClick={() => handleDelete(member.id)}
                                    style={{ flex: 1, padding: '0.5rem', borderRadius: '6px', background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', border: 'none', cursor: 'pointer' }}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {showModal && (
                <TeamMemberModal 
                    member={editingMember} 
                    onClose={() => setShowModal(false)} 
                    onSave={fetchTeam} 
                />
            )}
        </div>
    );
};

const TeamMemberModal = ({ member, onClose, onSave }) => {
    const [formData, setFormData] = useState({
        name: member?.name || '',
        role: member?.role || '',
        bio: member?.bio || '',
        image_url: member?.image_url || '',
        twitter_url: member?.twitter_url || '',
        facebook_url: member?.facebook_url || '',
        instagram_url: member?.instagram_url || '',
        linkedin_url: member?.linkedin_url || '',
        sort_order: member?.sort_order || 0,
        status: member?.status || 'active'
    });
    const [uploading, setUploading] = useState(false);

    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formDataFile = new FormData();
        formDataFile.append('image', file);

        setUploading(true);
        try {
            const response = await api.post('upload_team_image.php', formDataFile, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            if (response.success) {
                setFormData(prev => ({ ...prev, image_url: response.data.image_url }));
            } else {
                alert(response.error || 'Upload failed');
            }
        } catch (err) {
            console.error('Upload error:', err);
        } finally {
            setUploading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const endpoint = member ? 'update_team_member.php' : 'add_team_member.php';
            const response = await api.post(endpoint, { ...formData, id: member?.id });
            if (response.success) {
                onSave();
                onClose();
            } else {
                alert(response.error || 'Failed to save');
            }
        } catch (err) {
            console.error('Save error:', err);
        }
    };

    return (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '1rem' }}>
            <div style={{ background: 'var(--bg-color)', padding: '2rem', borderRadius: '16px', width: '100%', maxWidth: '600px', maxHeight: '90vh', overflow: 'auto' }}>
                <h2>{member ? 'Edit Member' : 'Add Member'}</h2>
                <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1rem' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem' }}>Name</label>
                        <input 
                            type="text" 
                            value={formData.name} 
                            onChange={e => setFormData({ ...formData, name: e.target.value })} 
                            style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', background: 'var(--surface-1)', color: 'white', border: '1px solid var(--border-color)' }}
                            required
                        />
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem' }}>Role</label>
                        <input 
                            type="text" 
                            value={formData.role} 
                            onChange={e => setFormData({ ...formData, role: e.target.value })} 
                            style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', background: 'var(--surface-1)', color: 'white', border: '1px solid var(--border-color)' }}
                            required
                        />
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem' }}>Image</label>
                        <input type="file" onChange={handleFileUpload} />
                        {uploading && <p>Uploading...</p>}
                        {formData.image_url && <p style={{ fontSize: '0.8rem', color: 'var(--primary)' }}>Image ready</p>}
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem' }}>Sort Order</label>
                            <input 
                                type="number" 
                                value={formData.sort_order} 
                                onChange={e => setFormData({ ...formData, sort_order: e.target.value })} 
                                style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', background: 'var(--surface-1)', color: 'white', border: '1px solid var(--border-color)' }}
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem' }}>Status</label>
                            <select 
                                value={formData.status} 
                                onChange={e => setFormData({ ...formData, status: e.target.value })}
                                style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', background: 'var(--surface-1)', color: 'white', border: '1px solid var(--border-color)' }}
                            >
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                            </select>
                        </div>
                    </div>
                    <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                        <button type="button" onClick={onClose} style={{ flex: 1, padding: '0.75rem', borderRadius: '8px', background: 'rgba(255,255,255,0.1)', color: 'white', border: 'none', cursor: 'pointer' }}>Cancel</button>
                        <button type="submit" style={{ flex: 1, padding: '0.75rem', borderRadius: '8px', background: 'var(--primary)', color: 'white', border: 'none', cursor: 'pointer' }}>Save</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default TeamManagement;
