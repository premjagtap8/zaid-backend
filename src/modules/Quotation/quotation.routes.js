import express from "express";

import { verifyToken } from "../../common/middleware/auth.middleware.js";
import { allowRoles } from "../../common/middleware/role.middleware.js";
import { isBusinessCustomer } from "../../common/middleware/customerType.middleware.js";

import {
    createQuotation,
    getQuotations,
    respondToQuotationItem,
    acceptCounterOffer,          // NEW
} from "./quotation.controller.js";

const router = express.Router();


// =================================================
// CREATE QUOTATION — business customer only
// =================================================

router.post(
    "/",
    verifyToken,
    isBusinessCustomer,
    createQuotation
);


// =================================================
// GET QUOTATIONS — any logged in user
// (controller filters by req.user, own vs all)
// =================================================

router.get(
    "/",
    verifyToken,
    getQuotations
);


// =================================================
// RESPOND TO A QUOTATION ITEM — admin/sales only
// =================================================

router.patch(
    "/:quotationId/items/:itemId/respond",
    verifyToken,
    allowRoles("ADMIN", "SALES"),
    respondToQuotationItem
);


// =================================================
// ACCEPT / REJECT A COUNTER OFFER — business customer only
// Customer accepting/rejecting admin's counterPrice
// on their OWN quotation item.
// =================================================

router.patch(
    "/:quotationId/items/:itemId/accept-counter",
    verifyToken,
    isBusinessCustomer,
    acceptCounterOffer
);


export default router;