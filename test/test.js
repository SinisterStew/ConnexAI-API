

const server = require('../app.js');
const supertest = require('supertest');
const requestWithSupertest = supertest(server);
const Ajv = require('ajv');
const validator = new Ajv();

const timeJsonSchema = {
    properties: {
        epoch: {
            description: "The current server time, in epoch seconds, at time of processing the request.",
            type: "number"
        }
    },
    required: ["epoch"],
    type: "object"
}
    

describe('Endpoints', () => {

    it('GET /time without auth header', async () => {
      const res = await requestWithSupertest.get('/time');
        expect(res.status).toEqual(403);
    });

    it('GET /metrics with wrong auth token', async () => {
        const res = await requestWithSupertest.get('/metrics').set('Authorization', 'wrongtoken');
          expect(res.status).toEqual(403);
    });

    it('GET /time', async () => {
    const res = await requestWithSupertest.get('/time').set('Authorization', 'mysecrettoken');
        expect(res.status).toEqual(200);
        expect(res.type).toEqual(expect.stringContaining('json'));
    });

    it('GET /time schema validation', async () => {
        const res = await requestWithSupertest.get('/time').set('Authorization', 'mysecrettoken');
            expect(res.status).toEqual(200);
            expect(res.type).toEqual(expect.stringContaining('json'));

            const isDataValid = validator.validate(timeJsonSchema, res.body)
            expect(isDataValid).toEqual(true)
        });

    it('GET /metrics', async () => {
        const res = await requestWithSupertest.get('/metrics').set('Authorization', 'mysecrettoken');
            expect(res.status).toEqual(200);
            expect(res.type).toEqual(expect.stringContaining('text'));
    });
  
  });