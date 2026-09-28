// import Product from "../products/product.model.js";
// import Inventory from "../inventory/inventory.model.js";
// import Coupon from "../coupons/coupon.model.js";


// import {

// getCartByUserDB,
// createCartDB,
// saveCartDB,
//  updateCartDB,
// clearCartDB

// } from "./cart.repository.js";

// // =================================
// // Add To Cart
// // =================================

// export const addToCartService = async (

//     userId,

//     data

// )=>{

//     const {

//         product,

//         quantity,
//         originalPrice,
//         discountAmount,
//         finalPrice,

//     } = data;



//     // Product Check

//     const existingProduct =
//     await Product.findById(product);



//     if(!existingProduct){

//         throw new Error(
//             "Product not found"
//         );

//     }



//     // Inventory Check

//     const inventory =
//     await Inventory.findOne({

//         product,

//         isDeleted:false

//     });



//     if(!inventory){

//         throw new Error(
//             "Inventory not found"
//         );

//     }



//     const availableStock =

//         inventory.currentStock -

//         inventory.reservedStock;



//     if(availableStock < quantity){

//         throw new Error(
//             "Insufficient stock"
//         );

//     }



//     // Get Cart

//     let cart =
//     await getCartByUserDB(userId);



//     // Cart Not Exists

//     if(!cart){

//         cart =
//         await createCartDB({

//             user:userId,

//         items: [
//     {
//         product,
//         quantity,
//         originalPrice,
//         discountAmount,
//         finalPrice,
//         offer: existingProduct.offer
//     }
// ]

//         });

//         return cart;

//     }



//     // Product Already Exists

//     const existingItem =
//     cart.items.find(

//         item=>

//         item.product._id.toString()

//         ===

//         product

//     );



//     if(existingItem){

//         existingItem.quantity += quantity;
//     }

//     else{

//         cart.items.push({

//             product,

//             quantity

//         });

//     }



//     return await saveCartDB(cart);

// };

// // =================================
// // Get Cart
// // =================================

// export const getCartService = async(

//     userId

// )=>{

//     return await getCartByUserDB(
//         userId
//     );

// };


// // =================================
// // Update Cart Quantity
// // =================================

// export const updateCartQuantityService = async (
//     userId,
//     productId,
//     quantity
// ) => {

//     // Quantity validation
//     if (
//         !Number.isInteger(quantity) ||
//         quantity < 1
//     ) {

//         throw new Error(
//             "Quantity must be at least 1"
//         );

//     }


//     // Product check
//     const product =
//         await Product.findById(productId);


//     if (!product) {

//         throw new Error(
//             "Product not found"
//         );

//     }


//     // Inventory check
//     const inventory =
//         await Inventory.findOne({

//             product: productId,

//             isDeleted: false

//         });


//     if (!inventory) {

//         throw new Error(
//             "Inventory not found"
//         );

//     }


//     const availableStock =
//         inventory.currentStock -
//         inventory.reservedStock;


//     if (quantity > availableStock) {

//         throw new Error(
//             `Only ${availableStock} item(s) available in stock`
//         );

//     }


//     // Get cart
//     const cart =
//         await getCartByUserDB(userId);


//     if (!cart) {

//         throw new Error(
//             "Cart not found"
//         );

//     }


//     // Find item
//     const cartItem =
//         cart.items.find(

//             item =>
//                 item.product._id.toString() ===
//                 productId.toString()

//         );


//     if (!cartItem) {

//         throw new Error(
//             "Product not found in cart"
//         );

//     }


//     // Update quantity
//     cartItem.quantity =
//         quantity;


//     await saveCartDB(cart);


//     // Return updated populated cart
//     return await getCartByUserDB(userId);

// };

// export const removeCartItemService = async (
//     userId,
//     productId
// ) => {

//     const cart =
//         await getCartByUserDB(userId);


//     if (!cart) {

//         throw new Error(
//             "Cart not found"
//         );

//     }


//     const oldLength =
//         cart.items.length;


//     cart.items =
//         cart.items.filter(

//             item =>
//                 item.product._id.toString() !==
//                 productId.toString()

//         );


//     if (
//         cart.items.length ===
//         oldLength
//     ) {

//         throw new Error(
//             "Product not found in cart"
//         );

//     }


//     await saveCartDB(cart);


//     return await getCartByUserDB(userId);

// };


// // =================================
// // Clear Cart
// // =================================

// export const clearCartService = async(

//     userId

// )=>{

//     return await clearCartDB(
//         userId
//     );

// };





// // =================================
// // Apply Coupon
// // =================================

// export const applyCouponService = async (
//     userId,
//     couponCode
// ) => {

//     const cart = await getCartByUserDB(userId);

//     if (!cart) {
//         throw new Error("Cart not found");
//     }

//     if (cart.items.length === 0) {
//         throw new Error("Cart is empty");
//     }

//     const coupon = await Coupon.findOne({
//         code: couponCode.toUpperCase(),
//         isDeleted: false
//     });

//     if (!coupon) {
//         throw new Error("Invalid coupon");
//     }

//     if (!coupon.isActive) {
//         throw new Error("Coupon is inactive");
//     }

//     if (new Date(coupon.expiryDate) < new Date()) {
//         throw new Error("Coupon expired");
//     }

//     let totalAmount = 0;

//     cart.items.forEach(item => {
//         totalAmount += item.finalPrice * item.quantity;
//     });

//     if (totalAmount < coupon.minOrderValue) {
//         throw new Error(
//             `Minimum order amount should be ₹${coupon.minOrderValue}`
//         );
//     }

//     let discount = 0;

//     if (coupon.discountType === "percent") {

//         discount =
//             (totalAmount * coupon.value) / 100;

//         if (
//             coupon.maxDiscount > 0 &&
//             discount > coupon.maxDiscount
//         ) {

//             discount = coupon.maxDiscount;

//         }

//     } else {

//         discount = coupon.value;

//     }

//     cart.coupon = coupon._id;
//     cart.couponCode = coupon.code;
//     cart.couponDiscount = discount;
//     cart.finalAmount = totalAmount - discount;

//     await updateCartDB(cart);

//     return await getCartByUserDB(userId);

// };


// // =================================
// // Remove Coupon
// // =================================

// export const removeCouponService = async (
//     userId
// ) => {

//     const cart =
//         await getCartByUserDB(userId);

//     if (!cart) {

//         throw new Error(
//             "Cart not found"
//         );

//     }

//     let total = 0;

//     cart.items.forEach(item => {

//         total +=
//             item.finalPrice *
//             item.quantity;

//     });

//     cart.coupon = null;
//     cart.couponCode = "";
//     cart.couponDiscount = 0;
//     cart.finalAmount = total;

//     await updateCartDB(cart);

//     return await getCartByUserDB(userId);

// };





import mongoose from "mongoose";

import Cart from "./cart.model.js";

import Product from "../products/product.model.js";

import {
    getCartDB,
    saveCartDB
} from "./cart.repository.js";

import { getActiveOffersDB } from "../offer/offer.repository.js";
import {
    calculateDiscountedPrice,
    matchOfferToProduct
} from "../../common/utils/offerCalculator.js";


// ======================================================
// HELPER: GET OFFER APPLIED PRICE
// ======================================================

const getOfferAppliedPrice = async (productData, sellingPrice) => {

    const activeOffers = await getActiveOffersDB();

    const offer = matchOfferToProduct(
        productData,
        activeOffers
    );

    if (!offer) {

        return {
            finalPrice: sellingPrice,
            appliedOffer: null
        };
    }

    const finalPrice = calculateDiscountedPrice(
        sellingPrice,
        offer
    );

    return {

        finalPrice,

        appliedOffer: {
            offerId: offer._id,
            title: offer.title,
            discountType: offer.discountType,
            discountValue: offer.discountValue
        }
    };
};
// ======================================================
// INVENTORY MODEL
// ======================================================

let Inventory = null;

try {

    Inventory = mongoose.model("Inventory");

} catch (error) {

    Inventory = null;

}


// ======================================================
// HELPER: GET AVAILABLE STOCK
// ======================================================

const getAvailableStock = async (productId) => {

    if (!Inventory) {
        return null;
    }

    const inventory =
        await Inventory.findOne({
            product: productId
        });

    if (!inventory) {
        return null;
    }

    const currentStock =
        Number(
            inventory.currentStock || 0
        );

    const reservedStock =
        Number(
            inventory.reservedStock || 0
        );

    const availableStock =
        inventory.availableStock !== undefined
            ? Number(inventory.availableStock)
            : Math.max(
                currentStock - reservedStock,
                0
            );

    return availableStock;
};


// ======================================================
// HELPER: GET PRODUCT PRICE
// ======================================================
const getProductPrice = (productData, customerType) => {
    const pricing = productData?.pricing || {};

    const retailPrice = Number(pricing.retailPrice);
    const wholesalePrice = Number(pricing.wholesalePrice);

    const isBusiness =
        String(customerType || "").toUpperCase() === "BUSINESS";

    const sellingPrice =
        isBusiness && Number.isFinite(wholesalePrice) && wholesalePrice > 0
            ? wholesalePrice
            : retailPrice;

    const mrp = Number(pricing.mrp ?? sellingPrice);

    if (!Number.isFinite(sellingPrice) || sellingPrice < 0) {
        throw new Error("Product selling price is invalid");
    }

    return {
        sellingPrice,
        mrp,
        discountAmount: Math.max(mrp - sellingPrice, 0)
    };
};


// ======================================================
// ADD TO CART
// ======================================================

export const addToCartService = async (
    userId,
    data,
    customerType
) => {

    console.log(
        "ADD TO CART SERVICE DATA:",
        data
    );


    // --------------------------------------------------
    // 1. GET DATA
    // --------------------------------------------------

    const {
        product,
        quantity = 1
    } = data || {};


    // --------------------------------------------------
    // 2. VALIDATE PRODUCT
    // --------------------------------------------------

    if (!product) {

        throw new Error(
            "Product id is required"
        );
    }


    if (
        !mongoose.Types.ObjectId.isValid(
            product
        )
    ) {

        throw new Error(
            "Invalid product id"
        );
    }


    // --------------------------------------------------
    // 3. VALIDATE QUANTITY
    // --------------------------------------------------

    const qty =
        Number(quantity);


    if (
        !Number.isInteger(qty) ||
        qty < 1
    ) {

        throw new Error(
            "Quantity must be at least 1"
        );
    }


    // --------------------------------------------------
    // 4. FIND PRODUCT
    // --------------------------------------------------

    const productData =
        await Product.findById(product);


    if (!productData) {

        throw new Error(
            "Product not found"
        );
    }


    console.log(
        "PRODUCT FROM DB:",
        productData
    );


    // --------------------------------------------------
    // 5. GET PRICE
    // --------------------------------------------------

    const {
        sellingPrice,
        mrp,
        discountAmount
    } = getProductPrice(
        productData,
        customerType
    );
    const {
        finalPrice,
        appliedOffer
    } = await getOfferAppliedPrice(
        productData,
        sellingPrice
    );

    console.log(
        "PRODUCT PRICE:",
        {
            sellingPrice,
            mrp,
            discountAmount
        }
    );


    // --------------------------------------------------
    // 6. CHECK INVENTORY
    // --------------------------------------------------

    const availableStock =
        await getAvailableStock(
            productData._id
        );


    if (
        availableStock !== null &&
        availableStock < qty
    ) {

        throw new Error(

            availableStock === 0

                ? "Product is out of stock"

                : `Only ${availableStock} item(s) available`

        );
    }


    // --------------------------------------------------
    // 7. GET CART
    // --------------------------------------------------

    let cart =
        await getCartDB(
            userId
        );


    // --------------------------------------------------
    // 8. CREATE CART
    // --------------------------------------------------

    if (!cart) {

        cart =
            new Cart({

                user: userId,

                items: []

            });
    }


    // --------------------------------------------------
    // 9. FIND EXISTING ITEM
    // --------------------------------------------------

    const existingItem =
        cart.items.find(
            item =>
                item.product &&
                item.product.toString() ===
                productData._id.toString()
        );


    // --------------------------------------------------
    // 10. EXISTING PRODUCT
    // --------------------------------------------------
    if (existingItem) {

        const newQuantity =
            Number(existingItem.quantity || 0) + qty;

        if (
            availableStock !== null &&
            newQuantity > availableStock
        ) {
            throw new Error(
                `Only ${availableStock} item(s) available`
            );
        }

        existingItem.quantity = newQuantity;
        existingItem.price = sellingPrice;
        existingItem.originalPrice = mrp;
        existingItem.discountAmount = discountAmount;

        // CHANGED: ab offer applied price save hoga
        existingItem.finalPrice = finalPrice;
        existingItem.appliedOffer = appliedOffer;
    }

    // --------------------------------------------------
    // 11. NEW PRODUCT
    // --------------------------------------------------

    else {

        cart.items.push({

            product: productData._id,
            quantity: qty,
            price: sellingPrice,
            originalPrice: mrp,
            discountAmount: discountAmount,

            // CHANGED
            finalPrice: finalPrice,
            appliedOffer: appliedOffer
        });
    }

    // --------------------------------------------------
    // 12. SAVE CART
    // --------------------------------------------------

    console.log(
        "CART BEFORE SAVE:",
        cart
    );


    const savedCart =
        await saveCartDB(
            cart
        );


    // --------------------------------------------------
    // 13. POPULATE PRODUCT
    // --------------------------------------------------

    await savedCart.populate({

        path: "items.product",

        select:
            "name slug sku images pricing category brand"

    });


    return savedCart;
};


// ======================================================
// GET CART
// ======================================================

export const getCartService = async (
    userId
) => {

    const cart =
        await getCartDB(
            userId
        );


    if (!cart) {

        return {

            user: userId,

            items: [],

            subtotal: 0,

            total: 0

        };
    }


    await cart.populate({

        path: "items.product",

        select:
            "name slug sku images pricing category brand"

    });


    return cart;
};


// ======================================================
// UPDATE CART QUANTITY
// ======================================================

export const updateCartQuantityService = async (
    userId,
    productId,
    quantity,
    customerType
) => {

    // --------------------------------------------------
    // VALIDATE PRODUCT ID
    // --------------------------------------------------

    if (
        !mongoose.Types.ObjectId.isValid(
            productId
        )
    ) {

        throw new Error(
            "Invalid product id"
        );
    }


    // --------------------------------------------------
    // VALIDATE QUANTITY
    // --------------------------------------------------

    const qty =
        Number(quantity);


    if (
        !Number.isInteger(qty) ||
        qty < 1
    ) {

        throw new Error(
            "Quantity must be at least 1"
        );
    }


    // --------------------------------------------------
    // GET CART
    // --------------------------------------------------

    const cart =
        await getCartDB(
            userId
        );


    if (!cart) {

        throw new Error(
            "Cart not found"
        );
    }


    // --------------------------------------------------
    // FIND ITEM
    // --------------------------------------------------

    const item =
        cart.items.find(
            item =>
                item.product &&
                item.product.toString() ===
                productId.toString()
        );


    if (!item) {

        throw new Error(
            "Product not found in cart"
        );
    }


    // --------------------------------------------------
    // CHECK INVENTORY
    // --------------------------------------------------

    const availableStock =
        await getAvailableStock(
            productId
        );


    if (
        availableStock !== null &&
        qty > availableStock
    ) {

        throw new Error(
            `Only ${availableStock} item(s) available`
        );
    }


    // --------------------------------------------------
    // GET PRODUCT
    // --------------------------------------------------

    const productData =
        await Product.findById(
            productId
        );


    if (!productData) {

        throw new Error(
            "Product not found"
        );
    }


    // --------------------------------------------------
    // GET PRICE
    // --------------------------------------------------

    const {
        sellingPrice,
        mrp,
        discountAmount
    } = getProductPrice(
        productData,
        customerType

    );

    const {
        finalPrice,
        appliedOffer
    } = await getOfferAppliedPrice(
        productData,
        sellingPrice
    );
    // --------------------------------------------------
    // UPDATE ITEM
    // --------------------------------------------------

    item.quantity = qty;
    item.price = sellingPrice;
    item.originalPrice = mrp;
    item.discountAmount = discountAmount;

    // CHANGED
    item.finalPrice = finalPrice;
    item.appliedOffer = appliedOffer;

    // --------------------------------------------------
    // SAVE
    // --------------------------------------------------

    const savedCart =
        await saveCartDB(
            cart
        );


    // --------------------------------------------------
    // POPULATE
    // --------------------------------------------------

    await savedCart.populate({

        path: "items.product",

        select:
            "name slug sku images pricing category brand"

    });


    return savedCart;
};


// ======================================================
// REMOVE CART ITEM
// ======================================================

export const removeCartItemService = async (
    userId,
    productId
) => {

    if (
        !mongoose.Types.ObjectId.isValid(
            productId
        )
    ) {

        throw new Error(
            "Invalid product id"
        );
    }


    const cart =
        await getCartDB(
            userId
        );


    if (!cart) {

        throw new Error(
            "Cart not found"
        );
    }


    const oldLength =
        cart.items.length;


    cart.items =
        cart.items.filter(
            item =>
                item.product &&
                item.product.toString() !==
                productId.toString()
        );


    if (
        cart.items.length ===
        oldLength
    ) {

        throw new Error(
            "Product not found in cart"
        );
    }


    const savedCart =
        await saveCartDB(
            cart
        );


    await savedCart.populate({

        path: "items.product",

        select:
            "name slug sku images pricing category brand"

    });


    return savedCart;
};


// ======================================================
// CLEAR CART
// ======================================================

export const clearCartService = async (
    userId
) => {

    const cart =
        await getCartDB(
            userId
        );


    if (!cart) {

        throw new Error(
            "Cart not found"
        );
    }


    cart.items = [];


    const savedCart =
        await saveCartDB(
            cart
        );


    return savedCart;
};









