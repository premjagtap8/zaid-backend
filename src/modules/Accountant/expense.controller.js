import {
    createExpenseService,
    getExpenseService,
    getAllExpensesService,
    updateExpenseService,
    deleteExpenseService
} from "./expense.service.js";


// =====================================================
// CREATE
// =====================================================

export const createExpenseController = async (
    req,
    res
) => {

    console.log("control is inside the createExpenseController method")
    console.log(req.body)

    try {

        const expense =
            await createExpenseService(
                req.body,
                req.user._id
            );

        return res.status(201).json({

            success: true,

            message:
                "Expense created successfully",

            data:
                expense

        });

    } catch (error) {

        return res.status(400).json({

            success: false,

            message:
                error.message

        });

    }

};


// =====================================================
// GET ALL
// =====================================================

export const getAllExpensesController = async (
    req,
    res
) => {

    try {

        const expenses =
            await getAllExpensesService(
                req.query
            );

        return res.status(200).json({

            success: true,

            count:
                expenses.length,

            data:
                expenses

        });

    } catch (error) {

        return res.status(400).json({

            success: false,

            message:
                error.message

        });

    }

};


// =====================================================
// GET ONE
// =====================================================

export const getExpenseController = async (
    req,
    res
) => {

    try {

        const expense =
            await getExpenseService(
                req.params.id
            );

        return res.status(200).json({

            success: true,

            data:
                expense

        });

    } catch (error) {

        return res.status(404).json({

            success: false,

            message:
                error.message

        });

    }

};


// =====================================================
// UPDATE
// =====================================================

export const updateExpenseController = async (
    req,
    res
) => {

    try {

        const expense =
            await updateExpenseService(
                req.params.id,
                req.body
            );

        return res.status(200).json({

            success: true,

            message:
                "Expense updated successfully",

            data:
                expense

        });

    } catch (error) {

        return res.status(400).json({

            success: false,

            message:
                error.message

        });

    }

};


// =====================================================
// DELETE
// =====================================================

export const deleteExpenseController = async (
    req,
    res
) => {

    try {

        const expense =
            await deleteExpenseService(
                req.params.id
            );

        return res.status(200).json({

            success: true,

            message:
                "Expense deleted successfully",

            data:
                expense

        });

    } catch (error) {

        return res.status(400).json({

            success: false,

            message:
                error.message

        });

    }

};