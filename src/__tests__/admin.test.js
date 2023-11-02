const request = require('supertest');
const { app, server } = require('../server');
const { adminCredentials, testCredentials } = require('../config');
const statusCodes = require('../constants/statusCodes');

describe('Test Admin Routes', () => {
    let authCookies = null;

    test('Login as Admin', async () => {
        const resp = await request(app)
            .post('/auth/login')
            .send({
                mobile: adminCredentials.mobile,
                password: adminCredentials.password,
                toLoginAsAdmin: 1,
            });

        authCookies = resp.headers['set-cookie'];

        expect(resp.status).toBe(statusCodes.success);
    });

    test('Create normal user', async () => {
        const resp = await request(app)
            .post('/admin/addUser')
            .send({
                userName: testCredentials[0].userName,
                mobile: testCredentials[0].mobile,
                password: testCredentials[0].password
            })
            .set('Cookie', authCookies);

        expect(resp.status).toBe(statusCodes.success);
    });

    test('Create Another Normal User', async () => {
        const resp = await request(app)
            .post('/admin/addUser')
            .send({
                userName: testCredentials[1].userName,
                mobile: testCredentials[1].mobile,
                password: testCredentials[1].password
            })
            .set('Cookie', authCookies);


        expect(resp.status).toBe(statusCodes.success);
    });

    test('Edit normal user', async () => {
        const resp = await request(app)
            .put('/admin/editUser/1')
            .send({
                userName: 'Dileep Edited',
                mobile: testCredentials[0].mobile,
                password: testCredentials[0].password
            })
            .set('Cookie', authCookies);

        expect(resp.status).toBe(statusCodes.success);
    });

    afterAll(() => {
        server.close();
    });
});