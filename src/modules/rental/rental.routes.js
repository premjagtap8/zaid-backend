import express from "express";

import {
    getRentalProductsController,
    getRentalProductController,
    saveRentalProductController,
} from "./rentalProduct.controller.js";

import {
    createWalkInRentalController,
    getRentalController,
    getAllRentalsController,
    markRentalReturnedController,
    searchRentalsForReturnController,
    completeRentalSettlementController
} from "./rental.controller.js";

import {
    getRentalInventoryController,
} from "./rentalInventory.controller.js";

import {
    uploadRentalDocumentController,
    getRentalDocumentsController,
    verifyRentalDocumentController,
} from "./rentalDocument.controller.js";

import {
    verifyToken,
} from "../../common/middleware/auth.middleware.js";

import {
    rentalDocumentUpload,
} from "../../common/middleware/upload.middleware.js";

import {
    allowRoles,
} from "../../common/middleware/role.middleware.js";


const router = express.Router();


// =====================================================
// RENTAL PRODUCTS
// =====================================================

router.get(
    "/products",
    getRentalProductsController
);


router.get(
    "/product/:productId",
    //verifyToken,
    getRentalProductController
);


router.put(
    "/product/:productId",
    verifyToken,
    allowRoles(
        "SALES"
    ),
    saveRentalProductController
);


// =====================================================
// RENTAL INVENTORY
// =====================================================

router.get(
    "/inventory",
    verifyToken,
    allowRoles(
        "SALES"
    ),
    getRentalInventoryController
);


// =====================================================
// WALK-IN RENTAL
// =====================================================

router.post(
    "/walk-in",
    verifyToken,
    allowRoles(
        "SALES"
    ),
    createWalkInRentalController
);


// =====================================================
// RENTAL DOCUMENT UPLOAD
// =====================================================

router.post(
    "/:rentalId/documents",
    verifyToken,
    allowRoles(
        "SALES"
    ),
    rentalDocumentUpload.single("document"),
    uploadRentalDocumentController
);


// =====================================================
// GET RENTAL DOCUMENTS
// =====================================================

router.get(
    "/:rentalId/documents",
    verifyToken,
    allowRoles(
        "SALES"
    ),
    getRentalDocumentsController
);


// =====================================================
// VERIFY DOCUMENT
// =====================================================

router.patch(
    "/documents/:documentId/verify",
    verifyToken,
    allowRoles(
        "SALES"
    ),
    verifyRentalDocumentController
);


// =====================================================
// ALL RENTALS
// =====================================================

router.get(
    "/",
    verifyToken,
    allowRoles(
        "SALES"
    ),
    getAllRentalsController
);

// =====================================================
// SEARCH RENTAL FOR RETURN
// =====================================================

router.get(
    "/return/search",
    verifyToken,
    allowRoles(
        "SALES",
        "RECEPTIONIST",
        "ADMIN",
        "SUPER_ADMIN",
        "STAFF"
    ),
    searchRentalsForReturnController
);

// =====================================================
// SINGLE RENTAL
// =====================================================

router.get(
    "/:id",
    verifyToken,
    allowRoles(
        "SALES"
    ),
    getRentalController
);


// =====================================================
// RETURN RENTAL
// =====================================================

router.patch(
    "/:id/return",
    verifyToken,
    allowRoles(
        "SALES"
    ),
    markRentalReturnedController
);
// =====================================================
// COMPLETE RENTAL SETTLEMENT
// =====================================================

router.patch(
    "/:id/settle",
    verifyToken,
    allowRoles(
        "SALES",
        "RECEPTIONIST",
        "ADMIN",
        "SUPER_ADMIN",
        "STAFF"
    ),
    completeRentalSettlementController
);


export default router;