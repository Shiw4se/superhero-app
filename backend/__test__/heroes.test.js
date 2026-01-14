const path = require('path');

require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../index');


jest.setTimeout(30000);

beforeAll(async () => {

    let mongoUrl = process.env.MONGO_URI;


    if (!mongoUrl) {
        throw new Error(' ERROR: Test cannot see MONGO_URL variable. Check that .env file exists in backend folder!');
    }


    if (mongoUrl.includes('?')) {
        mongoUrl = mongoUrl.replace('?', '_test?');
    } else {
        mongoUrl += "_test";
    }

    console.log('🔗 Connecting to Atlas DB (Test Mode)...');

    try {
        await mongoose.connect(mongoUrl);
        console.log(' Connected successfully');
    } catch (err) {
        console.error(' DB Connection Failed:', err);
        throw err;
    }
});

afterAll(async () => {
    await mongoose.connection.close();
});

describe('Heroes API', () => {
    let createdHeroId;

    it('POST /api/heroes — should create a new hero', async () => {
        const newHero = {
            nickname: 'JestMan',
            real_name: 'Testy McTestface',
            origin_description: 'Born inside a computer',
            superpowers: 'Super speed testing',
            catch_phrase: 'All tests passed!'
        };

        const res = await request(app).post('/api/heroes').send(newHero);
        expect(res.statusCode).toBe(201);
        createdHeroId = res.body._id;
    });

    it('GET /api/heroes — should return a list', async () => {
        const res = await request(app).get('/api/heroes');
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body.data)).toBe(true);
    });

    it('PUT /api/heroes/:id — should update a hero', async () => {
        const res = await request(app)
            .put(`/api/heroes/${createdHeroId}`)
            .send({ nickname: 'Super JestMan' });

        expect(res.statusCode).toBe(200);
        expect(res.body.nickname).toBe('Super JestMan');
    });

    it('DELETE /api/heroes/:id — should delete a hero', async () => {
        const res = await request(app).delete(`/api/heroes/${createdHeroId}`);
        expect(res.statusCode).toBe(200);
    });

    it('GET /api/heroes/:id — should return 404 or null after deletion', async () => {
        const res = await request(app).get(`/api/heroes/${createdHeroId}`);
        if (res.statusCode === 200) {
            expect(res.body).toBe(null);
        } else {
            expect(res.statusCode).toBe(404);
        }
    });
});