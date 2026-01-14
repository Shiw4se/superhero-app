const HeroService = require('../services/heroService');

class HeroController {
    async create(req, res) {
        try {
            console.log('Body:', req.body);
            console.log('Files:', req.files);
            const images = req.files ? req.files.map(f => f.filename) : [];
            const hero = await HeroService.create(req.body, images);
            res.status(201).json(hero);
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }

    async getAll(req, res) {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = 5;
            const result = await HeroService.getAll(page, limit);
            res.json(result);
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }

    async getOne(req, res) {
        try {
            const hero = await HeroService.getOne(req.params.id);
            res.json(hero);
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }

    async update(req, res) {
        try {
            const newImages = req.files ? req.files.map(f => f.filename) : [];
            const updatedHero = await HeroService.update(req.params.id, req.body, newImages);
            res.json(updatedHero);
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }

    async delete(req, res) {
        try {
            await HeroService.delete(req.params.id);
            res.json({ message: 'Hero deleted' });
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }
}

module.exports = new HeroController();