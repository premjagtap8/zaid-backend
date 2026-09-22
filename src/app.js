
import express from "express";
import cors from "cors";
import path from "path";
import userRoutes from "./modules/users/user.routes.js";
import authRoutes from "./modules/auth/auth.routes.js";
import addressRoutes from "./modules/addresses/address.routes.js";
import categoryRoutes from "./modules/categories/category.routes.js";
import brandRoutes from "./modules/brands/brand.routes.js";
import productRoutes from "./modules/products/product.routes.js";
import  cartRoutes  from "./modules/cart/cart.routes.js"
import wishlistRoutes from "./modules/wishlist/wishlist.routes.js";
import orderRoutes from "./modules/orders/order.routes.js";
import inventoryRoutes from "./modules/inventory/inventory.routes.js";
import stockTransactionRoutes from "./modules/inventory/stockTransaction/stockTransaction.routes.js";
import paymentRoutes from "./modules/payments/payment.routes.js";
import shipmentRoutes from "./modules/shipment/shipment.routes.js";
import offerRoutes from "./modules/offer/offer.routes.js";
import salaryRoutes from "./modules/salary/salary.routes.js";
import shiftRoutes from "./modules/shift/shift.routes.js";
 import attendanceRoutes from "./modules/attendence/attendance.routes.js";
import invoiceRoutes from "./modules/invoices/invoice.routes.js";
import notificationRoute from "./modules/notification/notification.routes.js"; 
import couponRoutes from "./modules/coupons/coupon.routes.js"; 
import reviewRoutes from "./modules/review/review.routes.js";
import newRepair from './modules/repair/repair.routes.js'
import repairInventry from "./modules/repair/repairparts/repairParts.routes.js"
import rentalRoutes from "./modules/rental/rental.routes.js";
import purchaseRoutes from "./modules/Accountant/purchase.routes.js";
import financialReportsRoutes from "./modules/Accountant/financialReports.routes.js";
import repairserviceRoutes from './modules/repair/services/service.routes.js'
import leaveRoutes from "./modules/leave/leave.routes.js";
import availabilityRequestRoutes from "./modules/availabilityRequest/availabilityRequest.routes.js";
import expenseRoutes from "./modules/Accountant/expense.routes.js";
import receptionistRoutes from "./modules/receptionist/receptionist.routes.js";
// NEW: procurement routes
import vendorRoutes from "./modules/Procurementt/vendor.routes.js";
import purchaseOrderRoutes from "./modules/Procurementt/purchaseOrder.routes.js";
const app = express();

app.use(cors({
    origin: [
        "http://localhost:5173",
        process.env.FRONTEND_URL
    ]
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ==============================
// Static Upload Folder
// ==============================

app.use(
  "/uploads",
  express.static(
    path.join(process.cwd(), "uploads")
  )
);


// Health Check
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "FixFlow API Running 🚀",
  });
});

// User Routes


app.use("/api/users", userRoutes);
app.use("/api/auth1", authRoutes);
app.use("/api/categories",categoryRoutes);
app.use("/api/brands", brandRoutes);
app.use("/api/products",productRoutes);
app.use("/api/inventory",inventoryRoutes);
app.use("/api/stock-transactions",stockTransactionRoutes);
app.use("/api/addresses",addressRoutes);
app.use("/api/cart",cartRoutes);
app.use("/api/wishlist",wishlistRoutes);
app.use("/api/orders",orderRoutes);
app.use("/api/offers",offerRoutes);
app.use("/api/payments",paymentRoutes);
app.use("/api/shipment",shipmentRoutes);
app.use("/api/salary", salaryRoutes);
app.use("/api/shifts",shiftRoutes);
// app.use("/api/attendance",attendanceRoutes);
app.use("/api/newAttendance", attendanceRoutes);
app.use("/api/invoices",invoiceRoutes);
app.use("/api/notifications", notificationRoute);
app.use("/api/coupons", couponRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/leaves",leaveRoutes);
app.use("/api/newRepair", newRepair)
app.use("/api/repair-service", repairserviceRoutes)
app.use("/api/repairInventory", repairInventry)
app.use("/api/availability-requests",availabilityRequestRoutes);
app.use("/api/rentals",rentalRoutes);
app.use("/api/receptionist", receptionistRoutes);
app.use("/api/expenses",expenseRoutes);
app.use("/api/purchase",purchaseRoutes);
app.use("/api/financial-reports",financialReportsRoutes);
// NEW: procurement routes
app.use("/api/procurement/vendors", vendorRoutes);
app.use("/api/procurement/purchase-orders", purchaseOrderRoutes);
export default app;