


import express from "express";

import {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  register,
  updateCustomerProfile,
  getProfile,
  getEmployees,
  updateEmployeeStatus,
  updateSalary,
  addSalaryHistory,
  getSalaryHistory,
  forgotPassword,
  resetPassword,
  verifyEmail,
  resendEmailVerificationOtp,
  changepassword 
} from "./user.controller.js";

import { verifyToken } from "../../common/middleware/auth.middleware.js";
import { allowRoles } from "../../common/middleware/role.middleware.js";

const router = express.Router();

/*
====================================================
                PUBLIC ROUTES
====================================================
*/

// Customer Register
router.post("/register", register);

/*
====================================================
                PROFILE
====================================================
*/
 

router.put(

"/status/:id",

verifyToken,

allowRoles(

"SUPER_ADMIN",

"ADMIN"

),

updateEmployeeStatus

);
// Logged In User Profile
router.get(
  "/profile",
  verifyToken,
  getProfile
);


// Update Profile
router.put(
  "/profile",
  verifyToken,
  updateCustomerProfile
);

/*
====================================================
                EMPLOYEE
====================================================
*/

// Employee List
router.get(
  "/employees",
  verifyToken,
  allowRoles("SUPER_ADMIN", "ADMIN","HR_EXECUTIVE"),
  getEmployees
);

/*
====================================================
                USER MANAGEMENT
====================================================
*/

// Create User / Employee
router.post(
  "/",
  verifyToken,
  allowRoles("SUPER_ADMIN", "ADMIN"),
  createUser
);

// Get All Users
router.get(
  "/",
  verifyToken,
  allowRoles("SUPER_ADMIN", "ADMIN"),
  getUsers
);

// Get User By Id
router.get(
  "/:id",
  verifyToken,
  allowRoles("SUPER_ADMIN", "ADMIN"),
  getUserById
);

router.put("/change-password", verifyToken, changepassword);

// Update User
router.put(
  "/:id",
  verifyToken,
  allowRoles("SUPER_ADMIN", "ADMIN"),
  updateUser
);

// Delete User
router.delete(
  "/:id",
  verifyToken,
  allowRoles("SUPER_ADMIN", "ADMIN"),
  deleteUser
);


router.put(
"/:id/salary",

verifyToken,

allowRoles(
"SUPER_ADMIN",
"ADMIN"
),

updateSalary

);




// Add Salary Payment History

router.post(
"/:id/salary-history",

verifyToken,

allowRoles(
"SUPER_ADMIN",
"ADMIN"
),

addSalaryHistory

);




// Get Salary History

router.get(
"/:id/salary-history",

verifyToken,

allowRoles(
"SUPER_ADMIN",
"ADMIN"
),

getSalaryHistory

);

router.post(
  "/forgot-password",
  forgotPassword
);

router.post(
  "/reset-password/:token",
  resetPassword
);

// Verify Email
router.post(
  "/verify-email",
  verifyEmail
);


// Resend Email Verification OTP
router.post(
  "/resend-verification-otp",
  resendEmailVerificationOtp
);


export default router;