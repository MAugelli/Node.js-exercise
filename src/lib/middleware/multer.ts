import multer from "multer";

const storage = multer.diskStorage({
    destination: "uploads/"
})
export const multerOption = {}

export const initMulterMiddlewere = () =>{
    return multer({storage, ...multerOption})
}
