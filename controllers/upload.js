const path = require('path'); // Add this line
const multer = require('multer');

// Your existing code
const fileFilter = (req, file, cb) => {
    // Define the allowed file types
    const fileTypes = /jpeg|jpg|png|gif/;
    
    // Check the file extension and mime type
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = fileTypes.test(file.mimetype);

    if (extname && mimetype) {
        return cb(null, true);
    } else {
        cb('Error: Images Only!');
    }
};

// Your multer configuration (example)
const upload = multer({
    fileFilter: fileFilter,
    // Other multer options...
});

module.exports = upload;
