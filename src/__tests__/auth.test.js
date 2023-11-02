const request = require('supertest');
const { app, server } = require('../server');
const { testCredentials } = require('../config');
const statusCodes = require('../constants/statusCodes');

describe('Test Authentication Routes', () => {
    let authCookies = null;

    test('Login as Normal User', async () => {
        const resp = await request(app)
            .post('/auth/login')
            .send({
                mobile: testCredentials[0].mobile,
                password: testCredentials[0].password,
            });

        authCookies = resp.headers['set-cookie'];
        expect(resp.status).toBe(statusCodes.success);
    });

    test('Edit Normal User From Non Admin Account', async () => {
        const resp = await request(app)
            .put('/admin/editUser/8')
            .send({
                userName: 'Dileep Edited',
                mobile: testCredentials[0].mobile,
                password: testCredentials[0].password
            })
            .set('Cookie', authCookies);
        
        expect(resp.status).toBe(statusCodes.unauthorised);
    });

    test('Logout User', async () => {
        const resp = await request(app)
            .post('/auth/logout')
            .set('Cookie', authCookies);

        expect(resp.status).toBe(statusCodes.success);
    });

    afterAll(() => {
        server.close();
    });
});