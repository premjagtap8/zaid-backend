import * as invoiceService
  from "./invoice.service.js";

// ==========================================
// CREATE
// ==========================================

export const createInvoice = async (
  req,
  res
) => {

  try {

    const { orderId } =
      req.body;

    if (!orderId) {

      return res.status(400).json({

        success: false,

        message:
          "Order ID is required",

      });

    }

    const invoice =
      await invoiceService
        .createInvoiceFromOrder(
          orderId
        );

    return res.status(201).json({

      success: true,

      message:
        "Invoice created successfully",

      data: invoice,

    });

  } catch (error) {

    return res.status(400).json({

      success: false,

      message:
        error.message,

    });

  }
};


// ==========================================
// GET BY ID
// ==========================================

export const getInvoiceById = async (
  req,
  res
) => {

  try {

    const invoice =
      await invoiceService
        .getInvoiceById(
          req.params.id
        );

    return res.status(200).json({

      success: true,

      data: invoice,

    });

  } catch (error) {

    return res.status(404).json({

      success: false,

      message:
        error.message,

    });

  }
};


// ==========================================
// GET BY ORDER
// ==========================================

export const getInvoiceByOrderId =
async (req, res) => {

  try {

    const invoice =
      await invoiceService
        .getInvoiceByOrderId(
          req.params.orderId
        );

    return res.status(200).json({

      success: true,

      data: invoice,

    });

  } catch (error) {

    return res.status(404).json({

      success: false,

      message:
        error.message,

    });

  }
};


// ==========================================
// GET ALL
// ==========================================

export const getAllInvoices =
async (req, res) => {

  try {

    const invoices =
      await invoiceService
        .getAllInvoices();

    return res.status(200).json({

      success: true,

      data: invoices,

    });

  } catch (error) {

    return res.status(500).json({

      success: false,

      message:
        error.message,

    });

  }
};


// ==========================================
// GET MY INVOICES
// Logged-in user only
// ==========================================

export const getMyInvoices =
async (req, res) => {

  try {

    const userId =
      req.user?._id ||
      req.user?.id ||
      req.user?.userId;

    if (!userId) {

      return res.status(401).json({

        success: false,

        message:
          "Not authorized",

      });

    }

    const invoices =
      await invoiceService
        .getMyInvoices(
          userId
        );

    return res.status(200).json({

      success: true,

      data: invoices,

    });

  } catch (error) {

    return res.status(500).json({

      success: false,

      message:
        error.message,

    });

  }
};