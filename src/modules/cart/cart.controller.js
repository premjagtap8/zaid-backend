// import {

//     addToCartService,
//     getCartService,
//     updateCartQuantityService,
//     removeCartItemService,
//      applyCouponService,
//     removeCouponService,
//     clearCartService

// } from "./cart.service.js";


// import {

//     successResponse,
//     errorResponse

// } from "../../common/utils/apiResponse.js";




// // =================================
// // Add Product To Cart
// // =================================

// export const addToCart = async(req,res)=>{

//     try{


//         const cart =

//         await addToCartService(

//             req.user.id,

//             req.body

//         );



//         return successResponse(

//             res,

//             200,

//             "Product added to cart successfully",

//             cart

//         );


//     }

//     catch(error){


//         return errorResponse(

//             res,

//             400,

//             error.message

//         );


//     }

// };






// // =================================
// // Get My Cart
// // =================================

// export const getCart = async(req,res)=>{


//     try{


//         const cart =

//         await getCartService(

//             req.user.id

//         );



//         return successResponse(

//             res,

//             200,

//             "Cart fetched successfully",

//             cart

//         );


//     }

//     catch(error){


//         return errorResponse(

//             res,

//             500,

//             error.message

//         );


//     }


// };


// // =================================
// // Update Cart Quantity
// // =================================

// export const updateCartQuantity = async (
//     req,
//     res
// ) => {

//     try {

//         const {
//             productId
//         } = req.params;


//         const {
//             quantity
//         } = req.body;


//         const cart =
//             await updateCartQuantityService(

//                 req.user.id,

//                 productId,

//                 Number(quantity)

//             );


//         return successResponse(

//             res,

//             200,

//             "Cart quantity updated successfully",

//             cart

//         );

//     }

//     catch (error) {

//         return errorResponse(

//             res,

//             400,

//             error.message

//         );

//     }

// };



// // =================================
// // Remove Cart Item
// // =================================

// export const removeCartItem = async (
//     req,
//     res
// ) => {

//     try {

//         const {
//             productId
//         } = req.params;


//         const cart =
//             await removeCartItemService(

//                 req.user.id,

//                 productId

//             );


//         return successResponse(

//             res,

//             200,

//             "Product removed from cart successfully",

//             cart

//         );

//     }

//     catch (error) {

//         return errorResponse(

//             res,

//             400,

//             error.message

//         );

//     }

// };



// // =================================
// // Clear Cart
// // =================================

// export const clearCart = async(req,res)=>{


//     try{


//         const cart =

//         await clearCartService(

//             req.user.id

//         );



//         return successResponse(

//             res,

//             200,

//             "Cart cleared successfully",

//             cart

//         );


//     }

//     catch(error){


//         return errorResponse(

//             res,

//             500,

//             error.message

//         );


//     }


// };


// // =================================
// // Apply Coupon
// // =================================

// export const applyCoupon = async (req, res) => {

//     try {

//         const { code } = req.body;

//         const cart = await applyCouponService(

//             req.user.id,

//             code

//         );

//         return successResponse(

//             res,

//             200,

//             "Coupon applied successfully",

//             cart

//         );

//     }

//     catch (error) {

//         return errorResponse(

//             res,

//             400,

//             error.message

//         );

//     }

// };

// // =================================
// // Remove Coupon
// // =================================

// export const removeCoupon = async (req, res) => {

//     try {

//         const cart = await removeCouponService(

//             req.user.id

//         );

//         return successResponse(

//             res,

//             200,

//             "Coupon removed successfully",

//             cart

//         );

//     }

//     catch (error) {

//         return errorResponse(

//             res,

//             400,

//             error.message

//         );

//     }

// };








import {

    addToCartService,

    getCartService,

    updateCartQuantityService,

    removeCartItemService,

    clearCartService

} from "./cart.service.js";


import {

    successResponse,

    errorResponse

} from "../../common/utils/apiResponse.js";



// ======================================================
// ADD TO CART
// ======================================================

export const addToCart = async (
    req,
    res
) => {

    try {

        console.log(
            "ADD TO CART USER:",
            req.user
        );


        console.log(
            "ADD TO CART BODY:",
            req.body
        );


        const cart =
            await addToCartService(
                req.user.id,
                req.body,
                req.user.customerType
            );


        return successResponse(

            res,

            200,

            "Product added to cart successfully",

            cart

        );

    }

    catch (error) {

        console.error(
            "ADD TO CART ERROR:",
            error
        );


        return errorResponse(

            res,

            400,

            error.message

        );

    }

};



// ======================================================
// GET CART
// ======================================================

export const getCart = async (
    req,
    res
) => {

    try {

        const cart =
            await getCartService(
                req.user.id
            );


        return successResponse(

            res,

            200,

            "Cart fetched successfully",

            cart

        );

    }

    catch (error) {

        console.error(
            "GET CART ERROR:",
            error
        );


        return errorResponse(

            res,

            500,

            error.message

        );

    }

};



// ======================================================
// UPDATE QUANTITY
// ======================================================

export const updateCartQuantity = async (
    req,
    res
) => {

    try {

        const {
            productId
        } = req.params;


        const {
            quantity
        } = req.body;


        const cart =
            await updateCartQuantityService(

                req.user.id,

                productId,

                Number(quantity),

                req.user.customerType

            );

        return successResponse(

            res,

            200,

            "Cart quantity updated successfully",

            cart

        );

    }

    catch (error) {

        console.error(
            "UPDATE CART ERROR:",
            error
        );


        return errorResponse(

            res,

            400,

            error.message

        );

    }

};



// ======================================================
// REMOVE ITEM
// ======================================================

export const removeCartItem = async (
    req,
    res
) => {

    try {

        const {
            productId
        } = req.params;


        const cart =
            await removeCartItemService(

                req.user.id,

                productId

            );


        return successResponse(

            res,

            200,

            "Product removed from cart successfully",

            cart

        );

    }

    catch (error) {

        console.error(
            "REMOVE CART ITEM ERROR:",
            error
        );


        return errorResponse(

            res,

            400,

            error.message

        );

    }

};



// ======================================================
// CLEAR CART
// ======================================================

export const clearCart = async (
    req,
    res
) => {

    try {

        const cart =
            await clearCartService(
                req.user.id
            );


        return successResponse(

            res,

            200,

            "Cart cleared successfully",

            cart

        );

    }

    catch (error) {

        console.error(
            "CLEAR CART ERROR:",
            error
        );


        return errorResponse(

            res,

            500,

            error.message

        );

    }

};