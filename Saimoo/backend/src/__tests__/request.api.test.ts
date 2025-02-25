import supertest from "supertest";
import app from "../app";
import prisma from "models/prisma";
import { Request } from "@prisma/client";

describe('Endpoints Request', () => {
    let tokenAdmin: string;

    const clearData = async () => {
        await prisma.request.deleteMany({ 
            where: { 
                OR: [
                    { fullName: 'test temple' },
                    { fullName: 'test guide' }
                ]
            }
        });
        await prisma.user.deleteMany({ 
            where: { 
                OR : [
                    { username: 'test_guide' } ,
                    { username: 'วัดทดสอบ'},
                ]
            }
        });
    }

    beforeAll(async () => {
        const res = await supertest(app)
            .post('/api/auth/login')
            .send({
                username: 'admin',
                password: '1234'
            });
        tokenAdmin = res.body.token;

        await clearData();
    });

    afterAll(async () => {
        await clearData();
    })

    describe('GET /api/requests', () => {
        it('should return 200', async () => {
            const res = await supertest(app)
                .get('/api/requests')
                .set('Authorization', `Bearer ${tokenAdmin}`);

            expect(res.statusCode).toEqual(200);
        });

        it('should return 401 if no token is provided', async () => {
            const res = await supertest(app)
                .get('/api/requests');

            expect(res.statusCode).toEqual(401);
        });
    });

    describe('POST /api/requests/temple', () => {
        it('should return 201', async () => {
            const res = await supertest(app)
                .post('/api/requests/temple')
                .send({
                    "fullName": "test temple",
                    "email": "test_temple@gmail.com",
                    "templeName": "วัดทดสอบ",
                    "temple_doc_path": "uploads\\pdf\\test.pdf",
                    "id_card_path": "uploads\\pdf\\test.pdf"
                });

            expect(res.statusCode).toEqual(201);
            expect(res.body.message).toBe('Success waiting for admin approved');
        });

        it('should return 400 if missing fields', async () => {
            const res = await supertest(app)
                .post('/api/requests/temple')
                .send({
                    "fullName": "test temple",
                    "email": "test_temple@gmail.com",
                    // "templeName": "วัดทดสอบ",
                    "temple_doc_path": "uploads\\pdf\\test.pdf",
                    "id_card_path": "uploads\\pdf\\test.pdf"
                });
            
            expect(res.statusCode).toEqual(400);
            expect(res.body.message).toBe('Please fill all fields');
        });
    });

    describe('POST /api/requests/guide', () => {
        let tokenUser: string;
        let userId: number;

        beforeAll(async () => {
            const loginRes = await supertest(app)
                .post('/api/auth/register')
                .send({
                    username: 'test_guide',
                    email: 'test_guide@gmail.com',
                    password: '1234'
                });
            expect(loginRes.statusCode).toEqual(201);

            const res = await supertest(app)
                .post('/api/auth/login')
                .send({
                    username: 'test_guide',
                    password: '1234'
                });

            expect(res.statusCode).toEqual(200);
            expect(res.body).toHaveProperty('token');
            expect(res.body).toHaveProperty('data');
            tokenUser = res.body.token;
            userId = res.body.data.userId;
        });

        it('should return 201', async () => {
            const res = await supertest(app)
                .post('/api/requests/guide')
                .set('Authorization', `Bearer ${tokenUser}`)
                .send({
                    "fullName": "test guide",
                    "phone": "0123456789",
                    "guide_doc_path": "uploads\\pdf\\test.pdf",
                    "id_card_path": "uploads\\pdf\\test.pdf",
                });

            expect(res.statusCode).toEqual(201);
            expect(res.body.message).toBe('Success waiting for admin approved');
        });

        it('should return 400 if missing fields', async () => {
            const res = await supertest(app)
                .post('/api/requests/guide')
                .set('Authorization', `Bearer ${tokenUser}`)
                .send({
                    // "fullName": "test guide",
                    "phone": "0123456789",
                    "guide_doc_path": "uploads\\pdf\\test.pdf",
                    "id_card_path": "uploads\\pdf\\test.pdf",
                });

            expect(res.statusCode).toEqual(400);
            expect(res.body.message).toBe('Please fill all fields');
        });

        it('should return 401 if no token is provided', async () => {
            const res = await supertest(app)
                .post('/api/requests/guide')
                .send({
                    "fullName": "test guide",
                    "guide_doc_path": "uploads\\pdf\\test.pdf",
                    "id_card_path": "uploads\\pdf\\test.pdf",
                    "phone": "0123456789"
                });

            expect(res.statusCode).toEqual(401);
        });
    });

    describe('PATCH /api/requests/approve/temple', () => {
        let request: Request;

        beforeAll(async () => {
            const r = await prisma.request.findFirst({
                where: {
                    templeName: 'วัดทดสอบ',
                    type: 'Register_as_Temple'
                }
            })

            if (!r)
                throw new Error('Request not found');

            request = r;
        });

        it('should return 200', async () => {
            const res = await supertest(app)
                .patch(`/api/requests/approve/temple/`)
                .set('Authorization', `Bearer ${tokenAdmin}`)
                .send({ requestId: request.id });

            expect(res.statusCode).toEqual(200);
            expect(res.body.message).toBe('Request approved');
        });

        it('should return 400 if missing fields', async () => {
            const res = await supertest(app)
                .patch(`/api/requests/approve/temple`)
                .set('Authorization', `Bearer ${tokenAdmin}`)

            expect(res.statusCode).toEqual(400);
            expect(res.body.message).toBe('Please provide request id');
        });

        it('should return 401 if no token is provided', async () => {
            const res = await supertest(app)
                .patch(`/api/requests/approve/temple/`)
                .send({ requestId: request.id });

            expect(res.statusCode).toEqual(401);
        });
    });

    describe('PATCH /api/requests/approve/guide', () => {
        let request: Request;

        beforeAll(async () => {
            const r = await prisma.request.findFirst({
                where: {
                    fullName: 'test guide',
                    type: 'Become_Guide'
                }
            })

            if (!r)
                throw new Error('Request not found');

            request = r;
        });

        it('should return 200', async () => {
            const res = await supertest(app)
                .patch(`/api/requests/approve/guide/`)
                .set('Authorization', `Bearer ${tokenAdmin}`)
                .send({ requestId: request.id });

            expect(res.statusCode).toEqual(200);
            expect(res.body.message).toBe('Request approved');
        });

        it('should return 400 if missing fields', async () => {
            const res = await supertest(app)
                .patch(`/api/requests/approve/guide`)
                .set('Authorization', `Bearer ${tokenAdmin}`)

            expect(res.statusCode).toEqual(400);
            expect(res.body.message).toBe('Please provide request id');
        });

        it('should return 401 if no token is provided', async () => {
            const res = await supertest(app)
                .patch(`/api/requests/approve/guide/`)
                .send({ requestId: request.id });

            expect(res.statusCode).toEqual(401);
        });

    });

    describe('PATCH /api/requests/reject', () => {
        let request: Request;

        beforeAll(async () => {
            const res = await supertest(app)
                .post('/api/requests/temple')
                .send({
                    "fullName": "test temple2",
                    "email": "test_temple2@gmail.com",
                    "templeName": "วัดทดสอบ2",
                    "temple_doc_path": "uploads\\pdf\\test.pdf",
                    "id_card_path": "uploads\\pdf\\test.pdf"
                });
            
            expect(res.statusCode).toEqual(201);

            const req = await prisma.request.findFirst({
                where: {
                    templeName: 'วัดทดสอบ2',
                    type: 'Register_as_Temple'
                }
            })

            if (!req) {
                throw new Error('Request not found');
            }
            request = req;
        });

        afterAll(async () => {
            await prisma.request.delete({ where: { id: request.id } });
        });

        it('should return 200', async () => {
            const res = await supertest(app)
                .patch(`/api/requests/reject/`)
                .set('Authorization', `Bearer ${tokenAdmin}`)
                .send({ requestId: request.id });

            expect(res.statusCode).toEqual(200);
            expect(res.body.message).toBe('Request rejected');
        });

        it('should return 400 if missing fields', async () => {
            const res = await supertest(app)
                .patch(`/api/requests/reject`)
                .set('Authorization', `Bearer ${tokenAdmin}`)

            expect(res.statusCode).toEqual(400);
            expect(res.body.message).toBe('Please provide request id');
        });

        it('should return 401 if no token is provided', async () => {
            const res = await supertest(app)
                .patch(`/api/requests/reject/`)
                .send({ requestId: request.id });

            expect(res.statusCode).toEqual(401);
        });
    });

});