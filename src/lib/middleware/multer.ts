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
export const multerOption = {}

export const initMulterMiddlewere = () =>{
    return multer({storage, ...multerOption})
}
