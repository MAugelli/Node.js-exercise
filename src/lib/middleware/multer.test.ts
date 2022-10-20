import { generatePhotoFilename } from "./multer";

describe("generatePhotoFilename", ()=>{
    test.each([
        ["image/png", "png"],
        ["image/jpeg", "jpeg"]
    ])("Generate filename whit correct exstansion when passed mimeType `%s", (mimeType, expercedFileExistension)=>{
        const fullFileName = generatePhotoFilename(mimeType)
        const [, fileExtension] = fullFileName.split(".")

        expect(fileExistension).toEqual(expercedFileExistension)
    })
})
