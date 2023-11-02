const request = require('supertest');
const { app, server } = require('../server');
const statusCodes = require('../constants/statusCodes');
const { testCredentials } = require('../config');

describe('Test Chat Group Routes', () => {
    let authCookies;

    test('Login As Normal User',  async () => {
        // Log in to obtain the authentication token
        const resp = await request(app)
            .post('/auth/login')
            .send({
                mobile: testCredentials[0].mobile,
                password: testCredentials[0].password,
            });

        authCookies = resp.headers['set-cookie'];
    });

    test('Create Chat Group', async () => {
        const resp = await request(app)
            .post('/group/new')
            .send({
                groupName: 'My First Group'
            })
            .set('Cookie', authCookies);
            
        
        expect(resp.status).toBe(statusCodes.success)
    });

    test('Search Users To Add in Group', async () => {
        const resp = await request(app)
            .get('/group/search/Ben')
            .set('Cookie', authCookies);

        
        const expStatus = statusCodes.success;
        expect(resp.status).toBe(expStatus);
    });

    test('Add User To Group', async () => {
        const resp = await request(app)
            .post('/group/addUser/1/2')
            .set('Cookie', authCookies);
        
        const expStatus = resp.body.success ? statusCodes.success : statusCodes.invalidRequest;
        expect(resp.status).toBe(expStatus);
    });

    test('Remove User From Group', async () => {
        const resp = await request(app)
            .delete('/group/removeUser/1/2')
            .set('Cookie', authCookies);
        
        const expStatus = resp.body.success ? statusCodes.success : statusCodes.invalidRequest;
        expect(resp.status).toBe(expStatus);
    });

    test('Delete Group', async () => {
        const resp = await request(app)
            .delete('/group/remove/1')
            .set('Cookie', authCookies);

        const expStatus = resp.body.success ? statusCodes.success : statusCodes.unauthorised;
        expect(resp.status).toBe(expStatus);
    });

    afterAll(() => {
        server.close();
    });
});