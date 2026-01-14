import React from 'react';
import HeroList from './components/HeroList';

function App() {
    return (
        <div style={{ padding: '40px', fontFamily: 'Arial, sans-serif' }}>
            <h1>Superhero Database 🦸‍♂️</h1>
            <hr />
            {}
            <HeroList />
        </div>
    );
}

export default App;