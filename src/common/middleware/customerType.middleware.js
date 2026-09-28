
export const isBusinessCustomer = (req, res, next) => {

    try {

        if (!req.user) {

            return res.status(401).json({

                success: false,

                message: "Unauthorized",

            });

        }

        if (
            req.user.role !== "CUSTOMER" ||
            req.user.customerType !== "BUSINESS"
        ) {

            return res.status(403).json({

                success: false,

                message: "Access Denied — business customers only",

            });

        }

        next();

    }

    catch (error) {

        return res.status(500).json({

            success: false,

            message: error.message,

        });

    }

};