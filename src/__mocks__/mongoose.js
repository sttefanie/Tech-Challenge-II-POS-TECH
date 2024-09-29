const mongoose = {
  connect: jest.fn().mockResolvedValue(() => {
    console.log('Mocking mongoose.connect');
  }),
  Schema: jest.fn(function(schema) {
    this.schema = schema;
  }),
  model: jest.fn(() => ({
    find: jest.fn(),
    findById: jest.fn(),
    create: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    findByIdAndDelete: jest.fn(),
  })),
  connection: {
    on: jest.fn(),
    once: jest.fn(),
    close: jest.fn().mockResolvedValue(() => {
      console.log('Mocking mongoose.connection.close');
    }),
  },
};

// Definindo tipos de Schema para que funcionem corretamente
mongoose.Schema.Types = {
  ObjectId: jest.fn(() => 'mocked-object-id'),
  Date: jest.fn(() => new Date('2023-01-01')),
};

export default mongoose;
