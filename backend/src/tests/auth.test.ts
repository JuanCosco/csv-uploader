import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../index';

describe('POST /api/login', () => {
    it('debería retornar ok:true y setear cookie con credenciales válidas', async () => {
        const res = await request(app)
            .post('/api/login')
            .send({ email: 'admin@admin.com', password: 'password' });

        expect(res.status).toBe(200);
        expect(res.body.ok).toBe(true);
        expect(res.headers['set-cookie']).toBeDefined();
    });

    it('debería retornar 401 con password incorrecto', async () => {
        const res = await request(app)
            .post('/api/login')
            .send({ email: 'admin@admin.com', password: 'wrongpassword' });

        expect(res.status).toBe(401);
        expect(res.body.ok).toBe(false);
    });

    it('debería retornar 401 con email inexistente', async () => {
        const res = await request(app)
            .post('/api/login')
            .send({ email: 'noexiste@test.com', password: 'password' });

        expect(res.status).toBe(401);
        expect(res.body.ok).toBe(false);
    });
});

describe('POST /api/upload', () => {
    it('debería retornar 401 sin token', async () => {
        const res = await request(app)
            .post('/api/upload');

        expect(res.status).toBe(401);
        expect(res.body.ok).toBe(false);
    });

    it('debería retornar 400 sin archivo con token válido', async () => {
        const loginRes = await request(app)
            .post('/api/login')
            .send({ email: 'admin@admin.com', password: 'password' });

        const cookie = loginRes.headers['set-cookie'];

        const res = await request(app)
            .post('/api/upload')
            .set('Cookie', cookie);

        expect(res.status).toBe(400);
        expect(res.body.ok).toBe(false);
    });
});

describe('POST /api/users', () => {
    it('debería retornar 401 sin token', async () => {
        const res = await request(app)
            .post('/api/users')
            .send({ name: 'Test', email: 'test@test.com', age: '25' });

        expect(res.status).toBe(401);
        expect(res.body.ok).toBe(false);
    });
});