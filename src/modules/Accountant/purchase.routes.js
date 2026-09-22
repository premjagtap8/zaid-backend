import express from "express";

import {
  createPurchaseController,
  getPurchaseController,
  getAllPurchasesController,
  verifyPurchaseController,
  recordVendorPaymentController,
  getPendingVendorPaymentsController,
  deletePurchaseController
} from "./purchase.controller.js";

import { verifyToken } from "../../common/middleware/auth.middleware.js";

import { allowRoles } from "../../common/middleware/role.middleware.js";

import { ROLES } from "../../common/constants/roles.js";

import { paymentSlipUpload } from "../../common/middleware/upload.middleware.js";


const router =
  express.Router();


// ======================================================
// CREATE PURCHASE
// Procurement + Admin
// ======================================================

router.post(
  "/",
  verifyToken,
  allowRoles(
    ROLES.ADMIN,
    ROLES.INVENTORY,
    ROLES.SALES
  ),
  createPurchaseController
);


// ======================================================
// GET ALL PURCHASES
// Accountant + Procurement + Admin
// ======================================================

router.get(
  "/",
  verifyToken,
  allowRoles(
    ROLES.ADMIN,
    ROLES.ACCOUNTANT,
    ROLES.INVENTORY,
    ROLES.SALES
  ),
  getAllPurchasesController
);


// ======================================================
// PENDING VENDOR PAYMENTS
// Accountant + Admin
// ======================================================

router.get(
  "/pending-payments",
  verifyToken,
  allowRoles(
    ROLES.ADMIN,
    ROLES.SALES
  ),
  getPendingVendorPaymentsController
);


// ======================================================
// GET SINGLE PURCHASE
// ======================================================

router.get(
  "/:purchaseId",
  verifyToken,
  allowRoles(
    ROLES.ADMIN,
    ROLES.ACCOUNTANT,
    ROLES.INVENTORY,
    ROLES.SALES
  ),
  getPurchaseController
);


// ======================================================
// VERIFY PURCHASE
// Accountant + Admin
// ======================================================

router.put(
  "/:purchaseId/verify",
  verifyToken,
  allowRoles(
    ROLES.ADMIN,
    ROLES.SALES
  ),
  verifyPurchaseController
);


// ======================================================
// RECORD VENDOR PAYMENT
// Accountant + Admin
// ======================================================

router.put(
  "/:purchaseId/payment",
  verifyToken,
  allowRoles(
    ROLES.ADMIN,
    ROLES.SALES
  ),
  paymentSlipUpload.single("paymentSlip"),
  recordVendorPaymentController
);


// ======================================================
// DELETE PURCHASE
// Admin only
// ======================================================

router.delete(
  "/:purchaseId",
  verifyToken,
  allowRoles(
    ROLES.ADMIN
  ),
  deletePurchaseController
);


export default router;