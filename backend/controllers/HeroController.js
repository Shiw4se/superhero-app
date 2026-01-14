const HeroService = require('../services/heroService');

class HeroController {

    async create(req, res, next) {
        try {
            const images = req.files ? req.files.map(f => f.filename) : [];
            const hero = await HeroService.create(req.body, images);

            return res.status(201).json(hero);
        } catch (e) {
            next(e);
        }
    }


    async getAll(req, res, next) {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = 5;
            const result = await HeroService.getAll(page, limit);
            res.json(result);
        } catch (e) {
            next(e);
        }
    }


    async getOne(req, res, next) {
        try {
            const hero = await HeroService.getOne(req.params.id);
            res.json(hero);
        } catch (e) {
            next(e);
        }
    }


    async update(req, res, next) {
        try {
            const newImages = req.files ? req.files.map(f => f.filename) : [];
            const updatedHero = await HeroService.update(req.params.id, req.body, newImages);
            res.json(updatedHero);
        } catch (e) {
            next(e);
        }
    }


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