import express from "express";

import {
  createVendorController,
  getAllVendorsController,
  getVendorController,
  updateVendorController,
  deleteVendorController
} from "./vendor.controller.js";

import { verifyToken } from "../../common/middleware/auth.middleware.js";
import { allowRoles } from "../../common/middleware/role.middleware.js";
import { ROLES } from "../../common/constants/roles.js";


const router = express.Router();


// ======================================================
// CREATE VENDOR
// Admin + Sales
// ======================================================

router.post(
  "/",
  verifyToken,
  allowRoles(ROLES.ADMIN, ROLES.SALES),

  createVendorController
);


// ======================================================
// GET ALL VENDORS
// Admin + Sales
// ======================================================

router.get(
  "/",
  verifyToken,
  allowRoles(ROLES.ADMIN, ROLES.SALES),
  getAllVendorsController
);


// ======================================================
// GET SINGLE VENDOR
// Admin + Sales
// ======================================================

router.get(
  "/:vendorId",
  verifyToken,
  allowRoles(ROLES.ADMIN, ROLES.SALES),
  getVendorController
);


// ======================================================
// UPDATE VENDOR
// Admin + Sales
// ======================================================

router.put(
  "/:vendorId",
  verifyToken,
  allowRoles(ROLES.ADMIN, ROLES.SALES),
  updateVendorController
);


// ======================================================
// DELETE VENDOR (soft delete)
// Admin + Sales
// ======================================================

router.delete(
  "/:vendorId",
  verifyToken,
  allowRoles(ROLES.ADMIN, ROLES.SALES),
  deleteVendorController
);


export default router;