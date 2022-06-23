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

    test('Authorized to create', async () => {
        const item = {
            name: "carrots",
            calories: 30,
            type: "vegetable"
        }
        let response = await request.post('/food').send(item).set('Authorization', `Bearer ${testUser.token}`);

        expect(response.status).toEqual(201);
    });

    test('Authorized to read', async () => {
        let response = await request.get('/food').set('Authorization', `Basic Q29keTp0ZXN0cGFzc3dvcmQ=`);
        expect(response.status).toEqual(200);
    });

    test('Authorized to read by id', async () => {
        let response = await request.get('/food/1').set('Authorization', `Basic Q29keTp0ZXN0cGFzc3dvcmQ=`);
        expect(response.status).toEqual(200);
    });

    test('Authorized to update', async () => {
        const item = {
            name: "taco bell",
            calories: 1000,
            type: "protein"
        }
        let response = await request.put('/food/1').send(item).set('Authorization', `Bearer ${testUser.token}`);
        expect(response.status).toEqual(403);
        expect(response.text).toEqual('Access Denied');
    });

    test('Authorized to delete', async () => {
        let response = await request.delete('/food/1').set('Authorization', `Bearer ${testUser.token}`);
        expect(response.status).toEqual(403);
    });

})