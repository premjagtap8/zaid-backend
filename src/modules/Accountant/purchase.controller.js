import {
  createPurchaseService,
  getPurchaseService,
  getAllPurchasesService,
  verifyPurchaseService,
  recordVendorPaymentService,
  getPendingVendorPaymentsService,
  deletePurchaseService
} from "./purchase.service.js";


// ======================================================
// CREATE PURCHASE
// ======================================================

export const createPurchaseController =
  async (req, res) => {

    try {

      const data =
        await createPurchaseService(
          req.body,
          req.user._id
        );


      return res.status(201).json({

        success: true,

        message:
          "Purchase created successfully",

        data

      });

    } catch (error) {

      return res.status(400).json({

        success: false,

        message:
          error.message

      });
    }
  };


// ======================================================
// GET SINGLE PURCHASE
// ======================================================

export const getPurchaseController =
  async (req, res) => {

    try {

      const data =
        await getPurchaseService(
          req.params.purchaseId
        );


      return res.status(200).json({

        success: true,

        data

      });

    } catch (error) {

      return res.status(404).json({

        success: false,

        message:
          error.message

      });
    }
  };


// ======================================================
// GET ALL PURCHASES
// ======================================================

export const getAllPurchasesController =
  async (req, res) => {

    try {

      const data =
        await getAllPurchasesService(
          req.query
        );


      return res.status(200).json({

        success: true,

        count:
          data.length,

        data

      });

    } catch (error) {

      return res.status(500).json({

        success: false,

        message:
          error.message

      });
    }
  };


// ======================================================
// VERIFY PURCHASE
// ======================================================

export const verifyPurchaseController =
  async (req, res) => {

    try {

      const data =
        await verifyPurchaseService(
          req.params.purchaseId,
          req.user._id
        );


      return res.status(200).json({

        success: true,

        message:
          "Purchase verified successfully",

        data

      });

    } catch (error) {

      return res.status(400).json({

        success: false,

        message:
          error.message

      });
    }
  };


// ======================================================
// RECORD VENDOR PAYMENT
// ======================================================

export const recordVendorPaymentController =

  async (req, res) => {
   

    try {

      const data =
        await recordVendorPaymentService(
          req.params.purchaseId,
          req.body,
          req.user._id,
          req.file
        );


      return res.status(200).json({

        success: true,

        message:
          "Vendor payment recorded successfully",

        data

      });

    } catch (error) {

      return res.status(400).json({

        success: false,

        message:
          error.message

      });
    }
  };


// ======================================================
// PENDING VENDOR PAYMENTS
// ======================================================

export const getPendingVendorPaymentsController =
  async (req, res) => {

    try {

      const data =
        await getPendingVendorPaymentsService();


      return res.status(200).json({

        success: true,

        count:
          data.length,

        data

      });

    } catch (error) {

      return res.status(500).json({

        success: false,

        message:
          error.message

      });
    }
  };


// ======================================================
// DELETE
// ======================================================

export const deletePurchaseController =
  async (req, res) => {

    try {

      await deletePurchaseService(
        req.params.purchaseId
      );


      return res.status(200).json({

        success: true,

        message:
          "Purchase deleted successfully"

      });

    } catch (error) {

      return res.status(400).json({

        success: false,

        message:
          error.message

      });
    }
  };