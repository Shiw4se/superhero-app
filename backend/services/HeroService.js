const Hero = require('../model/Hero');

class HeroService {
    async create(hero, images) {
        const createdHero = await Hero.create({ ...hero, images });
        return createdHero;
    }

    async getAll(page = 1, limit = 5) {
        const offset = (page - 1) * limit;
        const heroes = await Hero.find().skip(offset).limit(limit);
        const count = await Hero.countDocuments();

        return {
            data: heroes,
            meta: {
                total: count,
                page,
                limit
            }
        };
    }

    async getOne(id) {
        if (!id) throw new Error('ID не указан');
        return await Hero.findById(id);
    }

    // --- ВОТ ЗДЕСЬ БЫЛА ПРОБЛЕМА ---
    async update(id, heroData, images) {
        if (!id) throw new Error('ID не указан');

        // Мы явно добавляем массив картинок в объект данных.
        // Mongoose при обновлении сделает ПОЛНУЮ ЗАМЕНУ массива images,
        // а не будет добавлять новые к старым.
        if (images) {
            heroData.images = images;
        }

        const updatedHero = await Hero.findByIdAndUpdate(id, heroData, { new: true });
        return updatedHero;
    }

    async delete(id) {
        if (!id) throw new Error('ID не указан');
        return await Hero.findByIdAndDelete(id);
    }
}

module.exports = new HeroService();