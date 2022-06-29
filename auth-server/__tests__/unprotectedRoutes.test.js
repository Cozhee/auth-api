'use strict';

const { users, db } = require('../src/auth/models/index');
const supertest = require('supertest');
const { server } = require('../src/server');
const request = supertest(server);

let testUser;

beforeAll(async () => {
    await db.sync();
    testUser = await users.create({username: 'Cody', password: 'testpassword', role: 'writer'});
});

afterAll(async () => {
    await db.drop();
    await db.close()
});

describe('Access Control Tests', () => {

    test('Can create', async () => {
        const item = {
            name: "carrots",
            calories: 30,
            type: "vegetable"
        }
        let response = await request.post('api/v1/food').send(item)

        expect(response.status).toEqual(201);
    });

    test('Can read', async () => {
        let response = await request.get('api/v1/food')
        expect(response.status).toEqual(200);
    });

    test('Can read by id', async () => {
        let response = await request.get('api/v1/food/1')
        expect(response.status).toEqual(200);
    });

    test('Can update', async () => {
        const item = {
            name: "taco bell",
            calories: 1000,
            type: "protein"
        }
        let response = await request.put('api/v1/food/1').send(item)
        expect(response.status).toEqual(403);
        expect(response.text).toEqual('Access Denied');
    });

    test('Can delete', async () => {
        let response = await request.delete('api/v1/food/1')
        expect(response.status).toEqual(403);
    });

})

