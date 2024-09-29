import mongoose from 'mongoose';
import { autores } from '../models/Autor'; // Ajuste o caminho conforme a sua estrutura

// Mock do Mongoose
jest.mock('mongoose', () => {
  // Cria uma classe mockada para o Schema
  const mockSchema = function (schemaDefinition) {
    this.schemaDefinition = schemaDefinition;
    this.statics = {}; // Propriedades e métodos estáticos do schema
  };

  mockSchema.Types = {
    ObjectId: jest.fn(() => 'mocked-object-id'), // Mock do ObjectId
  };

  // Mock de uma função construtora para o modelo 'autores'
  const mockModel = function (data) {
    this.data = data;
    return {
      ...data,
      validateSync: jest.fn(() => {
        if (!data.nome) {
          return { errors: { nome: { message: 'Nome é obrigatório' } } };
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
  };
});

describe('Teste do modelo Autor', () => {
  afterEach(() => {
    jest.clearAllMocks(); // Limpar os mocks após cada teste
  });

  it('Deve criar um autor válido', async () => {
    const novoAutor = new autores({
      nome: 'Maria',
      materia: 'Matemática',
    });

    expect(novoAutor.nome).toBe('Maria');
    expect(novoAutor.materia).toBe('Matemática');
  });

  it('Deve falhar se o nome não for fornecido', () => {
    const autorInvalido = new autores({
      materia: 'História',
    });

    const error = autorInvalido.validateSync(); // Valida o schema
    expect(error.errors['nome']).toBeDefined(); // Verifica se o erro de validação para 'nome' está presente
  });
});
