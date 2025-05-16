import mongoose from "mongoose";

const InventorySchema = new mongoose.Schema({
  card: { type: mongoose.Schema.Types.ObjectId, ref: 'Card', required: true },
  quantita: { type: Number, required: true },
  condizione: {
    type: String,
    enum: ['Nuova', 'Buona', 'Usata'],
    default: 'Buona'
  },
  lingua: { type: String, default: 'ITA' }, // ITA, ENG, ecc.
  foil: { type: Boolean, default: false },
  prezzoVendita: { type: Number, required: true },
  prezzoAcquisto: { type: Number },
  note: { type: String },
  dataAggiunta: { type: Date, default: Date.now },
}, {
  timestamps: true
});

const Inventory = mongoose.model("Inventory", cardSchema);
export default Inventory;