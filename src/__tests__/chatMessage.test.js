const request = require('supertest');
const { app, server } = require('../server');
const statusCodes = require('../constants/statusCodes');
const { testCredentials } = require('../config');

describe('Test Chat Message Routes', () => {
    let authCookies;

    test('Login As Normal User', async () => {
        // Log in to obtain the authentication token
        const resp = await request(app)
            .post('/auth/login')
            .send({
                mobile: testCredentials[0].mobile,
                password: testCredentials[0].password,
            });

        authCookies = resp.headers['set-cookie'];
    });

    afterAll(() => {
        server.close();
    });

    test('Send Message in Group', async () => {
        const resp = await request(app)
            .post('/message/send')
            .send({
                groupId: 1,
                message: 'My first message in this group'
            })
            .set('Cookie', authCookies);

        expect(resp.status).toBe(statusCodes.success)
    });

    test('Like Message in Group', async () => {
        const resp = await request(app)
            .patch('/message/like/1')
            .set('Cookie', authCookies);

        const expStatus = resp.body.success ? statusCodes.success : statusCodes.invalidRequest;
        expect(resp.status).toBe(expStatus);
    });
});