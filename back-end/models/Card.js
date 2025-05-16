import mongoose from "mongoose";

const CardSchema = new mongoose.Schema({
  apiId: { type: String, required: true, unique: true }, // ID dell'API esterna
  nome: { type: String, required: true },
  edizione: String,
  gioco: { type: String, enum: ['Magic', 'Pokémon', 'Yu-Gi-Oh!'], required: true },
  immagine: String,
  tipo: String,
}, {
  timestamps: true // aggiunge createdAt e updatedAt
});

const Card = mongoose.model("Card", cardSchema);
export default Card;