import Vendor from "./vendor.model.js";


// ======================================================
// CREATE VENDOR
// ======================================================

export const createVendorService = async (data) => {

  if (!data.vendorName || !data.vendorName.trim()) {
    throw new Error("Vendor name is required");
  }

  if (!data.phone || !data.phone.trim()) {
    throw new Error("Vendor phone is required");
  }


  // ======================================================
  // UNIQUENESS CHECK
  // ======================================================

  const duplicateQuery = {
    isDeleted: false,
    $or: [{ phone: data.phone }]
  };

  if (data.email && data.email.trim()) {
    duplicateQuery.$or.push({ email: data.email });
  }

  if (data.gstNumber && data.gstNumber.trim()) {
    duplicateQuery.$or.push({ gstNumber: data.gstNumber });
  }

  if (data.panNumber && data.panNumber.trim()) {
    duplicateQuery.$or.push({ panNumber: data.panNumber });
  }

  const existingVendor = await Vendor.findOne(duplicateQuery);

  if (existingVendor) {
    throw new Error(
      "A vendor with this phone, email, GST or PAN already exists"
    );
  }


  const vendor = await Vendor.create({
    vendorName: data.vendorName,
    contactPerson: data.contactPerson || "",
    phone: data.phone,
    email: data.email || "",
    address: data.address || "",
    city: data.city || "",
    state: data.state || "",
    pincode: data.pincode || "",
    gstNumber: data.gstNumber || "",
    panNumber: data.panNumber || "",
    bankDetails: {
      accountHolderName: data.bankDetails?.accountHolderName || "",
      bankName: data.bankDetails?.bankName || "",
      accountNumber: data.bankDetails?.accountNumber || "",
      ifscCode: data.bankDetails?.ifscCode || ""
    }
  });


  return vendor;
};


// ======================================================
// GET ALL VENDORS
// ======================================================

export const getAllVendorsService = async () => {

  return await Vendor.find({
    isDeleted: false,
    isActive: true
  }).sort({
    createdAt: -1
  });
};


// ======================================================
// GET SINGLE VENDOR
// ======================================================

export const getVendorService = async (vendorId) => {

  const vendor = await Vendor.findOne({
    _id: vendorId,
    isDeleted: false
  });

  if (!vendor) {
    throw new Error("Vendor not found");
  }

  return vendor;
};


// ======================================================
// UPDATE VENDOR
// ======================================================

export const updateVendorService = async (vendorId, data) => {

  const vendor = await Vendor.findOne({
    _id: vendorId,
    isDeleted: false
  });

  if (!vendor) {
    throw new Error("Vendor not found");
  }

  if (data.vendorName !== undefined && !data.vendorName.trim()) {
    throw new Error("Vendor name is required");
  }

  if (data.phone !== undefined && !data.phone.trim()) {
    throw new Error("Vendor phone is required");
  }


  // ======================================================
  // UNIQUENESS CHECK (excluding this vendor itself)
  // ======================================================

  const duplicateQuery = {
    _id: { $ne: vendorId },
    isDeleted: false,
    $or: []
  };

  if (data.phone !== undefined && data.phone.trim()) {
    duplicateQuery.$or.push({ phone: data.phone });
  }
  if (data.email !== undefined && data.email.trim()) {
    duplicateQuery.$or.push({ email: data.email });
  }
  if (data.gstNumber !== undefined && data.gstNumber.trim()) {
    duplicateQuery.$or.push({ gstNumber: data.gstNumber });
  }
  if (data.panNumber !== undefined && data.panNumber.trim()) {
    duplicateQuery.$or.push({ panNumber: data.panNumber });
  }

  if (duplicateQuery.$or.length > 0) {
    const existingVendor = await Vendor.findOne(duplicateQuery);

    if (existingVendor) {
      throw new Error(
        "A vendor with this phone, email, GST or PAN already exists"
      );
    }
  }


  // only overwrite fields that were actually sent
  if (data.vendorName !== undefined) vendor.vendorName = data.vendorName;
  if (data.contactPerson !== undefined) vendor.contactPerson = data.contactPerson;
  if (data.phone !== undefined) vendor.phone = data.phone;
  if (data.email !== undefined) vendor.email = data.email;
  if (data.address !== undefined) vendor.address = data.address;
  if (data.city !== undefined) vendor.city = data.city;
  if (data.state !== undefined) vendor.state = data.state;
  if (data.pincode !== undefined) vendor.pincode = data.pincode;
  if (data.gstNumber !== undefined) vendor.gstNumber = data.gstNumber;
  if (data.panNumber !== undefined) vendor.panNumber = data.panNumber;

  if (data.bankDetails !== undefined) {
    vendor.bankDetails = {
      accountHolderName:
        data.bankDetails.accountHolderName ??
        vendor.bankDetails.accountHolderName,
      bankName: data.bankDetails.bankName ?? vendor.bankDetails.bankName,
      accountNumber:
        data.bankDetails.accountNumber ?? vendor.bankDetails.accountNumber,
      ifscCode: data.bankDetails.ifscCode ?? vendor.bankDetails.ifscCode
    };
  }

  if (data.isActive !== undefined) vendor.isActive = data.isActive;

  await vendor.save();

  return vendor;
};


// ======================================================
// DELETE VENDOR (soft delete)
// ======================================================

export const deleteVendorService = async (vendorId) => {

  const vendor = await Vendor.findOne({
    _id: vendorId,
    isDeleted: false
  });

  if (!vendor) {
    throw new Error("Vendor not found");
  }

  vendor.isDeleted = true;

  await vendor.save();

  return vendor;
};