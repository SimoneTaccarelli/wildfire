import mongoose from 'mongoose';

// Schema per le ruling (regole della carta)
const RulingSchema = new mongoose.Schema({
  date: String,
  text: String
}, { _id: false });

// Schema per i nomi in lingua straniera
const ForeignNameSchema = new mongoose.Schema({
  name: String,
  language: String,
  multiverseid: Number
}, { _id: false });

// Schema principale della carta
const CardSchema = new mongoose.Schema({
  apiId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  names: [String],
  manaCost: String,
  cmc: Number,
  colors: [String],
  colorIdentity: [String],
  type: String,
  supertypes: [String],
  types: [String],
  subtypes: [String],
  rarity: String,
  set: String,
  text: String,
  artist: String,
  number: String,
  power: String,
  toughness: String,
  layout: String,
  multiverseid: Number,
  imageUrl: String,
  rulings: [RulingSchema],
  foreignNames: [ForeignNameSchema],
  printings: [String],
  originalText: String,
  originalType: String
}, {
  timestamps: true
});

const Card = mongoose.model('Card', CardSchema);
export default Card;
