



import {
    createProductService,
    getProductsService,
    getProductService,
    updateProductService,
    deleteProductService,
    searchProductService,
    getShopProductsService,
    fetchProductsAddedByReceptionist
} from "./product.service.js";

import {
    successResponse,
    errorResponse
} from "../../common/utils/apiResponse.js";



import Order from "../orders/order.model.js";
export const parseProductMultipartData = (
    req,
    res,
    next
) => {

    try {

        // =================================================
        // PRICING
        // =================================================

        if (
            typeof req.body.pricing === "string"
        ) {

            if (
                req.body.pricing.trim() === ""
            ) {

                req.body.pricing = {};

            } else {

                try {

                    req.body.pricing =
                        JSON.parse(
                            req.body.pricing
                        );

                } catch (error) {

                    return res.status(400).json({

                        success: false,

                        message:
                            "Invalid pricing JSON",

                        errors: [
                            "pricing must contain valid JSON"
                        ]

                    });

                }

            }

        }


        // =================================================
// REFURBISHED DETAILS
// =================================================
//
// FormData mein refurbishedDetails JSON string
// ke form mein aata hai.
//
// Example:
//
// '{"grade":"A+","batteryHealth":70,
//   "warrantyMonths":6,"testingStatus":"TESTED"}'
//
// Joi ko object chahiye.
// Isliye JSON.parse() kar rahe hain.
// =================================================

if (
    typeof req.body.refurbishedDetails === "string"
) {

    if (
        req.body.refurbishedDetails.trim() === ""
    ) {

        req.body.refurbishedDetails = {};

    } else {

        try {

            req.body.refurbishedDetails =
                JSON.parse(
                    req.body.refurbishedDetails
                );

        } catch (error) {

            return res.status(400).json({

                success: false,

                message:
                    "Invalid refurbishedDetails JSON",

                errors: [
                    "refurbishedDetails must contain valid JSON"
                ]

            });

        }

    }

}
       if (
    typeof req.body.rental === "string"
) {

    if (
        req.body.rental.trim() === ""
    ) {

        req.body.rental = {};

    } else {

        try {

            req.body.rental =
                JSON.parse(
                    req.body.rental
                );

        } catch (error) {

            return res.status(400).json({

                success: false,

                message:
                    "Invalid rental JSON",

                errors: [
                    "rental must contain valid JSON"
                ]

            });

        }

    }

}

        // =================================================
        // SPECIFICATIONS
        // =================================================

        if (
            typeof req.body.specifications === "string"
        ) {

            if (
                req.body.specifications.trim() === ""
            ) {

                req.body.specifications = {};

            } else {

                try {

                    req.body.specifications =
                        JSON.parse(
                            req.body.specifications
                        );

                } catch (error) {

                    return res.status(400).json({

                        success: false,

                        message:
                            "Invalid specifications JSON",

                        errors: [
                            "specifications must contain valid JSON"
                        ]

                    });

                }

            }

        }


        // =================================================
        // NEXT
        // =================================================

        next();

    } catch (error) {

        console.error(
            "PRODUCT MULTIPART PARSER ERROR:",
            error
        );

        return res.status(400).json({

            success: false,

            message:
                "Invalid product data",

            errors: [
                error.message
            ]

        });

    }

};


// =====================================================
// PRODUCTS ADDED BY RECEPTIONIST
// =====================================================

export const getProductsAddedByReceptionist = async (
    req,
    res
) => {

    try {

        const {
            receptionistId
        } = req.params;


        const products =
            await fetchProductsAddedByReceptionist(
                receptionistId
            );


        return res.status(200).json({

            success: true,

            count:
                products.length,

            data:
                products

        });

    } catch (error) {

        return res.status(500).json({

            success: false,

            message:
                error.message

        });

    }

};


// =====================================================
// PRODUCTS ORDERED BY RECEPTIONIST
// =====================================================

export const getProductsOrderedByReceptionist = async (
    req,
    res
) => {

    try {

        const {
            receptionistId
        } = req.params;


        // IMPORTANT:
        // Keep your existing Order import/model here
        // if this controller already has it in your file.
        //
        // Example:
        // import Order from "../orders/order.model.js";

        const orders =
            await Order.find({
                receptionistId
            })
                .populate("items.product")
                .sort({
                    createdAt: -1
                });


        return res.status(200).json({

            success: true,

            count:
                orders.length,

            data:
                orders

        });

    } catch (error) {

        return res.status(500).json({

            success: false,

            message:
                error.message

        });

    }

};


// =====================================================
// CREATE PRODUCT
// ADMIN
// =====================================================

export const createProduct = async (
    req,
    res
) => {

    try {

        console.log(
            "======================================"
        );

        console.log(
            "CREATE PRODUCT CONTROLLER"
        );

        console.log(
            "======================================"
        );

        console.log(
            "BODY BEFORE SERVICE:",
            req.body
        );

        console.log(
            "FILES:",
            req.files
        );


        // =================================================
        // IMPORTANT
        // =================================================
        //
        // DO NOT recreate req.body.pricing here.
        //
        // parseProductMultipartData has already converted:
        //
        // pricing string
        //
        // into:
        //
        // pricing object
        //
        // So Joi validation has already passed before
        // controller reaches here.
        // =================================================


        // =================================================
        // CREATE PRODUCT
        // =================================================

        const product =
            await createProductService(

                req.body,

                req.user.id,

                req.files || []

            );


        // =================================================
        // SUCCESS
        // =================================================

        return successResponse(

            res,

            201,

            "Product created successfully",

            product

        );

    } catch (error) {

        console.error(
            "CREATE PRODUCT CONTROLLER ERROR:",
            error
        );


        return errorResponse(

            res,

            400,

            error.message

        );

    }

};


// =====================================================
// GET ALL PRODUCTS
// =====================================================

export const getProducts = async (
    req,
    res
) => {

    try {

        const products =
            await getProductsService();


        return successResponse(

            res,

            200,

            "Products fetched successfully",

            products

        );

    } catch (error) {

        return errorResponse(

            res,

            500,

            error.message

        );

    }

};


// =====================================================
// GET PRODUCT BY ID
// =====================================================

export const getProductById = async (
    req,
    res
) => {

    try {

        const customerType =
            req.user?.customerType || "PERSONAL";   // ← ADD THIS

        const product =
            await getProductService(
                req.params.id,
                customerType                          // ← PASS IT
            );


        return successResponse(

            res,

            200,

            "Product fetched successfully",

            product

        );

    } catch (error) {

        return errorResponse(

            res,

            404,

            error.message

        );

    }

};


// =====================================================
// UPDATE PRODUCT
// =====================================================

export const updateProduct = async (
    req,
    res
) => {

    try {

        // =================================================
        // If update request comes as multipart/form-data,
        // parse pricing/specifications as well.
        // =================================================

        if (
            typeof req.body.pricing === "string"
        ) {

            req.body.pricing =
                JSON.parse(
                    req.body.pricing
                );

        }


        if (
            typeof req.body.specifications === "string"
        ) {

            req.body.specifications =
                JSON.parse(
                    req.body.specifications
                );

        }
        if (
    typeof req.body.rental === "string"
) {

    req.body.rental =
        JSON.parse(
            req.body.rental
        );

}

              
        const product =
            await updateProductService(

                req.params.id,

                req.body

            );


        return successResponse(

            res,

            200,

            "Product updated successfully",

            product

        );

    } catch (error) {

        console.error(
            "UPDATE PRODUCT ERROR:",
            error
        );


        return errorResponse(

            res,

            400,

            error.message

        );

    }

};


// =====================================================
// DELETE PRODUCT
// =====================================================

export const deleteProduct = async (
    req,
    res
) => {

    try {

        await deleteProductService(
            req.params.id
        );


        return successResponse(

            res,

            200,

            "Product deleted successfully"

        );

    } catch (error) {

        return errorResponse(

            res,

            500,

            error.message

        );

    }

};


// =====================================================
// SEARCH PRODUCT
// =====================================================

export const searchProduct = async (
    req,
    res
) => {

    try {

        const result =
            await searchProductService(
                req.query.keyword
            );


        return successResponse(

            res,

            200,

            "Search result",

            result

        );

    } catch (error) {

        return errorResponse(

            res,

            500,

            error.message

        );

    }

};


// =====================================================
// CUSTOMER SHOP PRODUCTS
// =====================================================

// export const getShopProducts = async (
//     req,
//     res
// ) => {

//     try {

//         const products =
//             await getShopProductsService();


//         return successResponse(

//             res,

//             200,

//             "Shop products fetched successfully",

//             products

//         );

//     } catch (error) {

//         return errorResponse(

//             res,

//             500,

//             error.message

//         );

//     }

// };

// =====================================================
// CUSTOMER SHOP PRODUCTS
// =====================================================

export const getShopProducts = async (
    req,
    res
) => {

    try {

         console.log("LOGGED IN USER:", req.user);   // ADD THIS LINE

        console.log(
            "======================================"
        );

        console.log(
            "CUSTOMER SHOP PRODUCTS REQUEST"
        );

        console.log(
            "======================================"
        );

const customerType =
    req.user?.customerType || "PERSONAL";

const products =
    await getShopProductsService(
        customerType
    );
        


        console.log(
            "SHOP CONTROLLER PRODUCTS:",
            products.length
        );


        return successResponse(

            res,

            200,

            "Shop products fetched successfully",

            products

        );

    } catch (error) {

        console.error(
            "======================================"
        );

        console.error(
            "GET SHOP PRODUCTS CONTROLLER ERROR:"
        );

        console.error(
            error
        );

        console.error(
            "======================================"
        );


        return errorResponse(

            res,

            500,

            error.message

        );

    }

};