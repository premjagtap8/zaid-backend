import { registerSchema } from "./user.validation.js";
import { registerUser } from "./user.service.js";
import * as userService from "./user.service.js";
import User from "./user.model.js";

// ===============================
// Create User
// ===============================
// export const createUser = async (req, res) => {
//   try {
//     const user = await userService.createUser(req.body);

//     return res.status(201).json({
//       success: true,
//       message: "User Created Successfully",
//       data: user,
//     });
//   } catch (error) {
//     return res.status(400).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

export const createUser = async (
  req,
  res
) => {

  try {

    const user =
      await userService.createUser(
        req.body
      );

    return res.status(201).json({

      success: true,

      message:
        "User Created Successfully",

      data: user,

    });

  } catch (error) {

    console.error(
      "CREATE USER ERROR:",
      error
    );

    return res.status(400).json({

      success: false,

      message: error.message,

    });
  }
};



// ===============================
// Get All Users
// ===============================
export const getUsers = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const search = req.query.search || "";

    const users = await userService.getUsers({
      page,
      limit,
      search,
    });

    return res.status(200).json({
      success: true,
      message: "Users fetched successfully",
      ...users,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===============================
// Get User By Id
// ===============================
export const getUserById = async (req, res) => {
  try {
    const user = await userService.getUserById(req.params.id);

    return res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

// ===============================
// Update User
// ===============================
export const updateUser = async (req, res) => {
  try {
    const user = await userService.updateUser(
      req.params.id,
      req.body
    );

    return res.status(200).json({
      success: true,
      message: "User Updated Successfully",
      data: user,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// ===============================
// Soft Delete User
// ===============================
export const deleteUser = async (req, res) => {
  try {
    await userService.deleteUser(req.params.id);

    return res.status(200).json({
      success: true,
      message: "User Deleted Successfully",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
export const register = async (req, res) => {
  try {
    // Validate Request
    const validatedData = registerSchema.parse(req.body);

    // Save User
    const user = await registerUser(validatedData);

    res.status(201).json({
      success: true,
      message: "User Registered Successfully",
      data: user,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
// ===============================
// Update Customer Profile
// ===============================
export const updateCustomerProfile = async (req, res) => {
  try {

    const userId = req.user.id;

    const user = await userService.updateCustomerProfile(
      userId,
      req.body
    );


    return res.status(200).json({
      success: true,
      message: "Customer Profile Updated Successfully",
      data: user,
    });


  } catch (error) {

    return res.status(400).json({
      success: false,
      message: error.message,
    });

  }
};
// ===============================
// Get Logged In User Profile
// ===============================
export const getProfile = async (req, res) => {
  try {

    const user = await userService.getProfile(req.user.id);

    return res.status(200).json({
      success: true,
      message: "Profile fetched successfully",
      data: user,
    });

  } catch (error) {

    return res.status(400).json({
      success: false,
      message: error.message,
    });

  }
};

// ===============================
// Get Employee List
// ===============================

export const getEmployees = async (req, res) => {

  try {

    const employees = await userService.getEmployees();

    res.status(200).json({
      success: true,
      data: employees
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};
// ===============================
// Update Employee Status
// ===============================

export const updateEmployeeStatus = async (

  req,

  res

) => {

  try {

    const employee =
      await userService.updateEmployeeStatus(

        req.params.id,

        req.body.status

      );

    return res.status(200).json({

      success: true,

      message: "Employee Status Updated",

      data: employee,

    });

  }

  catch (error) {

    return res.status(400).json({

      success: false,

      message: error.message,

    });

  }

};




// ===============================
// Update Employee Salary
// ===============================

export const updateSalary = async(req,res)=>{

try{


const employee =
await userService.updateSalary(

req.params.id,

req.body.salaryDetails

);


res.status(200).json({

success:true,

message:"Salary updated successfully",

data:employee

});


}
catch(error){

res.status(400).json({

success:false,

message:error.message

});

}


};





// ===============================
// Add Salary History
// ===============================

export const addSalaryHistory = async(req,res)=>{

try{


const employee =
await userService.addSalaryHistory(

req.params.id,

req.body

);



res.status(200).json({

success:true,

message:"Salary payment added",

data:employee

});


}
catch(error){

res.status(400).json({

success:false,

message:error.message

});

}

};





// ===============================
// Get Salary History
// ===============================

export const getSalaryHistory = async(req,res)=>{


try{


const employee =
await userService.getSalaryHistory(
req.params.id
);



res.status(200).json({

success:true,

data:employee

});


}
catch(error){

res.status(400).json({

success:false,

message:error.message

});

}


};

export const forgotPassword = async (req, res) => {
  try {
    const result = await userService.forgotPassword(req.body.email);

    return res.status(200).json({
      success: true,
      message: result,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const result = await userService.resetPassword(
      req.params.token,
      req.body.password
    );

    return res.status(200).json({
      success: true,
      message: result,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};


// export const verifyEmail = async (req, res) => {

//   try {

//     const { email, otp } = req.body;

//     const user =
//       await userService.verifyEmail(
//         email,
//         otp
//       );

//     return res.status(200).json({

//       success: true,

//       message: "Email verified successfully",

//       data: {
//         id: user._id,
//         email: user.email,
//         isVerified: user.isVerified
//       }

//     });

//   } catch (error) {

//     return res.status(400).json({

//       success: false,

//       message: error.message

//     });

//   }

// };

// export const resendEmailVerificationOtp = async (
//   req,
//   res
// ) => {

//   try {

//     const { email } = req.body;

//     const message =
//       await userService.resendEmailVerificationOtp(
//         email
//       );

//     return res.status(200).json({

//       success: true,

//       message

//     });

//   } catch (error) {

//     return res.status(400).json({

//       success: false,

//       message: error.message

//     });

//   }

// };



// ======================================================
// VERIFY EMAIL
// ======================================================

export const verifyEmail = async (
  req,
  res
) => {

  try {

    const {
      email,
      otp,
    } = req.body;

    const user =
      await userService.verifyEmail(
        email,
        otp
      );

    return res.status(200).json({

      success: true,

      message:
        "Email verified successfully",

      data: {
        id: user._id,
        email: user.email,
        isVerified: user.isVerified,
      },

    });

  } catch (error) {

    console.error(
      "VERIFY EMAIL ERROR:",
      error
    );

    return res.status(400).json({

      success: false,

      message: error.message,

    });
  }
};

// ======================================================
// RESEND VERIFICATION OTP
// ======================================================

export const resendEmailVerificationOtp = async (
  req,
  res
) => {

  try {

    const {
      email,
    } = req.body;

    const message =
      await userService.resendEmailVerificationOtp(
        email
      );

    return res.status(200).json({

      success: true,

      message,

    });

  } catch (error) {

    console.error(
      "RESEND VERIFICATION OTP ERROR:",
      error
    );

    return res.status(400).json({

      success: false,

      message: error.message,

    });
  }
};


export const changepassword = async (req, res) => {
  try {
    const userId = req.user.id;
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Old password and new password are required",
      });
    }

    if (oldPassword === newPassword) {
      return res.status(400).json({
        success: false,
        message: "New password must be different from the old password",
      });
    }

    const message = await userService.changePassword(
      userId,
      oldPassword,
      newPassword
    );

    return res.status(200).json({
      success: true,
      message,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};