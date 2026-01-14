import React from 'react';

const HeroDetails = ({ hero, onClose, onEdit }) => {
    if (!hero) return null;

    return (
        <div className="modal-content">
            <button onClick={onClose} className="btn-close">✖</button>


            <div className="form-column">
                <h2 className="details-nickname">{hero.nickname}</h2>
                <h3 className="details-realname">{hero.real_name}</h3>

                <div className="details-section">
                    <strong className="details-label">Origin Story:</strong>
                    <p className="details-text">{hero.origin_description}</p>
                </div>

                <div className="details-section">
                    <strong className="details-label">Superpowers:</strong>
                    <p className="details-text">{hero.superpowers || 'Unknown'}</p>
                </div>

                <div style={{ marginBottom: '30px' }}>
                    <strong className="details-label">Catch Phrase:</strong>
                    <p className="details-catchphrase">
                        "{hero.catch_phrase || '...'}"
                    </p>
                </div>

                <button
                    onClick={onEdit}
                    className="btn btn-primary btn-edit-large"
                >
                    ✏️ Edit Hero
                </button>
            </div>


            <div className="gallery-column">
                <h3 style={{ marginTop: 0 }}>Photo Gallery</h3>

                {hero.images && hero.images.length > 0 ? (
                    <div className="gallery-grid">
                        {hero.images.map((img, index) => (
                            <div key={index} className={`gallery-item ${index === 0 ? 'main-photo' : ''}`}>
                                <img
                                    src={`http://localhost:5000/uploads/${img}`}
                                    alt="hero"
                                    className="gallery-img-zoom"
                                    onClick={() => window.open(`http://localhost:5000/uploads/${img}`, '_blank')}
                                />
                                {index === 0 && (
                                    <div className="star-btn" style={{background: '#fbbf24', color: 'black', cursor: 'default'}}>★</div>
                                )}
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="no-photos-box">
                        No photos available
                    </div>
                )}
            </div>
        </div>
    );
};

export default HeroDetails;