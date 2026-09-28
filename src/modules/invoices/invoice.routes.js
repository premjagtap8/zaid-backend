import express from "express";

import {
  createInvoice,
  getInvoiceById,
  getInvoiceByOrderId,
  getAllInvoices,
  getMyInvoices,
} from "./invoice.controller.js";

import { verifyToken } from "../../common/middleware/auth.middleware.js";

const router = express.Router();

// ==========================================
// CREATE INVOICE
// POST /api/invoices
// ==========================================

router.post(
  "/",
  createInvoice
);

// ==========================================
// GET ALL
// GET /api/invoices
// ==========================================

router.get(
  "/",
  getAllInvoices
);

// ==========================================
// GET MY INVOICES (logged-in user only)
// GET /api/invoices/my
//
// IMPORTANT: keep this ABOVE "/:id",
// otherwise "my" is treated as an invoice ID.
// ==========================================

router.get(
  "/my",
  verifyToken,
  getMyInvoices
);

// ==========================================
// GET BY ORDER
// GET /api/invoices/order/:orderId
// ==========================================

router.get(
  "/order/:orderId",
  getInvoiceByOrderId
);

// ==========================================
// GET BY ID
// GET /api/invoices/:id
// ==========================================

router.get(
  "/:id",
  getInvoiceById
);

export default router;