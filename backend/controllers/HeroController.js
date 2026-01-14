const HeroService = require('../services/heroService');

class HeroController {

    // Создание героя
    async create(req, res, next) {
        try {
            const images = req.files ? req.files.map(f => f.filename) : [];
            const hero = await HeroService.create(req.body, images);
            return res.status(201).json(hero);
        } catch (e) {
            next(e);
        }
    }

    // Получение всех (с пагинацией)
    async getAll(req, res, next) {
        try {
            const page = parseInt(req.query.page) || 1;


            const limit = parseInt(req.query.limit) || 5;

            const result = await HeroService.getAll(page, limit);
            res.json(result);
        } catch (e) {
            next(e);
        }
    }

    // Получение одного
    async getOne(req, res, next) {
        try {
            const hero = await HeroService.getOne(req.params.id);
            res.json(hero);
        } catch (e) {
            next(e);
        }
    }

    // Обновление (ТОТ САМЫЙ МЕТОД С ЛОГИКОЙ ФОТО)
    async update(req, res, next) {
        try {
            // 1. Получаем список старых картинок.
            // FormData передает массивы как JSON-строки, поэтому парсим их.
            let oldImages = [];
            if (req.body.old_images) {
                try {
                    oldImages = JSON.parse(req.body.old_images);
                } catch (e) {
                    console.error('Error parsing old_images:', e);
                    oldImages = [];
                }
            }

            // 2. Получаем новые файлы (если есть)
            const newImages = req.files ? req.files.map(f => f.filename) : [];

            // 3. Соединяем: Сначала старые (в том порядке, как прислал фронт), потом новые
            const finalImages = [...oldImages, ...newImages];

            // 4. Обновляем героя
            const updatedHero = await HeroService.update(req.params.id, req.body, finalImages);
            res.json(updatedHero);
        } catch (e) {
            next(e);
        }
    }

    // Удаление
    async delete(req, res, next) {
        try {
            await HeroService.delete(req.params.id);
            res.json({ message: 'Hero deleted' });
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new HeroController();