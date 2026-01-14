import React, { useEffect, useState } from 'react';
import axios from 'axios';

const HeroList = ({ onHeroClick }) => {
    const [heroes, setHeroes] = useState([]);

    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [isPaginationEnabled, setIsPaginationEnabled] = useState(true);

    useEffect(() => {
        fetchHeroes();
    }, [page, isPaginationEnabled]);

    const fetchHeroes = async () => {
        try {
            const limit = isPaginationEnabled ? 5 : 1000;
            const response = await axios.get(`http://localhost:5000/api/heroes?page=${page}&limit=${limit}`);

            setHeroes(response.data.data);
            setTotalPages(Math.ceil(response.data.meta.total / limit));
        } catch (error) {
            console.error(error);
        }
    };

    const toggleViewMode = () => {
        setIsPaginationEnabled(!isPaginationEnabled);
        setPage(1);
    };

    const handlePrev = () => {
        if (page > 1) setPage(page - 1);
    };

    const handleNext = () => {
        if (page < totalPages) setPage(page + 1);
    };

    return (
        <div>
            {heroes.length === 0 && <p style={{textAlign: 'center', color: '#888'}}>No heroes yet...</p>}

            <div className="hero-grid">
                {heroes.map(hero => (
                    <div key={hero._id} className="hero-card" onClick={() => onHeroClick(hero)}>
                        <div className="card-img-wrapper">
                            {hero.images && hero.images.length > 0 ? (
                                <img
                                    src={`http://localhost:5000/uploads/${hero.images[0]}`}
                                    alt={hero.nickname}
                                    className="card-img"
                                />
                            ) : (
                                <span style={{color: '#9ca3af'}}>No Image</span>
                            )}
                        </div>
                        <h3 className="card-title">{hero.nickname}</h3>
                    </div>
                ))}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px', marginTop: '40px' }}>

                {isPaginationEnabled && totalPages > 1 && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                        <button
                            className="btn btn-primary"
                            onClick={handlePrev}
                            disabled={page === 1}
                            style={{ opacity: page === 1 ? 0.5 : 1, cursor: page === 1 ? 'not-allowed' : 'pointer' }}
                        >
                            ← Prev
                        </button>

                        <span style={{ fontWeight: 'bold', fontSize: '1.1rem', color: '#4b5563' }}>
                            Page {page} of {totalPages}
                        </span>

                        <button
                            className="btn btn-primary"
                            onClick={handleNext}
                            disabled={page === totalPages}
                            style={{ opacity: page === totalPages ? 0.5 : 1, cursor: page === totalPages ? 'not-allowed' : 'pointer' }}
                        >
                            Next →
                        </button>
                    </div>
                )}

                <button
                    onClick={toggleViewMode}
                    style={{
                        background: 'transparent',
                        border: '1px solid #4f46e5',
                        color: '#4f46e5',
                        padding: '8px 16px',
                        borderRadius: '20px',
                        cursor: 'pointer',
                        fontSize: '0.9rem'
                    }}
                >
                    {isPaginationEnabled ? '🔄 Show All' : '📄 Show Pages'}
                </button>
            </div>
        </div>
    );
};

export default HeroList;