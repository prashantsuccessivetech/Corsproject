const request = require('supertest');
const app = require('../server'); 

describe('Test Express Routes', () => {
  it('should return 200 OK when accessing GET /', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(200);
  });

  it('should return 201 Created when creating a new record via POST /create', async () => {
    const data = { name: 'Test', email: 'test@example.com', mobile: 1234567890 };
    const response = await request(app).post('/create').send(data);
    expect(response.statusCode).toBe(201);
  });

});
