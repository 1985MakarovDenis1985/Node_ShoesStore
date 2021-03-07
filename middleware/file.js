const multer = require('multer')

const storage = multer.diskStorage({
    destination(req, file, callback){
        callback(null, 'avatars')
    },
    filename(req, file, callback){
        callback(null, new Date() + '-' + file.originalname)
    }
})

const allowedTypes = ['image/jpg', 'image/jpeg', 'image/png']

const fileFilter = (req, file, callback) => {
    if (allowedTypes.includes(file.mimeType)){
        callback(null, true)
    } else {
        callback(null, false)
    }
}

module.exportrs = multer({
    storage,
    fileFilter
})