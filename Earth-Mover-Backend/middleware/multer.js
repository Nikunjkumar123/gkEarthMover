import multer from "multer";
// import CloudinaryStorage from "multer-storage-cloudinary";
import cloudinary from "cloudinary";

const storage = multer.diskStorage({
    filename:function(req,file,cb){
        cb(null,file.originalname)
    }
});

const upload = multer({storage:storage});

export default upload;