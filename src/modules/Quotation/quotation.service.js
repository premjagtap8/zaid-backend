

import Quotation from "./quotation.model.js";


// =================================================
// CREATE QUOTATION (cart-style, multiple items)
// =================================================

export const createQuotationService = async ({ corporateUser, items }) => {

    return await Quotation.create({
        corporateUser,
        items,
    });

};


// =================================================
// GET QUOTATIONS (admin sees all, corporate user sees own via filter)
// =================================================

export const getQuotationsService = async (filter = {}) => {

    return await Quotation.find(filter)
        .populate("items.product", "name pricing.retailPrice pricing.wholesalePrice")
        .populate("corporateUser", "firstName lastName email businessDetails.companyName")
        .sort({ createdAt: -1 });

};


// =================================================
// RESPOND TO ONE ITEM INSIDE A QUOTATION
// (approve / counter / reject a single product line)
// admin / sales only — called from respondToQuotationItem
// =================================================

export const respondToQuotationItemService = async (
    quotationId,
    itemId,
    { status, counterPrice, finalPrice, respondedBy }
) => {

    const quotation = await Quotation.findById(quotationId);

    if (!quotation) {
        throw new Error("Quotation not found");
    }

    const item = quotation.items.id(itemId);

    if (!item) {
        throw new Error("Quotation item not found");
    }

    item.status = status;

    if (counterPrice !== undefined) {
        item.counterPrice = counterPrice;
    }

    if (finalPrice !== undefined) {
        item.finalPrice = finalPrice;
    }

    quotation.respondedBy = respondedBy;

    await quotation.save();

    return quotation;

};


// =================================================
// ACCEPT / REJECT A COUNTER OFFER
// business customer only — and only on their OWN quotation,
// and only when the item is currently "Countered"
// =================================================

export const acceptCounterOfferService = async (
    quotationId,
    itemId,
    customerId,
    accept
) => {

    const quotation = await Quotation.findById(quotationId);

    if (!quotation) {
        const error = new Error("Quotation not found");
        error.statusCode = 404;
        throw error;
    }

    // ---------------------------------------------
    // OWNERSHIP CHECK
    // Customer can only act on their own quotation
    // ---------------------------------------------

    if (String(quotation.corporateUser) !== String(customerId)) {

        const error = new Error("You are not allowed to respond to this quotation");
        error.statusCode = 403;
        throw error;

    }

    const item = quotation.items.id(itemId);

    if (!item) {
        const error = new Error("Quotation item not found");
        error.statusCode = 404;
        throw error;
    }

    // ---------------------------------------------
    // STATUS CHECK
    // Can only accept/reject a counter that is
    // actually in "Countered" status
    // ---------------------------------------------

    if (item.status !== "Countered") {

        const error = new Error(
            `This item is not awaiting your response (current status: ${item.status})`
        );
        error.statusCode = 400;
        throw error;

    }

    if (accept) {

        item.status = "Approved";
        item.finalPrice = item.counterPrice;

    } else {

        item.status = "Rejected";

    }

    await quotation.save();

    return quotation;

};


// =================================================
// MARK ONE ITEM AS "USED" ONCE AN ORDER IS PLACED FROM IT
// =================================================

export const markQuotationItemUsedService = async (quotationId, itemId) => {

    const quotation = await Quotation.findById(quotationId);

    if (!quotation) {
        throw new Error("Quotation not found");
    }

    const item = quotation.items.id(itemId);

    if (!item) {
        throw new Error("Quotation item not found");
    }

    item.status = "Used";

    await quotation.save();

    return quotation;

};