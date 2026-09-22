import express from "express";


import {

    addToCart,
    getCart,
    updateCartQuantity,
    removeCartItem,
    clearCart,
    //  applyCoupon,
    // removeCoupon

} from "./cart.controller.js";


import {

    validate

} from "../../common/middleware/validate.middleware.js";


import {

    verifyToken

} from "../../common/middleware/auth.middleware.js";


import {

    addToCartValidation

} from "./cart.validation.js";



const router = express.Router();




// =================================
// Add Product To Cart
// =================================

router.post(

    "/add",

    verifyToken,

    validate(addToCartValidation),

    addToCart

);






// =================================
// Get My Cart
// =================================

router.get(

    "/",

    verifyToken,

    getCart
);


// =================================
// Update Cart Quantity
// =================================

router.put(

    "/item/:productId",

    verifyToken,

    updateCartQuantity

);



// =================================
// Remove Cart Item
// =================================

router.delete(

    "/item/:productId",

    verifyToken,

    removeCartItem

);





// =================================
// Clear Cart
// =================================

router.delete(

    "/clear",

    verifyToken,

    clearCart

);


// =================================
// Apply Coupon
// =================================

// router.post(

//     "/apply-coupon",

//     verifyToken,

//     applyCoupon

// );
// =================================
// Remove Coupon
// =================================

// router.delete(

//     "/remove-coupon",

//     verifyToken,

//     removeCoupon

// );





export default router;