import multer from "multer";

export const multerOption = {}

export const initMulterMiddlewere = () =>{
    return multer(multerOption)
}
