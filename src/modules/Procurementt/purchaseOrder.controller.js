import {
  createPurchaseOrderService,
  getPurchaseOrderService,
  getAllPurchaseOrdersService,
  getPurchaseOrdersForBillingService,
  markPurchaseOrderOrderedService,
  markPurchaseOrderReceivedService,
  cancelPurchaseOrderService,
  deletePurchaseOrderService,
  updatePurchaseOrderService
} from "./purchaseOrder.service.js";


// ======================================================
// CREATE PURCHASE ORDER
// ======================================================

export const createPurchaseOrderController = async (req, res) => {

  try {

    const data = await createPurchaseOrderService(
      req.body,
      req.user._id
    );

    return res.status(201).json({
      success: true,
      message: "Purchase order created successfully",
      data
    });

  } catch (error) {

    return res.status(400).json({
      success: false,
      message: error.message
    });
  }
};


// ======================================================
// GET SINGLE PURCHASE ORDER
// ======================================================

export const getPurchaseOrderController = async (req, res) => {

  try {

    const data = await getPurchaseOrderService(
      req.params.purchaseOrderId
    );

    return res.status(200).json({
      success: true,
      data
    });

  } catch (error) {

    return res.status(404).json({
      success: false,
      message: error.message
    });
  }
};


// ======================================================
// GET ALL PURCHASE ORDERS
// ======================================================

export const getAllPurchaseOrdersController = async (req, res) => {

  try {

    const data = await getAllPurchaseOrdersService(
      req.query
    );

    return res.status(200).json({
      success: true,
      count: data.length,
      data
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


// ======================================================
// GET PURCHASE ORDERS AVAILABLE FOR BILLING
// RECEIVED POs with no active bill yet
// ======================================================

export const getPurchaseOrdersForBillingController = async (
  req,
  res
) => {

  try {

    const data =
      await getPurchaseOrdersForBillingService();

    return res.status(200).json({
      success: true,
      count: data.length,
      data
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


// ======================================================
// MARK PURCHASE ORDER AS ORDERED
// ======================================================

export const markPurchaseOrderOrderedController = async (
  req,
  res
) => {

  try {

    const data =
      await markPurchaseOrderOrderedService(
        req.params.purchaseOrderId
      );

    return res.status(200).json({
      success: true,
      message: "Purchase order marked as ordered",
      data
    });

  } catch (error) {

    return res.status(400).json({
      success: false,
      message: error.message
    });
  }
};


// ======================================================
// MARK PURCHASE ORDER AS RECEIVED
// Also adds the received quantity to inventory stock
// ======================================================

export const markPurchaseOrderReceivedController = async (
  req,
  res
) => {

  try {

    const data =
      await markPurchaseOrderReceivedService(
        req.params.purchaseOrderId,
        req.body,
        req.user._id
      );

    return res.status(200).json({
      success: true,
      message:
        "Purchase order marked as received and stock updated",
      data
    });

  } catch (error) {

    return res.status(400).json({
      success: false,
      message: error.message
    });
  }
};


// ======================================================
// CANCEL PURCHASE ORDER
// ======================================================

export const cancelPurchaseOrderController = async (
  req,
  res
) => {

  try {

    const data =
      await cancelPurchaseOrderService(
        req.params.purchaseOrderId,
        req.body
      );

    return res.status(200).json({
      success: true,
      message: "Purchase order cancelled",
      data
    });

  } catch (error) {

    return res.status(400).json({
      success: false,
      message: error.message
    });
  }
};


// ======================================================
// SOFT DELETE PURCHASE ORDER
// ======================================================

export const deletePurchaseOrderController = async (
  req,
  res
) => {

  try {

    const data =
      await deletePurchaseOrderService(
        req.params.purchaseOrderId
      );

    return res.status(200).json({
      success: true,
      message: "Purchase order deleted successfully",
      data
    });

  } catch (error) {

    return res.status(400).json({
      success: false,
      message: error.message
    });
  }
};


// ======================================================
// UPDATE PURCHASE ORDER
// Only DRAFT POs can be updated
// ======================================================

export const updatePurchaseOrderController = async (
  req,
  res
) => {

  try {

    const data =
      await updatePurchaseOrderService(
        req.params.purchaseOrderId,
        req.body
      );

    return res.status(200).json({
      success: true,
      message: "Purchase order updated successfully",
      data
    });

  } catch (error) {

    return res.status(400).json({
      success: false,
      message: error.message
    });
  }
};