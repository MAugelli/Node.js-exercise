import multer from "multer";
import mime from "mime"
import { randomUUID } from "crypto";

export const generatePhotoFilename = (mimeType: string) =>{
    const randomFileName = `${randomUUID()}-${Date.now()}`
    const fileExtension =  mime.getExtension(mimeType)
    const fileName = `${randomFileName}.${fileExtension}`

    return fileName
}

const storage = multer.diskStorage({
    destination: "uploads/",
    filename: (request, file, callback) => {
        return callback(null, generatePhotoFilename(file.mimetype))
    }
})

const MAX_SIZE_IN_MEGABYTES = 6 * 1024 * 1024;

const VALID_MIME_TYPES = ["image/png", "image/jpeg"]

const fileFilter: multer.Options["fileFilter"] = (request, file, callback) => {
    if (VALID_MIME_TYPES.includes(file.mimetype)) {
        callback(null, true);
    } else {
        callback(new Error("The uploaded file must be a JPG or a PNG image."))
    }
}

export const multerOptions = {
    fileFilter,
    limits: {
        fileSize: MAX_SIZE_IN_MEGABYTES
    }
}

export const initMulterMiddlewere = () =>{
    return multer({storage, ...multerOptions})
}
