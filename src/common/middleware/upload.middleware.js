// import multer from "multer"; 
// import path from "path"; 
// import fs from "fs"; 
 
// // ===================================================== 
// // CREATE UPLOADER 
// // ===================================================== 
 
// const createUploader = (folderName, options = {}) => { 
 
//     const uploadPath = path.join( 
//         process.cwd(), 
//         "uploads", 
//         folderName 
//     ); 
 
//     // ================================================= 
//     // CREATE FOLDER 
//     // ================================================= 
 
//     if (!fs.existsSync(uploadPath)) { 
 
//         fs.mkdirSync(uploadPath, { 
//             recursive: true 
//         }); 
 
//     } 
 
//     console.log("UPLOAD PATH:", uploadPath); 
 
//     // ================================================= 
//     // STORAGE 
//     // ================================================= 
 
//     const storage = multer.diskStorage({ 
 
//         destination: (req, file, cb) => { 
 
//             cb(null, uploadPath); 
 
//         }, 
 
//         filename: (req, file, cb) => { 
 
//             const ext = path 
//                 .extname(file.originalname) 
//                 .toLowerCase(); 
 
//             const filename = 
//                 `${Date.now()}-${Math.round(Math.random() * 1E9)}${ext}`; 
 
//             cb(null, filename); 
 
//         } 
 
//     }); 
 
//     // ================================================= 
//     // FILE FILTER 
//     // ================================================= 
 
//     const fileFilter = (req, file, cb) => { 
 
//         // --------------------------------------------- 
//         // IMAGE ONLY 
//         // --------------------------------------------- 
 
//         if (options.imagesOnly) { 
 
//             if ( 
//                 file.mimetype && 
//                 file.mimetype.startsWith("image/") 
//             ) { 
 
//                 cb(null, true); 
 
//             } else { 
 
//                 cb( 
//                     new Error("Only image files are allowed"), 
//                     false 
//                 ); 
 
//             } 
 
//             return; 
//         } 
 
//         // --------------------------------------------- 
//         // IMAGES + PDF 
//         // --------------------------------------------- 
 
//         const allowedTypes = [ 
 
//             "image/jpeg", 
//             "image/jpg", 
//             "image/png", 
//             "image/webp", 
//             "application/pdf" 
 
//         ]; 
 
//         if (allowedTypes.includes(file.mimetype)) { 
 
//             cb(null, true); 
 
//         } else { 
 
//             cb( 
//                 new Error( 
//                     "Only JPG, PNG, WEBP and PDF files are allowed" 
//                 ), 
//                 false 
//             ); 
 
//         } 
 
//     }; 
 
//     // ================================================= 
//     // MULTER 
//     // ================================================= 
 
//     return multer({ 
 
//         storage, 
 
//         fileFilter, 
 
//         limits: { 
 
//             files: options.maxFiles || 5, 
 
//             fileSize: 
//                 options.maxSize || 5 * 1024 * 1024 
 
//         } 
 
//     }); 
 
// }; 
 
 
// // ===================================================== 
// // CATEGORY 
// // ===================================================== 
 
// export const categoryUpload = 
//     createUploader("categories", { 
//         imagesOnly: true, 
//         maxFiles: 5 
//     }); 
 
 
// // ===================================================== 
// // BRAND 
// // ===================================================== 
 
// export const brandUpload = 
//     createUploader("brands", { 
//         imagesOnly: true, 
//         maxFiles: 5 
//     }); 
 
 
// // ===================================================== 
// // PRODUCT 
// // ===================================================== 
 
// export const productUpload = 
//     createUploader("products", { 
//         imagesOnly: true, 
//         maxFiles: 5 
//     }); 
 
 
// // ===================================================== 
// // RENTAL DOCUMENT 
// // ===================================================== 
 
// export const rentalDocumentUpload = 
//     createUploader("rental-documents", { 
//         imagesOnly: false, 
//         maxFiles: 1, 
//         maxSize: 10 * 1024 * 1024 
//     }); 
 
 
 
import multer from "multer"; 
import path from "path"; 
import fs from "fs"; 
 
// ===================================================== 
// CREATE UPLOADER 
// ===================================================== 
 
const createUploader = (folderName, options = {}) => { 
 
    // ================================================= 
    // UPLOAD PATH 
    // ================================================= 
 
    const uploadPath = path.join( 
        process.cwd(), 
        "uploads", 
        folderName 
    ); 
 
    // ================================================= 
    // CREATE DIRECTORY IF NOT EXISTS 
    // ================================================= 
 
    if (!fs.existsSync(uploadPath)) { 
 
        fs.mkdirSync(uploadPath, { 
            recursive: true, 
        }); 
 
    } 
 
    console.log("================================="); 
    console.log("UPLOAD FOLDER :", folderName); 
    console.log("UPLOAD PATH   :", uploadPath); 
    console.log("================================="); 
 
 
    // ================================================= 
    // STORAGE 
    // ================================================= 
 
    const storage = multer.diskStorage({ 
 
        // ------------------------------------------------- 
        // DESTINATION 
        // ------------------------------------------------- 
 
        destination: (req, file, cb) => { 
 
            cb(null, uploadPath); 
 
        }, 
 
        // ------------------------------------------------- 
        // FILE NAME 
        // ------------------------------------------------- 
 
        filename: (req, file, cb) => { 
 
            const ext = path 
                .extname(file.originalname) 
                .toLowerCase(); 
 
            const uniqueName = 
                `${Date.now()}-${Math.round( 
                    Math.random() * 1e9 
                )}${ext}`; 
 
            cb(null, uniqueName); 
 
        }, 
 
    }); 
 
 
    // ===================================================== 
    // FILE FILTER 
    // ===================================================== 
 
    const fileFilter = (req, file, cb) => { 
 
        console.log("================================="); 
        console.log("MULTER FILE RECEIVED"); 
        console.log("Field Name    :", file.fieldname); 
        console.log("Original Name :", file.originalname); 
        console.log("Mimetype      :", file.mimetype); 
        console.log("================================="); 
 
 
        // ================================================= 
        // IMAGES ONLY 
        // ================================================= 
 
        if (options.imagesOnly === true) { 
 
            if ( 
                file.mimetype && 
                file.mimetype.startsWith("image/") 
            ) { 
 
                return cb(null, true); 
 
            } 
 
            return cb( 
                new Error( 
                    "Only image files are allowed" 
                ), 
                false 
            ); 
 
        } 
 
 
        // ================================================= 
        // IMAGES + PDF 
        // ================================================= 
 
        const allowedTypes = [ 
 
            "image/jpeg", 
            "image/jpg", 
            "image/png", 
            "image/webp", 
 
            "application/pdf", 
 
        ]; 
 
 
        if (allowedTypes.includes(file.mimetype)) { 
 
            return cb(null, true); 
 
        } 
 
 
        // ================================================= 
        // INVALID FILE 
        // ================================================= 
 
        return cb( 
            new Error( 
                "Only JPG, JPEG, PNG, WEBP and PDF files are allowed" 
            ), 
            false 
        ); 
 
    }; 
 
 
    // ===================================================== 
    // MULTER INSTANCE 
    // ===================================================== 
 
    return multer({ 
 
        storage, 
 
        fileFilter, 
 
        limits: { 
 
            // Maximum number of files 
            files: 
                options.maxFiles || 
                5, 
 
            // Maximum individual file size 
            fileSize: 
                options.maxSize || 
                5 * 1024 * 1024, 
 
        }, 
 
    }); 
 
}; 
 
 
// ===================================================== 
// CATEGORY UPLOAD 
// ===================================================== 
 
export const categoryUpload = createUploader( 
    "categories", 
    { 
        imagesOnly: true, 
 
        maxFiles: 5, 
 
        maxSize: 
            10 * 1024 * 1024, 
    } 
); 
 
 
// ===================================================== 
// BRAND UPLOAD 
// ===================================================== 
 
export const brandUpload = createUploader( 
    "brands", 
    { 
        imagesOnly: true, 
 
        maxFiles: 5, 
 
        maxSize: 
            10 * 1024 * 1024, 
    } 
); 
 
 
// ===================================================== 
// PRODUCT UPLOAD 
// ===================================================== 
 
export const productUpload = createUploader( 
    "products", 
    { 
        imagesOnly: true, 
 
        maxFiles: 5, 
 
        maxSize: 
            10 * 1024 * 1024, 
    } 
); 
 
 
// ===================================================== 
// RENTAL DOCUMENT UPLOAD 
// ===================================================== 
 
/* 
    Allowed: 
 
        JPG 
        JPEG 
        PNG 
        WEBP 
        PDF 
 
    Maximum: 
 
        10 MB 
 
    Files: 
 
        1 
 
    Frontend field name MUST be: 
 
        document 
*/ 
 
export const rentalDocumentUpload = createUploader( 
    "rental-documents", 
    { 
        imagesOnly: false, 
 
        maxFiles: 1, 
 
        maxSize: 
            10 * 1024 * 1024, 
    } 
); 


// =====================================================
// PAYMENT SLIP UPLOAD
// =====================================================

/*
    Allowed:

        JPG
        JPEG
        PNG
        WEBP
        PDF

    Maximum:

        10 MB

    Files:

        1

    Frontend field name MUST be:

        paymentSlip
*/

export const paymentSlipUpload = createUploader(
    "payment-slips",
    {
        imagesOnly: false,

        maxFiles: 1,

        maxSize:
            10 * 1024 * 1024,
    }
);
 
 
// ===================================================== 
// OPTIONAL: EXPORT CREATOR 
// ===================================================== 
 
export { createUploader };