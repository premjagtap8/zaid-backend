import express from "express";

import {
  createPurchaseOrderController,
  getPurchaseOrderController,
  getAllPurchaseOrdersController,
  getPurchaseOrdersForBillingController,
  markPurchaseOrderOrderedController,
  markPurchaseOrderReceivedController,
  cancelPurchaseOrderController,
  deletePurchaseOrderController,
  updatePurchaseOrderController
} from "./purchaseOrder.controller.js";

import { verifyToken } from "../../common/middleware/auth.middleware.js";

import { allowRoles } from "../../common/middleware/role.middleware.js";

import { ROLES } from "../../common/constants/roles.js";


const router = express.Router();


// ======================================================
// CREATE PURCHASE ORDER
// Admin + Sales
// ======================================================

router.post(
  "/",
  verifyToken,
  allowRoles(ROLES.ADMIN, ROLES.SALES),
  createPurchaseOrderController
);


// ======================================================
// GET ALL PURCHASE ORDERS
// Admin + Sales
// ======================================================

router.get(
  "/",
  verifyToken,
  allowRoles(ROLES.ADMIN, ROLES.SALES),
  getAllPurchaseOrdersController
);


// ======================================================
// GET PURCHASE ORDERS AVAILABLE FOR BILLING
// RECEIVED POs with no active bill yet
// Admin + Sales + Inventory
//
// NOTE: must stay ABOVE GET /:purchaseOrderId
// ======================================================

router.get(
  "/available-for-billing",
  verifyToken,
  allowRoles(
    ROLES.ADMIN,
    ROLES.SALES,
    ROLES.INVENTORY
  ),
  getPurchaseOrdersForBillingController
);


// ======================================================
// GET SINGLE PURCHASE ORDER
// Admin + Sales
// ======================================================

router.get(
  "/:purchaseOrderId",
  verifyToken,
  allowRoles(ROLES.ADMIN, ROLES.SALES),
  getPurchaseOrderController
);


// ======================================================
// MARK PURCHASE ORDER AS ORDERED
// Admin + Sales
// ======================================================

router.put(
  "/:purchaseOrderId/order",
  verifyToken,
  allowRoles(ROLES.ADMIN, ROLES.SALES),
  markPurchaseOrderOrderedController
);


// ======================================================
// MARK PURCHASE ORDER AS RECEIVED
// Also updates the inventory stock
// Admin + Sales + Inventory
// ======================================================

router.put(
  "/:purchaseOrderId/receive",
  verifyToken,
  allowRoles(
    ROLES.ADMIN,
    ROLES.SALES,
    ROLES.INVENTORY
  ),
  markPurchaseOrderReceivedController
);


// ======================================================
// CANCEL PURCHASE ORDER
// Draft or Ordered -> Cancelled
// Admin + Sales
// ======================================================

router.put(
  "/:purchaseOrderId/cancel",
  verifyToken,
  allowRoles(ROLES.ADMIN, ROLES.SALES),
  cancelPurchaseOrderController
);


// ======================================================
// UPDATE PURCHASE ORDER
// Only DRAFT purchase orders can be updated
// Admin + Sales
//
// Can update:
// Vendor
// Items
// Quantity
// Price
// GST
// HSN
// Expected delivery date
// Notes
// ======================================================

router.put(
  "/:purchaseOrderId",
  verifyToken,
  allowRoles(ROLES.ADMIN, ROLES.SALES),
  updatePurchaseOrderController
);


// ======================================================
// DELETE PURCHASE ORDER
// Soft Delete
// Admin + Sales
//
// Received POs cannot be deleted because inventory
// has already been updated.
// ======================================================

router.delete(
  "/:purchaseOrderId",
  verifyToken,
  allowRoles(ROLES.ADMIN, ROLES.SALES),
  deletePurchaseOrderController
);


export default router;