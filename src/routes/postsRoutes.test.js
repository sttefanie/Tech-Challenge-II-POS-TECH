import request from 'supertest';
import express from 'express';
import routes from './postsRoutes'; 
import PostController from '../controllers/postController';

// Mock do PostController
jest.mock('../controllers/postController');

const app = express();
app.use(express.json());
app.use(routes);

describe('Testes para as rotas de post', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  // Aumenta o timeout para 60 segundos
  jest.setTimeout(60000);

  it('Deve listar todos os posts (GET /post)', async () => {
    const mockPosts = [
      { id: 1, titulo: 'Post 1' },
      { id: 2, titulo: 'Post 2' },
    ];

    PostController.listarPost.mockImplementation((req, res) => {
      res.status(200).json(mockPosts); // Garante o envio da resposta
    });

    const response = await request(app).get('/post');
    console.log('Resposta de listar posts:', response.body);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockPosts);
  });

  it('Deve buscar posts pelo título (GET /post/busca)', async () => {
    const mockPosts = [
      { id: 1, titulo: 'Post de Teste' },
    ];

    PostController.listarPostPorTitulo.mockImplementation((req, res) => {
      res.status(200).json(mockPosts); // Garante o envio da resposta
    });

    const response = await request(app).get('/post/busca?titulo=Post de Teste');
    console.log('Resposta de buscar posts:', response.body);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockPosts);
  });

  it('Deve retornar um post específico pelo ID (GET /post/:id)', async () => {
    const mockPost = { id: 1, titulo: 'Post de Teste' };

    PostController.listarPostPorId.mockImplementation((req, res) => {
      res.status(200).json(mockPost); // Garante o envio da resposta
    });

    const response = await request(app).get('/post/1');
    console.log('Resposta de listar post por ID:', response.body);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockPost);
  });

  it('Deve cadastrar um novo post (POST /post)', async () => {
    const novoPost = { titulo: 'Novo Post' };
    const mockPostCriado = { id: 3, ...novoPost };

    PostController.cadastrarPost.mockImplementation((req, res) => {
      res.status(201).json(mockPostCriado); // Garante o envio da resposta
    });

    const response = await request(app).post('/post').send(novoPost);
    console.log('Resposta de cadastrar post:', response.body);

    expect(response.status).toBe(201);
    expect(response.body).toEqual(mockPostCriado);
  });

  it('Deve atualizar um post específico (PUT /post/:id)', async () => {
    const postAtualizado = { titulo: 'Post Atualizado' };
    const mockPostAtualizado = { id: 1, ...postAtualizado };

    PostController.atualizarPost.mockImplementation((req, res) => {
      res.status(200).json(mockPostAtualizado); // Garante o envio da resposta
    });

    const response = await request(app).put('/post/1').send(postAtualizado);
    console.log('Resposta de atualizar post:', response.body);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockPostAtualizado);
  });

  it('Deve excluir um post pelo ID (DELETE /post/:id)', async () => {
    PostController.excluirPost.mockImplementation((req, res) => {
      res.status(200).json({ message: 'Post excluído com sucesso' }); // Garante o envio da resposta
    });

    const response = await request(app).delete('/post/1');
    console.log('Resposta de excluir post:', response.body);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Post excluído com sucesso');
  });
});
