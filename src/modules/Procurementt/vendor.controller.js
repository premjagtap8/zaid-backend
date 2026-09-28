import {
  createVendorService,
  getAllVendorsService,
  getVendorService,
  updateVendorService,
  deleteVendorService
} from "./vendor.service.js";


// ======================================================
// CREATE VENDOR
// ======================================================

export const createVendorController = async (req, res) => {

  try {

    const data = await createVendorService(req.body);

    return res.status(201).json({
      success: true,
      message: "Vendor created successfully",
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
// GET ALL VENDORS
// ======================================================

export const getAllVendorsController = async (req, res) => {

  try {

    const data = await getAllVendorsService();

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
// GET SINGLE VENDOR
// ======================================================

export const getVendorController = async (req, res) => {

  try {

    const data = await getVendorService(req.params.vendorId);

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
// UPDATE VENDOR
// ======================================================

export const updateVendorController = async (req, res) => {

  try {

    const data = await updateVendorService(req.params.vendorId, req.body);

    return res.status(200).json({
      success: true,
      message: "Vendor updated successfully",
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
// DELETE VENDOR (soft delete)
// ======================================================

export const deleteVendorController = async (req, res) => {

  try {

    const data = await deleteVendorService(req.params.vendorId);

    return res.status(200).json({
      success: true,
      message: "Vendor deleted successfully",
      data
    });

  } catch (error) {

    return res.status(400).json({
      success: false,
      message: error.message
    });
  }
};