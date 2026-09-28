


import mongoose from "mongoose";

import {
  ORDER_STATUS
} from "../../common/constants/orderStatus.js";


// ======================================================
// ORDER SCHEMA
// ======================================================

const orderSchema = new mongoose.Schema(

  {

    // ====================================================
    // CUSTOMER
    // ====================================================

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },


    // ====================================================
    // WALK-IN SALE PERSON
    // ====================================================

    soldBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },


    // ====================================================
    // ORDER ITEMS
    // ====================================================

    orderItems: [

      {

        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },


        title: {
          type: String,
          required: true,
          trim: true,
        },


        quantity: {
          type: Number,
          required: true,
          min: 1,
        },


        // Original product price
        originalPrice: {
          type: Number,
          required: true,
          min: 0,
        },


        // Discount
        discountAmount: {
          type: Number,
          default: 0,
          min: 0,
        },


        // Final selling price
        price: {
          type: Number,
          required: true,
          min: 0,
        },


      appliedOffer: {

    offerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Offer",
        default: null
    },

    title: {
        type: String,
        default: ""
    },

    discountType: {
        type: String,
        default: ""
    },

    discountValue: {
        type: Number,
        default: 0
    }

},


        // Product image
        imageUrl: {
          type: String,
          default: "",
        },


        // ==============================
        // NEW: Quotation reference
        // (only present for quote-based corporate orders;
        // stays null/undefined for every normal order)
        // ==============================
        quotationRef: {

          quotationId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Quotation",
            default: null,
          },

          itemId: {
            type: mongoose.Schema.Types.ObjectId,
            default: null,
          },

        },

      },

    ],


    // ====================================================
    // SHIPPING ADDRESS
    // ====================================================

    shippingAddress: {

      fullName: {
        type: String,
        required: true,
        trim: true,
      },


      phone: {
        type: String,
        required: true,
        trim: true,
      },


      addressLine: {
        type: String,
        required: true,
        trim: true,
      },


      city: {
        type: String,
        required: true,
        trim: true,
      },


      state: {
        type: String,
        required: true,
        trim: true,
      },


      pincode: {
        type: String,
        required: true,
        trim: true,
      },


      country: {
        type: String,
        default: "India",
      },


      landmark: {
        type: String,
        default: "",
      },

    },


    // ====================================================
    // TOTAL
    // ====================================================

    totalAmount: {
      type: Number,
      required: true,
      min: 0,
    },
   
    // ====================================================
// COUPON (NEW)
// ====================================================

coupon: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "Coupon",
  default: null,
},

couponCode: {
  type: String,
  default: "",
  trim: true,
},

couponDiscount: {
  type: Number,
  default: 0,
  min: 0,
},

finalAmount: {
  type: Number,
  required: true,
  min: 0,
},
// ====================================================
// COUPON (NEW)
// ====================================================

// coupon: {
//   type: mongoose.Schema.Types.ObjectId,
//   ref: "Coupon",
//   default: null,
// },

// couponCode: {
//   type: String,
//   default: "",
//   trim: true,
// },

// couponDiscount: {
//   type: Number,
//   default: 0,
//   min: 0,
// },

// finalAmount: {
//   type: Number,
//   required: true,
//   min: 0,
// },

    // ====================================================
    // ORDER STATUS
    // ====================================================

    orderStatus: {
      type: String,

      enum: Object.values(
        ORDER_STATUS
      ),

      default:
        ORDER_STATUS.PENDING,
    },


    // ====================================================
    // PAYMENT STATUS
    // ====================================================

    paymentStatus: {

      type: String,

      enum: [
        "PENDING",
        "PAID",
        "FAILED",
        "REFUNDED",
      ],

      default: "PENDING",

    },

//new

    paidAmount: {
    type: Number,
    default: 0,
    min: 0,
},



    // Razorpay payment ID
    paymentId: {
      type: String,
      default: "",
      trim: true,
    },


 
    // ====================================================
// ORDER TYPE
// ====================================================

orderType: {
  type: String,
  enum: ["B2C", "B2B"],
  required: true,
},

// ====================================================
// ORDER SOURCE
// ====================================================

orderSource: {

    type: String,

    enum: [
        "ONLINE",
        "WALK_IN",
    ],

    default: "ONLINE",

},


    // ====================================================
    // DELIVERY
    // ====================================================

    deliveryDate: {
      type: Date,
      default: null,
    },


    // ====================================================
// ORDER TRACKING
// ====================================================

tracking: {

  history: [

    {

      status: {
        type: String,
        required: true,
      },

      message: {
        type: String,
        default: "",
        trim: true,
      },

      updatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null,
      },

      createdAt: {
        type: Date,
        default: Date.now,
      },

    },

  ],

  courierName: {
    type: String,
    default: "",
    trim: true,
  },

  trackingNumber: {
    type: String,
    default: "",
    trim: true,
  },

  trackingUrl: {
    type: String,
    default: "",
    trim: true,
  },

  expectedDeliveryDate: {
    type: Date,
    default: null,
  },

},

  },

  {
    timestamps: true,
  }

);


// ======================================================
// MODEL
// ======================================================

const Order = mongoose.model(
  "Order",
  orderSchema
);


export default Order;