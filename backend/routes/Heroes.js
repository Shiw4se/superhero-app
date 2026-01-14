// backend/routes/heroes.js
const express = require('express');
const router = express.Router();
const HeroController = require('../controllers/heroController');
const multer = require('multer');

// Настройка загрузки
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

// Маршруты
router.post('/', upload.array('images'), HeroController.create);
router.get('/', HeroController.getAll);
router.get('/:id', HeroController.getOne);
router.put('/:id', upload.array('images'), HeroController.update);
router.delete('/:id', HeroController.delete);

module.exports = router;