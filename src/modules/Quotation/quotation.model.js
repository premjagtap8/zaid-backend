
import mongoose from "mongoose";

// =================================================
// QUOTATION ITEM (one per product in the quote request)
// =================================================

const quotationItemSchema = new mongoose.Schema({

    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
    },

    quantity: {
        type: Number,
        required: true,
        min: 1,
    },

    proposedPrice: {
        type: Number,
        required: true,
    },

    counterPrice: {
        type: Number,
        default: null,
    },

    finalPrice: {
        type: Number,
        default: null,
    },

    status: {
        type: String,
        enum: ["Pending", "Countered", "Approved", "Rejected", "Used"],
        default: "Pending",
    },

});


// =================================================
// QUOTATION (one submission, multiple items — cart style)
// =================================================

const quotationSchema = new mongoose.Schema(
    {

        corporateUser: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        items: [quotationItemSchema],

        respondedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            default: null,
        },

        remarks: {
            type: String,
            default: "",
        },

    },
    {
        timestamps: true,
    }
);

const Quotation = mongoose.model("Quotation", quotationSchema);

export default Quotation;