import mongoose from 'mongoose';

const autorSchema = new mongoose.Schema({
  id: { type: mongoose.Schema.Types.ObjectId },
  nome: { type: String, required: true },
  materia: { type: String }
}, { versionKey: false });

const autores = mongoose.model('autores', autorSchema);

export { autores, autorSchema };
