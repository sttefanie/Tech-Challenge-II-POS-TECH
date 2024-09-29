import express from 'express';
import routes from './index'; 
import request from 'supertest'; 
import { serveSwagger, setupSwagger } from '../config/swagger'; 

const getMockRouter = () => express.Router();

jest.mock('../routes/autoresRoutes.js', () => getMockRouter());
jest.mock('../routes/postsRoutes.js', () => getMockRouter());

jest.mock('../config/swagger.js', () => ({
  serveSwagger: jest.fn((req, res, next) => next()),
  setupSwagger: jest.fn((req, res) => res.status(200).send('Swagger Docs')),
}));

describe('Testes para as rotas principais', () => {
  let app;

  beforeEach(() => {
    app = express();
    routes(app); 
  });

  it('Deve retornar status 200 para a rota principal', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.text).toBe('Challenge - 2');
  });

  it('Deve chamar o Swagger corretamente na rota /api-docs', async () => {
    const response = await request(app).get('/api-docs');
    expect(response.status).toBe(200);
    expect(response.text).toBe('Swagger Docs');
    expect(serveSwagger).toHaveBeenCalled();
    expect(setupSwagger).toHaveBeenCalled();
  });

  it('Deve usar as rotas de autores', async () => {
    const autoresResponse = await request(app).get('/autores'); 
    expect(autoresResponse.status).toBe(404); 
  });

  it('Deve usar as rotas de posts', async () => {
    const postResponse = await request(app).get('/posts');
    expect(postResponse.status).toBe(404); 
  });
});
