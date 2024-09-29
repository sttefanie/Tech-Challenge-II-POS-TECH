import request from 'supertest';
import express from 'express';
import routes from '../routes/autoresRoutes'; // Certifique-se de que o caminho esteja correto
import AutorController from '../controllers/autorController'; // Certifique-se de que o caminho esteja correto

// Mock do AutorController
jest.mock('../controllers/autorController');

const app = express();
app.use(express.json());
app.use(routes);

describe('Testes para as rotas de autores', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Deve listar todos os autores (GET /autores)', async () => {
    const mockAutores = [
      { id: 1, nome: 'Autor 1' },
      { id: 2, nome: 'Autor 2' },
    ];

    AutorController.listarAutores.mockImplementation((req, res) => {
      res.status(200).json(mockAutores);
    });

    const response = await request(app).get('/autores');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockAutores);
  }, 30000);

  it('Deve retornar um autor específico pelo ID (GET /autores/:id)', async () => {
    const mockAutor = { id: 1, nome: 'Autor 1' };

    AutorController.listarAutorPorId.mockImplementation((req, res) => {
      res.status(200).json(mockAutor);
    });

    const response = await request(app).get('/autores/1');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockAutor);
  }, 30000);

  it('Deve cadastrar um novo autor (POST /autores)', async () => {
    const novoAutor = { nome: 'Novo Autor' };
    const mockAutorCriado = { id: 3, ...novoAutor };

    AutorController.cadastrarAutor.mockImplementation((req, res) => {
      res.status(201).json(mockAutorCriado);
    });

    const response = await request(app).post('/autores').send(novoAutor);

    expect(response.status).toBe(201);
    expect(response.body).toEqual(mockAutorCriado);
  }, 30000);

  it('Deve atualizar um autor específico (PUT /autores/:id)', async () => {
    const autorAtualizado = { nome: 'Autor Atualizado' };
    const mockAutorAtualizado = { id: 1, ...autorAtualizado };

    AutorController.atualizarAutor.mockImplementation((req, res) => {
      res.status(200).json(mockAutorAtualizado);
    });

    const response = await request(app).put('/autores/1').send(autorAtualizado);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockAutorAtualizado);
  }, 30000);

  it('Deve excluir um autor pelo ID (DELETE /autores/:id)', async () => {
    AutorController.excluirAutor.mockImplementation((req, res) => {
      res.status(200).json({ message: 'Autor excluído com sucesso' });
    });

    const response = await request(app).delete('/autores/1');

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Autor excluído com sucesso');
  }, 30000);
});
