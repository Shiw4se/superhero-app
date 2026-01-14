import React, { useState } from 'react';
import HeroList from './components/HeroList';
import HeroForm from './components/HeroForm';
import './App.css';


import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedHero, setSelectedHero] = useState(null);

    const handleAddClick = () => {
        setSelectedHero(null);
        setIsModalOpen(true);
    };

    const handleHeroClick = (hero) => {
        setSelectedHero(hero);
        setIsModalOpen(true);
    };

    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>


            <ToastContainer position="bottom-right" theme="colored" autoClose={3000} />

            <div className="header">
                <h1 className="title">Superhero Database 🦸‍♂️</h1>
                <button className="btn btn-primary" onClick={handleAddClick}>
                    + Add Hero
                </button>
            </div>

            <HeroList onHeroClick={handleHeroClick} />

            {isModalOpen && (
                <div className="modal-overlay">
                    <HeroForm
                        onClose={() => setIsModalOpen(false)}
                        initialData={selectedHero}
                    />
                </div>
            )}
        </div>
    );
}

export default App;