import jwt from "jsonwebtoken";

import User from "../../modules/users/user.model.js";


// =======================================
// OPTIONAL AUTH
// =======================================
//
// Same decoding logic as verifyToken, but:
//
// - No token          -> continue as guest (req.user stays undefined)
// - Invalid/expired    -> continue as guest (req.user stays undefined)
// - Valid token        -> req.user is populated, same as verifyToken
//
// Used on routes that must work for BOTH
// logged-out visitors AND logged-in users,
// e.g. /products/shop
//
// =======================================

export const optionalAuth = async (req, res, next) => {

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

            // No token — treat as guest, don't block

            return next();

        }


        // =======================================
        // GET TOKEN
        // =======================================

        const token =
            authHeader.split(" ")[1];


        if (!token) {

            // No token — treat as guest, don't block

            return next();

        }


        // =======================================
        // VERIFY JWT
        // =======================================

        const decoded = jwt.verify(

            token,

            process.env.JWT_SECRET

        );


        console.log(
            "OPTIONAL AUTH DECODED TOKEN:",
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

            // Malformed token — treat as guest, don't block

            return next();

        }


        // =======================================
        // FIND USER IN DATABASE
        // =======================================

        const user = await User.findById(
            userId
        );


        if (!user) {

            // Token valid but user gone — treat as guest, don't block

            return next();

        }


        // =======================================
        // ATTACH USER TO REQUEST
        // =======================================

        req.user = user;


        console.log(
            "OPTIONAL AUTH — AUTHENTICATED USER:",
            req.user._id,
            "ROLE:",
            req.user.role
        );


        // =======================================
        // CONTINUE
        // =======================================

        next();

    }

    catch (err) {

        // =======================================
        // INVALID / EXPIRED TOKEN
        // =======================================
        //
        // IMPORTANT: unlike verifyToken, we do NOT
        // return a 401 here. The shop must still
        // load for the visitor as a guest.
        //
        // =======================================

        console.log(
            "OPTIONAL AUTH — INVALID TOKEN, CONTINUING AS GUEST:",
            err.message
        );


        next();

    }

};