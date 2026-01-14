import React, { useEffect, useState } from 'react';
import axios from 'axios';

const HeroList = () => {

    const [heroes, setHeroes] = useState([]);


    useEffect(() => {
        fetchHeroes();
    }, []);


    const fetchHeroes = async () => {
        try {

            const response = await axios.get('http://localhost:5000/api/heroes');

            setHeroes(response.data.data);
            console.log('Heroes loaded:', response.data.data);
        } catch (error) {
            console.error('Loading error:', error);
        }
    };

    return (
        <div>
            <h2>Superheroes</h2>

            {}
            {heroes.length === 0 && <p>Heroes missing right now...</p>}

            <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                {}
                {heroes.map(hero => (
                    <div key={hero._id} style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '10px', width: '200px' }}>

                        {}
                        {hero.images && hero.images.length > 0 && (
                            <img
                                src={`http://localhost:5000/uploads/${hero.images[0]}`}
                                alt={hero.nickname}
                                style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '5px' }}
                            />
                        )}

                        <h3>{hero.nickname}</h3>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HeroList;