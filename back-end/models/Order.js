import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: false,
    },
    items: [{
        card: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Card",
            required: false,
        },
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: false,
        },
    }],
    shippingAddress: {
        name: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
        city: {
            type: String,
            required: true,
        },
        state: {
            type: String,
            required: true,
        },
        zipCode: {
            type: String,
            required: true,
        },
    },
    paymentInfo: {
        stripeSesionId: String,
        paymentStatus: {
            type: String,
            enum: ['pending', 'completed', 'failed', 'refunded'],
            default: 'pending'
        },
        totalAmount: Number,
        status: {
            type: String,
            enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
            default: 'pending'
        }
    }
}, { timestamps: true }); // Corretto posizionamento di { timestamps: true }

const Order = mongoose.model("Order", OrderSchema);
export default Order;