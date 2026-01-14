import React, { useState } from 'react';
import HeroList from './components/HeroList';
import HeroForm from './components/HeroForm';
import HeroDetails from './components/HeroDetails'; // <-- Импортируем новый компонент
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

function App() {

    const [mode, setMode] = useState('none');
    const [selectedHero, setSelectedHero] = useState(null);


    const handleAddClick = () => {
        setSelectedHero(null);
        setMode('edit');
    };


    const handleHeroClick = (hero) => {
        setSelectedHero(hero);
        setMode('view');
    };


    const handleEditClick = () => {
        setMode('edit');
    };


    const handleClose = () => {
        setMode('none');
        setSelectedHero(null);
    };

    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
            <ToastContainer position="bottom-right" theme="colored" autoClose={3000} />

            <div className="header">
                <h1 className="title">Superhero Database ️</h1>
                <button className="btn btn-primary" onClick={handleAddClick}>
                    + Add Hero
                </button>
            </div>

            <HeroList onHeroClick={handleHeroClick} />

            {}
            {mode !== 'none' && (
                <div className="modal-overlay">


                    {mode === 'view' && (
                        <HeroDetails
                            hero={selectedHero}
                            onClose={handleClose}
                            onEdit={handleEditClick}
                        />
                    )}


                    {mode === 'edit' && (
                        <HeroForm
                            onClose={handleClose}
                            initialData={selectedHero}
                        />
                    )}

                </div>
            )}
        </div>
    );
}

export default App;