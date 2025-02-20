import request from 'supertest';
import app from '../../src/app'; // Adjust the path to your app

describe('Wallet API /api/wallets', () => {
    let token: string;

    beforeAll(async () => {
        const res = await request(app)
            .post('/api/auth/login')
            .send({
                username: 'test',
                password: '1234'
            });
        
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('token');
        token = res.body.token;
    });

    it('should get the user wallet', async () => {
        const res = await request(app)
            .get(`/api/wallets/`)
            .set('Authorization', `Bearer ${token}`)
        
        expect(res.statusCode).toEqual(200);
    });

    it('should return 401 if no token is provided', async () => {
        const res = await request(app)
            .get(`/api/wallets/`);
        
        expect(res.statusCode).toEqual(401);
    });

    it('should topup and update wallet balance', async () => {
        const res = await request(app)
            .post(`/api/wallets/topup`)
            .set('Authorization', `Bearer ${token}`)
            .send({
                amount: 2000
            });

        expect(res.statusCode).toEqual(201);
    });

    it('should cannot topup if no token is provided', async () => {
        const res = await request(app)
            .post(`/api/wallets/topup`);
        
        expect(res.statusCode).toEqual(401);
    });

    it('should cannot topup if no amount in body', async () => {
        const res = await request(app)
            .post(`/api/wallets/topup`)
            .set('Authorization', `Bearer ${token}`);
        
        expect(res.statusCode).toEqual(400);
    });

    it('should withdraw and update wallet balance', async () => {
        const res = await request(app)
            .post(`/api/wallets/withdraw`)
            .set('Authorization', `Bearer ${token}`)
            .send({
                amount: 2000
            });

        expect(res.statusCode).toEqual(201);
    });

    it('should cannot withdraw if no token is provided', async () => {
        const res = await request(app)
            .post(`/api/wallets/withdraw`);
        
        expect(res.statusCode).toEqual(401);
    });

    it('should cannot withdraw if no amount in body', async () => {
        const res = await request(app)
            .post(`/api/wallets/withdraw`)
            .set('Authorization', `Bearer ${token}`);
        
        expect(res.statusCode).toEqual(400);
    });

    it('should show the user wallet transaction', async () => {
        const res = await request(app)
            .get(`/api/wallets/transaction`)
            .set('Authorization', `Bearer ${token}`);
        
        expect(res.statusCode).toEqual(200);
    });

    it('should cannot get transaction if no token is provided', async () => {
        const res = await request(app)
            .post(`/api/wallets/transaction`);
        
        expect(res.statusCode).toEqual(401);
    });
});