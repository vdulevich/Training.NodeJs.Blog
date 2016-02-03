var multer = require('multer');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/temp/')
    }
})

module.exports = multer({ storage: storage });