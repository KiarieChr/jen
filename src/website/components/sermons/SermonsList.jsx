import React, { useState } from 'react';
import SermonsFilter from './SermonsFilter';
import SermonCard from './SermonCard';

const SermonsList = () => {
    const [filter, setFilter] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');

    const sermons = [
        {
            id: 1,
            type: 'video',
            title: 'Walking in Kingdom Authority',
            pastor: 'Pastor James Mwangi',
            date: 'December 29, 2025',
            duration: '45 min',
            image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop'
        },
        {
            id: 2,
            type: 'video',
            title: 'The Power of Unity in Christ',
            pastor: 'Pastor Grace Wanjiku',
            date: 'December 22, 2025',
            duration: '38 min',
            image: 'https://images.unsplash.com/photo-1601142634808-38923eb7c560?q=80&w=1000&auto=format&fit=crop'
        },
        {
            id: 3,
            type: 'audio',
            title: 'Discovering Your Purpose',
            pastor: 'Pastor James Mwangi',
            date: 'December 15, 2025',
            duration: '52 min',
            image: 'https://images.unsplash.com/photo-1491841550275-ad7854e35ca6?q=80&w=1000&auto=format&fit=crop'
        },
        {
            id: 4,
            type: 'video',
            title: 'Faith That Moves Mountains',
            pastor: 'Pastor James Mwangi',
            date: 'December 8, 2025',
            duration: '41 min',
            image: 'https://images.unsplash.com/photo-1504609773096-104ff2c73ba4?q=80&w=1000&auto=format&fit=crop'
        },
        {
            id: 5,
            type: 'audio',
            title: 'The Heart of Worship',
            pastor: 'Pastor Grace Wanjiku',
            date: 'December 1, 2025',
            duration: '35 min',
            image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1000&auto=format&fit=crop'
        },
        {
            id: 6,
            type: 'video',
            title: 'Living a Life of Prayer',
            pastor: 'Pastor James Mwangi',
            date: 'November 24, 2025',
            duration: '48 min',
            image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1000&auto=format&fit=crop'
        }
    ];

    const filteredSermons = sermons.filter(sermon => {
        const matchesFilter = filter === 'all' || sermon.type === filter;
        const matchesSearch = sermon.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            sermon.pastor.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    return (
        <section style={{ background: '#eff3c1', paddingBottom: '5rem' }}>
            <SermonsFilter
                filter={filter}
                setFilter={setFilter}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
            />

            <div className="container">
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                    gap: '2rem',
                    marginTop: '1rem'
                }}>
                    {filteredSermons.map(sermon => (
                        <SermonCard key={sermon.id} {...sermon} />
                    ))}
                </div>

                {filteredSermons.length === 0 && (
                    <div style={{ textAlign: 'center', padding: '4rem 0', color: '#64748b' }}>
                        <p>No sermons found matching your criteria.</p>
                    </div>
                )}
            </div>
        </section>
    );
};

export default SermonsList;
