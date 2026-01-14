require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const heroRoutes = require('./routes/heroes'); // <--- 1. Импортируем наши маршруты

const app = express();

app.use(cors());
app.use(express.json());

// <--- 2. Делаем папку uploads публичной
// Теперь картинки доступны по адресу http://localhost:5000/uploads/имя_файла.jpg
app.use('/uploads', express.static('uploads'));

// <--- 3. Подключаем маршруты
// Все запросы, начинающиеся с /api/heroes, пойдут в наш файл routes/heroes.js
app.use('/api/heroes', heroRoutes);

// Подключение к БД
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log(' MongoDb successfully connected!'))
    .catch((err) => console.error(' Error', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});