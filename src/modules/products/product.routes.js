import express from "express";

import {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct,
    searchProduct,
    getShopProducts,
    getProductsAddedByReceptionist,
    getProductsOrderedByReceptionist,
    parseProductMultipartData
} from "./product.controller.js";

import { optionalAuth } from "../../common/middleware/Optionalauth.middleware.js";

import {
    createProductValidation,
    updateProductValidation
} from "./product.validation.js";

import {
    validate
} from "../../common/middleware/validate.middleware.js";

import {
    verifyToken
} from "../../common/middleware/auth.middleware.js";

import {
    allowRoles
} from "../../common/middleware/role.middleware.js";

import {
    productUpload
} from "../../common/middleware/upload.middleware.js";


const router = express.Router();


// =====================================================
// RECEPTIONIST ROUTES
// =====================================================

router.get(

    "/receptionist/added/:receptionistId",

    getProductsAddedByReceptionist

);


router.get(

    "/receptionist/ordered/:receptionistId",

    getProductsOrderedByReceptionist

);


// =====================================================
// ADMIN - CREATE PRODUCT
// =====================================================
//
// IMPORTANT ORDER:
//
// 1. verifyToken
// 2. allowRoles
// 3. multer
// 4. parse multipart JSON
// 5. Joi validation
// 6. controller
//
// =====================================================

router.post(

    "/",

    verifyToken,

    allowRoles("ADMIN"),

    productUpload.array(
        "images",
        5
    ),

    parseProductMultipartData,

    validate(
        createProductValidation
    ),

    createProduct

);

// =====================================================
// GET ALL PRODUCTS
// =====================================================

router.get(

    "/",

    verifyToken,

    allowRoles(
        "ADMIN",
        "RECEPTIONIST",
        "SALES",
        "INVENTORY_MANAGER"
    ),

    getProducts

);


// =====================================================
// CUSTOMER SHOP
// =====================================================

router.get(

    "/shop",

     optionalAuth,      // ← ADD THIS LINE

    getShopProducts

);


// =====================================================
// SEARCH
// =====================================================

router.get(

    "/search",

    verifyToken,

    allowRoles(
        "ADMIN",
        "RECEPTIONIST",
        "SALES",
        "INVENTORY_MANAGER"
    ),

    searchProduct

);


// =====================================================
// GET SINGLE PRODUCT
// =====================================================
// PUBLIC
// Customer can open product details without login
// =====================================================

router.get(

    "/:id",

    optionalAuth,   // ← ADD THIS

    getProductById

);


// =====================================================
// UPDATE PRODUCT
// =====================================================

router.put(

    "/:id",

    verifyToken,

    allowRoles("ADMIN"),

    validate(
        updateProductValidation
    ),

    updateProduct

);


// =====================================================
// DELETE PRODUCT
// =====================================================

router.delete(

    "/:id",

    verifyToken,

    allowRoles("ADMIN"),

    deleteProduct

);

// // =====================================================
// // GET ALL PRODUCTS
// // =====================================================

// router.get(

//     "/",

//     verifyToken,

//     allowRoles(
//         "ADMIN",
//         "RECEPTIONIST",
//         "INVENTORY_MANAGER"
//     ),

//     getProducts

// );


// // =====================================================
// // CUSTOMER SHOP
// // =====================================================

// router.get(

//     "/shop",

//     getShopProducts

// );


// // =====================================================
// // SEARCH
// // =====================================================

// router.get(

//     "/search",

//     verifyToken,

//     allowRoles(
//         "ADMIN",
//         "RECEPTIONIST",
//         "INVENTORY_MANAGER"
//     ),

//     searchProduct

// );


// // =====================================================
// // GET SINGLE PRODUCT
// // =====================================================

// // router.get(

// //     "/:id",

// //     verifyToken,

// //     allowRoles("ADMIN"),

// //     getProductById

// // );

// // =====================================================
// // GET SINGLE PRODUCT
// // =====================================================
// // Public customer product details
// // No authentication required
// // =====================================================

// router.get(

//     "/:id",

//     getProductById

// );


// // =====================================================
// // UPDATE PRODUCT
// // =====================================================

// router.put(

//     "/:id",

//     verifyToken,

//     allowRoles("ADMIN"),

//     validate(
//         updateProductValidation
//     ),

//     updateProduct

// );


// // =====================================================
// // DELETE PRODUCT
// // =====================================================

// router.delete(

//     "/:id",

//     verifyToken,

//     allowRoles("ADMIN"),

//     deleteProduct

// );


export default router;