// backend/middleware/errorMiddleware.js

module.exports = function (err, req, res, next) {
    console.error(' Error caught in middleware:', err);


    if (err.name === 'ValidationError') {
        return res.status(400).json({
            message: 'Ошибка валидации данных',
            errors: err.message
        });
    }

    // Если это любая другая неизвестная ошибка
    return res.status(500).json({
        message: 'На сервере произошла непредвиденная ошибка',
        error: err.message
    });
};