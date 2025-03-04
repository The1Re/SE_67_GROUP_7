import request from 'supertest';
import app from '../app';
import prisma from '../models/prisma';

describe('Endpoints Auth', () => {
    const userInput = {
        username: 'testuser',
        password: '1234',
        email: 'testuser@gmail.com'
    };

    const userPayload = {
        username: 'testuser',
        password: '1234'
    }

    afterAll(async () => {
        await prisma.user.delete({
            where: {
                username: userInput.username
            }
        });
    });

    describe('POST /api/auth/register', () => {
        it('should register a new user', async () => {
            const res = await request(app)
                .post('/api/auth/register')
                .send(userInput);
            expect(res.statusCode).toEqual(201);
            expect(res.body).toHaveProperty('message', 'User created successfully');
        });

        it('should return 400 if any field is missing', async () => {
            const res = await request(app)
                .post('/api/auth/register')
                .send({
                    username: userInput.username
                });
            expect(res.statusCode).toEqual(400);
        });

        it('should return 400 if username is already taken', async () => {
            const res = await request(app)
                .post('/api/auth/register')
                .send({
                    username: userInput.username,
                    email: 'newuser@gmail.com',
                    password: userInput.password
                });
            expect(res.statusCode).toEqual(400);
        });

        it('should return 400 if email is already taken', async () => {
            const res = await request(app)
                .post('/api/auth/register')
                .send({
                    username: 'newuser',
                    email: userInput.email,
                    password: userInput.password
                });
            expect(res.statusCode).toEqual(400);
        });

    });

    describe('POST /api/auth/login', () => {
        it('should authenticate user and return a token', async () => {
            const res = await request(app)
                .post('/api/auth/login')
                .send(userPayload);
            expect(res.statusCode).toEqual(200);
            expect(res.body).toHaveProperty('token');
        });

        it('should fail to authenticate with wrong credentials', async () => {
            const res = await request(app)
                .post('/api/auth/login')
                .send({
                    username: 'wronguser',
                    password: 'wrongpassword'
                });
            expect(res.statusCode).toEqual(401);
        });

        it('should return 400 if any field is missing', async () => {
            const res = await request(app)
                .post('/api/auth/login')
                .send({
                    username: userPayload.username
                });
            expect(res.statusCode).toEqual(400);
        });

    });

    describe('GET /api/auth/current-user', () => {
        it('should return 200 if token is valid', async () => {
            const loginRes = await request(app)
                .post('/api/auth/login')
                .send(userPayload);
            const token = loginRes.body.token;

            const res = await request(app)
                .get('/api/auth/current-user')
                .set('Authorization', `Bearer ${token}`);
            expect(res.statusCode).toEqual(200);
        });

        it('should return 401 if no token is provided', async () => {
            const res = await request(app)
                .get('/api/auth/current-user');
            expect(res.statusCode).toEqual(401);
        });

        it('should return 401 if token is invalid', async () => {
            const res = await request(app)
                .get('/api/auth/current-user')
                .set('Authorization', 'Bearer invalidtoken');
            expect(res.statusCode).toEqual(401);
        });

    });
});