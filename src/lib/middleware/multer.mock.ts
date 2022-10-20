import multer from "multer";

jest.mock("./multer", ()=>{
    const originalModule = jest.requireActual("./multer")

    return{
        __esModule: true,
        ...originalModule,
        initMulterMiddlewere: () => {
            return multer({
                storage: multer.memoryStorage(),
                ...originalModule.multerOption
            })
        }
    }
})
