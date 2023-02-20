const { Router } = require('express');
const router = Router();
const Book = require('./models/Book')
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })

//TODO validation
router.post(
    '/books',
    upload.single('image'),
    async (req, res) => {
        console.log(req.body);
        try {
            const { title, ganre, description, link } = req.body;
            const book = new Book({ title, ganre, description, link });

            await book.save();

            res.status(201).json({});
        } catch (e) {
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