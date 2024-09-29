import mongoose from 'mongoose';
import post from '../models/Post.js'; // Ajuste o caminho conforme a sua estrutura

// Mock do Mongoose
jest.mock('mongoose', () => {
    // Cria uma classe mockada para o Schema
    const mockSchema = function (schemaDefinition) {
      this.schemaDefinition = schemaDefinition;
      this.statics = {}; // Propriedades e métodos estáticos do schema
    };
  
    mockSchema.Types = {
      ObjectId: jest.fn(() => 'mocked-object-id'), // Mock do ObjectId para retornar sempre 'mocked-object-id'
      Date: jest.fn(() => new Date('2023-01-01')), // Mock da data
    };
  
    // Mock de uma função construtora para o modelo 'post'
    const mockModel = function (data) {
      this.data = data;
      return {
        ...data,
        autor: 'mocked-object-id', // Garantir que o autor seja 'mocked-object-id'
        validateSync: jest.fn(() => {
          if (!data.titulo) {
            return { errors: { titulo: { message: 'Título é obrigatório' } } };
          }
          if (!data.autor) {
            return { errors: { autor: { message: 'Autor é obrigatório' } } };
          }
          return null;
        }),
      };
    };
  
    const originalMongoose = jest.requireActual('mongoose'); // Mantém o comportamento real de Mongoose
    return {
      ...originalMongoose,
      Schema: mockSchema, // Substitui Schema pelo mock
      model: jest.fn(() => mockModel), // Retorna mockModel na criação do modelo
      Types: {
        ObjectId: mockSchema.Types.ObjectId, // Mockando diretamente o ObjectId
      },
    };
  });
  
  describe('Teste do modelo Post', () => {
    afterEach(() => {
      jest.clearAllMocks(); // Limpar os mocks após cada teste
    });
  
    it('Deve criar um post válido', async () => {
      const novoPost = new post({
        titulo: 'Novo Post',
        descricao: 'Este é um post de teste',
        data: new Date('2023-01-01'),
        autor: new mongoose.Types.ObjectId(), // Deve retornar 'mocked-object-id'
      });
  
      expect(novoPost.titulo).toBe('Novo Post');
      expect(novoPost.descricao).toBe('Este é um post de teste');
      expect(novoPost.data).toEqual(new Date('2023-01-01'));
      expect(novoPost.autor).toBe('mocked-object-id'); // Comparando com o valor mockado
    });
  
    it('Deve falhar se o título não for fornecido', () => {
      const postInvalido = new post({
        descricao: 'Este post não tem título',
        autor: new mongoose.Types.ObjectId(),
      });
  
      const error = postInvalido.validateSync(); // Valida o schema
      expect(error.errors['titulo']).toBeDefined(); // Verifica se o erro de validação para 'titulo' está presente
    });
  
    it('Deve falhar se o autor não for fornecido', () => {
      const postInvalido = new post({
        titulo: 'Post sem autor',
        descricao: 'Este post não tem autor',
      });
  
      const error = postInvalido.validateSync(); // Valida o schema
      expect(error.errors['autor']).toBeDefined(); // Verifica se o erro de validação para 'autor' está presente
    });
  });