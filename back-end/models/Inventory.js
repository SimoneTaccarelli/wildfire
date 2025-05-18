import mongoose from 'mongoose';

const InventorySchema = new mongoose.Schema({
  card: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Card',
    required: true
  },
  condition: {
    type: String,
    enum: ['mint', 'near mint', 'excellent', 'good', 'played', 'poor'],
    required: true
  },
  language: {
    type: String,
    default: 'English'
  },
  isFoil: {
    type: Boolean,
    default: false
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  quantity: {
    type: Number,
    required: true,
    min: 0
  },
  isVisible: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

const Inventory = mongoose.model('Inventory', InventorySchema);
export default Inventory;
