import request from 'supertest';
import http from 'http';
import app from './app.js';

jest.mock('mongoose', () => ({
  connect: jest.fn().mockResolvedValue(() => console.log('Mocking mongoose.connect')),
  Schema: class {
    constructor(schema) {
      this.schema = schema;
    }
    static Types = {
      ObjectId: jest.fn().mockImplementation(() => 'mocked-object-id'),
    };
  },
  model: jest.fn(),
  connection: {
    on: jest.fn(),
    once: jest.fn(),
    close: jest.fn().mockResolvedValue(() => console.log('Mocking mongoose.connection.close')),
  },
}));

describe('Testando a aplicação', () => {
  let server;

  beforeAll(() => {
    server = http.createServer(app);
    server.listen();
  });

  afterAll((done) => {
    server.close(done);
  });

  it('Deve retornar 404 para uma rota inexistente', async () => {
    const response = await request(server).get('/rota-inexistente'); 
    expect(response.status).toBe(404);
  });
});
