import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { findUserByEmail } from "./auth.repository.js";


import { findUserById } from "./auth.repository.js";

export const getProfileService = async (userId) => {
  const user = await findUserById(userId);

  if (!user) {
    throw new Error("User not found");
  }

  return {
    success: true,
    message: "Profile fetched successfully",
    data: user,
  };
};
export const loginService = async (body) => {
  const { email, password } = body;

  const user = await findUserByEmail(email);

  if (!user) {
    throw new Error("User not found");
  }

  const isPasswordMatch = await bcrypt.compare(
    password,
    user.password
  );

  if (!isPasswordMatch) {
    throw new Error("Invalid Password");
  }

 if (
  !["ADMIN", "SUPER_ADMIN"].includes(user.role) &&
  !user.isVerified
) {
  throw new Error(
    "Please verify your email before logging in"
  );
}
  if (user.status !== "ACTIVE") {
    throw new Error("Your account is inactive");
  }

  const token = jwt.sign(
    {
      id: user._id,
      role: user.role,
      email: user.email,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );

  return {
    success: true,
    message: "Login Successful",

    token,

    user: {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
      role: user.role,
      status: user.status,
      customerType: user.customerType,
      profileImage: user.profileImage,
    },
  };
};