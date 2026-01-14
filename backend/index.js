require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const heroRoutes = require('./routes/heroes');
const errorHandler = require('./middleware/errorMiddleware'); // <--- 1. Импорт

const app = express();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

app.use('/api/heroes', heroRoutes);


app.use(errorHandler);

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log(' MongoDb successfully connected!'))
    .catch((err) => console.error(' Error', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});