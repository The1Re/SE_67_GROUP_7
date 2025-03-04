import supertest from 'supertest';
import app from '../app';
import prisma from 'models/prisma';

describe('Endpoints Trip', () => {
    let token: string;
    let userId: number;

    beforeAll(async () => {
        const res = await supertest(app)
            .post('/api/auth/login')
            .send({
                username: 'test',
                password: '1234'
            });
        
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('token');
        token = res.body.token;
        userId = res.body.data.userId;
    });

    afterAll(async () => {
        await prisma.trip.deleteMany({
            where: {
                ownerTripId: userId
            }
        });
    });

    describe('POST /api/trips', () => {
        it('should create a new trip', async () => {
            const res = await supertest(app)
                .post(`/api/trips/`)
                .set('Authorization', `Bearer ${token}`)
                .send({
                    "title": "หาเพื่อนเที่ยววัดเชี่ยงใหม่ 3 วัน 2 คืน",
                    "description": "หาเพื่อนงับ",
                    "dateStart": "2023-01-01",
                    "dateEnd": "2023-01-03",
                    "maxPerson": 10,
                    "ownerTripId": userId,
                    "type": "free",
                    "price": 0
                });
            
            expect(res.statusCode).toEqual(201);
        });

        it('should not create a new trip when missing required fields', async () => {
            const res = await supertest(app)
                .post(`/api/trips/`)
                .set('Authorization', `Bearer ${token}`)
                .send({
                    "title": "หาเพื่อนเที่ยววัดเชี่ยงใหม่ 3 วัน 2 คืน",
                    "description": "หาเพื่อนงับ",
                    "dateStart": "2023-01-01",
                    "dateEnd": "2023-01-03",
                    "maxPerson": 10,
                    // "ownerTripId": userId,
                    "type": "free",
                    "price": 0
                });
            
            expect(res.statusCode).toEqual(400);
        });

    });

    describe('GET /api/trips', () => {
        it('should get the all available trips', async () => {
            const res = await supertest(app)
                .get(`/api/trips/`)
            
            expect(res.statusCode).toEqual(200);
        });
    });

    describe('GET /api/trips/:id', () => {
        it('should get the all available trips detail', async () => {
            const res = await supertest(app)
                .get(`/api/trips/1`)
    
            expect(res.statusCode).toEqual(200);
        });
    });

});