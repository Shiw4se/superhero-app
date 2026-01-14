require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const heroRoutes = require('./routes/heroes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/api/heroes', heroRoutes);


app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: err.message });
});


if (require.main === module) {
    const PORT = process.env.PORT || 5000;
    const MONGO_URL = process.env.MONGO_URL;

    mongoose.connect(MONGO_URL)
        .then(() => {
            console.log('✅ MongoDb successfully connected!');
            app.listen(PORT, () => {
                console.log(`🚀 Server running on port ${PORT}`);
            });
        })
        .catch((err) => console.log('❌ DB Connection Error:', err));
}

// Экспортируем app для тестов
module.exports = app;