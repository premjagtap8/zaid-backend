import Joi from "joi";

import {
  ORDER_STATUS,
} from "../../common/constants/orderStatus.js";



// ======================================================
// CREATE ORDER VALIDATION
// ======================================================

export const createOrderValidation = Joi.object({

  // ====================================================
  // ORDER ITEMS
  // ====================================================

  orderItems: Joi.array()
    .items(

      Joi.object({

        product: Joi.string()
          .trim()
          .required()
          .messages({
            "any.required":
              "Product is required",

            "string.empty":
              "Product is required",
          }),

        title: Joi.string()
          .trim()
          .required()
          .messages({
            "any.required":
              "Product title is required",

            "string.empty":
              "Product title is required",
          }),

        quantity: Joi.number()
          .integer()
          .min(1)
          .required()
          .messages({
            "number.base":
              "Quantity must be a number",

            "number.min":
              "Quantity must be at least 1",

            "any.required":
              "Quantity is required",
          }),

        originalPrice: Joi.number()
          .min(0)
          .required()
          .messages({
            "number.base":
              "Original price must be a number",

            "any.required":
              "Original price is required",
          }),

        discountAmount: Joi.number()
          .min(0)
          .default(0),

        price: Joi.number()
          .min(0)
          .required()
          .messages({
            "number.base":
              "Product price must be a number",

            "any.required":
              "Product price is required",
          }),

        offer: Joi.string()
          .allow(null, "")
          .default(null),

        imageUrl: Joi.string()
          .allow(null, "")
          .default(""),

        // ==================================================
        // QUOTE-BASED ORDER FIELDS (NEW)
        //
        // Only present when this item comes from an approved
        // corporate quotation (My Quotes → Place Order).
        // Optional — normal cart checkout never sends these,
        // so it is completely unaffected.
        // ==================================================

        quotationId: Joi.string()
          .trim()
          .optional(),

        itemId: Joi.string()
          .trim()
          .optional(),

      })

    )
    .min(1)
    .required()
    .messages({
      "array.min":
        "At least one product is required",

      "any.required":
        "Order items are required",
    }),


  // ====================================================
  // SHIPPING ADDRESS
  // ====================================================

  shippingAddress: Joi.object({

    fullName: Joi.string()
      .trim()
      .required(),

    phone: Joi.string()
      .trim()
      .required(),

    addressLine: Joi.string()
      .trim()
      .required(),

    city: Joi.string()
      .trim()
      .required(),

    state: Joi.string()
      .trim()
      .required(),

    pincode: Joi.string()
      .trim()
      .required(),

    country: Joi.string()
      .allow(null, "")
      .default("India"),

    landmark: Joi.string()
      .allow(null, "")
      .default(""),

  })
    .required()
    .messages({
      "any.required":
        "Shipping address is required",
    }),


  // ====================================================
  // TOTAL
  // ====================================================

  totalAmount: Joi.number()
    .min(0)
    .required(),


  // ====================================================
  // COUPON
  // ====================================================

  couponCode: Joi.string()
    .trim()
    .allow("")
    .allow(null)
    .optional()
    .default(""),


  couponDiscount: Joi.number()
    .min(0)
    .optional()
    .default(0),


  // ====================================================
  // PAYMENT METHOD
  // ====================================================

  paymentMethod: Joi.string()
    .valid(
      "CASH",
      "CARD",
      "UPI",
      "ONLINE"
    )
    .default("CASH"),


  // ====================================================
  // ORDER SOURCE
  // ====================================================

  orderSource: Joi.string()
    .valid(
      "ONLINE",
      "WALK_IN"
    )
    .default("ONLINE"),

});

// ======================================================
// UPDATE ORDER STATUS
// ======================================================

// export const updateOrderStatusValidation =
//   Joi.object({

//     status: Joi.string()
//       .valid(
//         ...Object.values(
//           ORDER_STATUS
//         )
//       )
//       .required(),

//   });

export const updateOrderStatusValidation =
Joi.object({

  status: Joi.string()
    .valid(
      ...Object.values(
        ORDER_STATUS
      )
    )
    .required(),

  message: Joi.string()
    .allow("")
    .max(500)
    .default(""),

});

// ======================================================
// UPDATE PAYMENT STATUS
// ======================================================

export const updatePaymentStatusValidation =
  Joi.object({

    paymentStatus: Joi.string()
      .valid(
        "PENDING",
        "PAID",
        "FAILED",
        "REFUNDED"
      )
      .required(),

    paymentId: Joi.string()
      .allow(null, ""),

  });