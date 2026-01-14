const Hero = require('../model/Hero');

class HeroService {

    async create(data, images) {
        const hero = new Hero({ ...data, images });
        return await hero.save();
    }


    async getAll(page, limit) {
        const skip = (page - 1) * limit;
        const total = await Hero.countDocuments();
        const heroes = await Hero.find().skip(skip).limit(limit);

        return {
            data: heroes,
            currentPage: page,
            totalPages: Math.ceil(total / limit),
            totalHeroes: total
        };
    }


    async getOne(id) {
        return await Hero.findById(id);
    }


    async update(id, data, newImages) {
        let updateData = { ...data };


        if (newImages && newImages.length > 0) {
            const oldHero = await Hero.findById(id);
            updateData.images = [...(oldHero.images || []), ...newImages];
        }

        return await Hero.findByIdAndUpdate(id, updateData, { new: true });
    }

    // Удаление
    async delete(id) {
        return await Hero.findByIdAndDelete(id);
    }
}

module.exports = new HeroService();