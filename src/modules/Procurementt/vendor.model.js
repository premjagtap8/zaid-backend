import mongoose from "mongoose";

const vendorSchema = new mongoose.Schema(
  {
    vendorName: {
      type: String,
      required: true,
      trim: true
    },

    contactPerson: {
      type: String,
      trim: true,
      default: ""
    },

    phone: {
      type: String,
      required: true,
      trim: true
    },

    email: {
      type: String,
      trim: true,
      lowercase: true,
      default: ""
    },

    address: {
      type: String,
      trim: true,
      default: ""
    },

    city: {
      type: String,
      trim: true,
      default: ""
    },

    state: {
      type: String,
      trim: true,
      default: ""
    },

    pincode: {
      type: String,
      trim: true,
      default: ""
    },

    gstNumber: {
      type: String,
      trim: true,
      uppercase: true,
      default: ""
    },

    panNumber: {
      type: String,
      trim: true,
      uppercase: true,
      default: ""
    },

    bankDetails: {
      accountHolderName: {
        type: String,
        trim: true,
        default: ""
      },
      bankName: {
        type: String,
        trim: true,
        default: ""
      },
      accountNumber: {
        type: String,
        trim: true,
        default: ""
      },
      ifscCode: {
        type: String,
        trim: true,
        uppercase: true,
        default: ""
      }
    },

    isActive: {
      type: Boolean,
      default: true
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

export default mongoose.model("Vendor", vendorSchema);