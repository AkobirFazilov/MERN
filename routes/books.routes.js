const { Router } = require('express');
const multer = require('multer')
const router = Router();
const Book = require('./models/Book')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '.' + file.originalname.split('.').pop())
    }
})

const upload = multer({ storage: storage })
const cpUpload = upload.fields([{ name: 'file', maxCount: 1 }, { name: 'image', maxCount: 1 }])
router.post(
    '/books',
    cpUpload,
    async (req, res) => {
        try {
            const link = req.protocol + '://' + req.get('host') + "/" + req.files.file[0].path
            const imageLink = req.protocol + '://' + req.get('host') + "/" + req.files.image[0].path

            const { title, ganre, description } = req.body;
            const book = new Book({ title, ganre, description, link, imageLink });

            const savedBook = await book.save();

            res.status(201).json({ bookId: savedBook._id });
        } catch (e) {
            console.log(e);
            res.status(500).json(e);
        }
    })

router.get(
    '/books',
    async (req, res) => {
        try {
            res.status(201).json(await Book.find().populate('ganre'));
        } catch (e) {
            res.status(500).json({ message: "Something wrong try again latersdhsdhjshd" });
        }
    })

module.exports = router;