
import {
    createQuotationService,
    getQuotationsService,
    respondToQuotationItemService,
    acceptCounterOfferService,        // NEW
} from "./quotation.service.js";


// =================================================
// CREATE QUOTATION
// (corporateUser comes from verified token, not client body)
// =================================================

export const createQuotation = async (req, res) => {

    try {

        const quotation = await createQuotationService({
            corporateUser: req.user._id,
            items: req.body.items,
        });

        res.json({
            success: true,
            message: "Quotation submitted",
            data: quotation,
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message,
            data: null,
        });

    }

};


// =================================================
// GET QUOTATIONS
// (business customer sees only their own, admin/sales sees all)
// =================================================

export const getQuotations = async (req, res) => {

    try {

        const filter =
            req.user.role === "CUSTOMER"
                ? { corporateUser: req.user._id }
                : {};

        const quotations = await getQuotationsService(filter);

        res.json({
            success: true,
            message: "Fetched",
            data: quotations,
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message,
            data: null,
        });

    }

};


// =================================================
// RESPOND TO A QUOTATION ITEM (approve / counter / reject)
// admin / sales only
// =================================================

export const respondToQuotationItem = async (req, res) => {

    try {

        const { quotationId, itemId } = req.params;

        const updated = await respondToQuotationItemService(
            quotationId,
            itemId,
            {
                ...req.body,
                respondedBy: req.user._id,
            }
        );

        res.json({
            success: true,
            message: "Updated",
            data: updated,
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message,
            data: null,
        });

    }

};


// =================================================
// ACCEPT / REJECT A COUNTER OFFER
// business customer only — and only on their OWN quotation
//
// req.body: { accept: true }  -> item becomes Approved, finalPrice = counterPrice
// req.body: { accept: false } -> item becomes Rejected
// =================================================

export const acceptCounterOffer = async (req, res) => {

    try {

        const { quotationId, itemId } = req.params;
        const { accept } = req.body;

        if (typeof accept !== "boolean") {

            return res.status(400).json({
                success: false,
                message: "accept (true/false) is required",
                data: null,
            });

        }

        const updated = await acceptCounterOfferService(
            quotationId,
            itemId,
            req.user._id,   // ownership check happens in the service
            accept
        );

        res.json({
            success: true,
            message: accept
                ? "Counter offer accepted"
                : "Counter offer rejected",
            data: updated,
        });

    } catch (err) {

        res.status(err.statusCode || 500).json({
            success: false,
            message: err.message,
            data: null,
        });

    }

};