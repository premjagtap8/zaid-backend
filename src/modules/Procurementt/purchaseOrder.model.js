import mongoose from "mongoose";

const poItemSchema = new mongoose.Schema(
  {
    itemModel: {
      type: String,
      enum: ["Product", "RepairPart"],
      default: "Product"
    },

    product: {
      type: mongoose.Schema.Types.ObjectId,
      refPath: "items.itemModel",
      required: true
    },

    quantity: {
      type: Number,
      required: true,
      min: 1
    },

    price: {
      type: Number,
      required: true,
      min: 0
    },

    // NEW: GST rate for this item, e.g. 18 for 18%
    gstRate: {
      type: Number,
      default: 0,
      min: 0
    },

    // NEW: HSN code for this item (optional)
    hsnCode: {
      type: String,
      trim: true,
      default: ""
    },

    receivedQuantity: {
      type: Number,
      default: 0,
      min: 0
    }
  },
  { _id: true }
);

const purchaseOrderSchema = new mongoose.Schema(
  {
    poNumber: {
      type: String,
      unique: true,
      index: true
    },

    vendor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vendor",
      required: true
    },

    items: {
      type: [poItemSchema],
      default: [],
      validate: {
        validator: (arr) => arr.length > 0,
        message: "Purchase order must have at least one item"
      }
    },

    expectedDeliveryDate: {
      type: Date,
      required: true
    },

    // existing: sum of (quantity * price), BEFORE GST — unchanged meaning
    totalAmount: {
      type: Number,
      required: true,
      min: 0
    },

    // NEW: total GST amount across all items
    gstAmount: {
      type: Number,
      default: 0,
      min: 0
    },

    // NEW: totalAmount + gstAmount
    grandTotal: {
      type: Number,
      default: 0,
      min: 0
    },

    status: {
      type: String,
      enum: ["DRAFT", "ORDERED", "RECEIVED", "CANCELLED"],
      default: "DRAFT"
    },

    notes: {
      type: String,
      trim: true,
      default: ""
    },

    orderedAt: {
      type: Date,
      default: null
    },

    receivedAt: {
      type: Date,
      default: null
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    isDeleted: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

purchaseOrderSchema.pre("save", async function () {
  if (!this.poNumber) {
    const count = await mongoose.model("PurchaseOrder").countDocuments();

    this.poNumber = `PO${String(count + 1).padStart(6, "0")}`;
  }
});

export const PurchaseOrder = mongoose.model(
  "PurchaseOrder",
  purchaseOrderSchema
);