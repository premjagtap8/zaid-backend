import jwt from "jsonwebtoken";

import User from "../../modules/users/user.model.js";


// =======================================
// VERIFY TOKEN
// =======================================

export const verifyToken = async (req, res, next) => {

    console.log("control inside verifyToken")

    try {

        // =======================================
        // GET AUTHORIZATION HEADER
        // =======================================

        const authHeader =
            req.headers.authorization;


        if (
            !authHeader ||
            !authHeader.startsWith("Bearer ")
        ) {

            return res.status(401).json({

                success: false,

                message: "Token Missing"

            });

        }


        // =======================================
        // GET TOKEN
        // =======================================

        const token =
            authHeader.split(" ")[1];


        if (!token) {

            return res.status(401).json({

                success: false,

                message: "Token Missing"

            });

        }

        console.log("retrieved the token successfully")
        console.log(token)


        // =======================================
        // VERIFY JWT
        // =======================================

        const decoded = jwt.verify(

            token,

            process.env.JWT_SECRET

        );


        console.log(
            "DECODED TOKEN:",
            decoded
        );


        // =======================================
        // GET USER ID
        // =======================================

        const userId =
            decoded._id ||
            decoded.id ||
            decoded.userId;


        if (!userId) {

            return res.status(401).json({

                success: false,

                message: "User ID not found in token"

            });

        }


        // =======================================
        // FIND USER IN DATABASE
        // =======================================

        const user = await User.findById(
            userId
        );


        if (!user) {

            return res.status(401).json({

                success: false,

                message: "User not found"

            });

        }


        // =======================================
        // ATTACH USER TO REQUEST
        // =======================================

        req.user = user;


        console.log(
            "AUTHENTICATED USER:",
            req.user._id
        );

        console.log("user is authenticated successfully")

        console.log("ABOUT TO CALL NEXT()");

        // =======================================
        // CONTINUE
        // =======================================

        next();

        console.log("next is called")

    }

    catch (err) {

        console.log(
            "AUTH MIDDLEWARE ERROR:",
            err
        );


        return res.status(401).json({

            success: false,

            message: "Invalid Token"

        });

    }

};