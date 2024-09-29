import AutorController from '../controllers/autorController.js';
import { autores } from '../models/Autor.js';
import httpMocks from 'node-mocks-http';

// Mock do mongoose no topo do arquivo de teste
jest.mock('mongoose', () => {
  const actualMongoose = jest.requireActual('mongoose'); // Para manter o comportamento real do mongoose em outras partes

  return {
    ...actualMongoose, // Espalha o mongoose original
    Schema: {
      Types: {
        ObjectId: jest.fn(() => 'mocked-object-id'), // Mock do ObjectId
      }
    },
  };
});

// Mock do modelo `autores`
jest.mock('../models/Autor.js', () => ({
  autores: {
    find: jest.fn(),
    findById: jest.fn(),
    create: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    findByIdAndDelete: jest.fn(),
  }
}));

describe('AutorController', () => {
  afterEach(() => {
    jest.clearAllMocks(); // Limpar mocks após cada teste
  });

  it('Deve listar todos os autores com sucesso', async () => {
    const mockAutores = [{ nome: 'Autor 1' }, { nome: 'Autor 2' }];
    autores.find.mockResolvedValue(mockAutores); // Mock para find

    const req = httpMocks.createRequest();
    const res = httpMocks.createResponse();

    await AutorController.listarAutores(req, res);

    expect(res.statusCode).toBe(200);
    expect(res._getJSONData()).toEqual(mockAutores);
    expect(autores.find).toHaveBeenCalledTimes(1);
  });

  it('Deve retornar erro ao listar autores (caso de falha)', async () => {
    const mockError = new Error('Erro ao listar autores');
    autores.find.mockRejectedValue(mockError); // Mock para erro no find

    const req = httpMocks.createRequest();
    const res = httpMocks.createResponse();

    await AutorController.listarAutores(req, res);

    expect(res.statusCode).toBe(500);
    expect(res._getJSONData().message).toBe('Erro ao listar autores - falha na requisição');
    expect(autores.find).toHaveBeenCalledTimes(1);
  });

  it('Deve retornar um autor por ID com sucesso', async () => {
    const mockAutor = { id: 'mocked-object-id', nome: 'Autor 1' };
    autores.findById.mockResolvedValue(mockAutor); // Mock para findById

    const req = httpMocks.createRequest({ params: { id: 'mocked-object-id' } });
    const res = httpMocks.createResponse();

    await AutorController.listarAutorPorId(req, res);

    expect(res.statusCode).toBe(200);
    expect(res._getJSONData()).toEqual(mockAutor);
    expect(autores.findById).toHaveBeenCalledTimes(1);
    expect(autores.findById).toHaveBeenCalledWith('mocked-object-id');
  });

  it('Deve retornar erro ao buscar um autor por ID', async () => {
    const mockError = new Error('Erro ao buscar autor');
    autores.findById.mockRejectedValue(mockError); // Mock para erro no findById

    const req = httpMocks.createRequest({ params: { id: 'mocked-object-id' } });
    const res = httpMocks.createResponse();

    await AutorController.listarAutorPorId(req, res);

    expect(res.statusCode).toBe(500);
    expect(res._getJSONData().message).toBe('Erro ao buscar autor - falha na requisição do autor');
    expect(autores.findById).toHaveBeenCalledTimes(1);
  });

  it('Deve cadastrar um novo autor com sucesso', async () => {
    const mockAutor = { nome: 'Novo Autor' };
    autores.create.mockResolvedValue(mockAutor); // Mock para create

    const req = httpMocks.createRequest({ body: mockAutor });
    const res = httpMocks.createResponse();

    await AutorController.cadastrarAutor(req, res);

    expect(res.statusCode).toBe(201);
    expect(res._getJSONData().autor).toEqual(mockAutor);
    expect(autores.create).toHaveBeenCalledTimes(1);
    expect(autores.create).toHaveBeenCalledWith(mockAutor);
  });

  it('Deve retornar erro ao cadastrar um novo autor', async () => {
    const mockError = new Error('Erro ao cadastrar autor');
    autores.create.mockRejectedValue(mockError); // Mock para erro no create

    const req = httpMocks.createRequest({ body: { nome: 'Novo Autor' } });
    const res = httpMocks.createResponse();

    await AutorController.cadastrarAutor(req, res);

    expect(res.statusCode).toBe(500);
    expect(res._getJSONData().message).toBe('Erro ao cadastrar autor - falha ao cadastrar autor');
    expect(autores.create).toHaveBeenCalledTimes(1);
  });

  it('Deve atualizar um autor com sucesso', async () => {
    autores.findByIdAndUpdate.mockResolvedValue({}); // Mock para findByIdAndUpdate

    const req = httpMocks.createRequest({ params: { id: 'mocked-object-id' }, body: { nome: 'Autor Atualizado' } });
    const res = httpMocks.createResponse();

    await AutorController.atualizarAutor(req, res);

    expect(res.statusCode).toBe(200);
    expect(res._getJSONData().message).toBe('autor atualizado');
    expect(autores.findByIdAndUpdate).toHaveBeenCalledTimes(1);
    expect(autores.findByIdAndUpdate).toHaveBeenCalledWith('mocked-object-id', { nome: 'Autor Atualizado' });
  });

  it('Deve retornar erro ao atualizar um autor', async () => {
    const mockError = new Error('Erro ao atualizar autor');
    autores.findByIdAndUpdate.mockRejectedValue(mockError); // Mock para erro no findByIdAndUpdate

    const req = httpMocks.createRequest({ params: { id: 'mocked-object-id' }, body: { nome: 'Autor Atualizado' } });
    const res = httpMocks.createResponse();

    await AutorController.atualizarAutor(req, res);

    expect(res.statusCode).toBe(500);
    expect(res._getJSONData().message).toBe('Erro ao atualizar autor - falha na atualização');
    expect(autores.findByIdAndUpdate).toHaveBeenCalledTimes(1);
  });

  it('Deve excluir um autor com sucesso', async () => {
    autores.findByIdAndDelete.mockResolvedValue({}); // Mock para findByIdAndDelete

    const req = httpMocks.createRequest({ params: { id: 'mocked-object-id' } });
    const res = httpMocks.createResponse();

    await AutorController.excluirAutor(req, res);

    expect(res.statusCode).toBe(200);
    expect(res._getJSONData().message).toBe('autor excluído com sucesso');
    expect(autores.findByIdAndDelete).toHaveBeenCalledTimes(1);
    expect(autores.findByIdAndDelete).toHaveBeenCalledWith('mocked-object-id');
  });

  it('Deve retornar erro ao excluir um autor', async () => {
    const mockError = new Error('Erro ao excluir autor');
    autores.findByIdAndDelete.mockRejectedValue(mockError); // Mock para erro no findByIdAndDelete

    const req = httpMocks.createRequest({ params: { id: 'mocked-object-id' } });
    const res = httpMocks.createResponse();

    await AutorController.excluirAutor(req, res);

    expect(res.statusCode).toBe(500);
    expect(res._getJSONData().message).toBe('Erro ao excluir autor - falha na exclusão');
    expect(autores.findByIdAndDelete).toHaveBeenCalledTimes(1);
  });
});
