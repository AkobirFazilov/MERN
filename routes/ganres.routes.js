const { Router } = require('express');
const router = Router();
const Ganre = require('./models/Ganre')
//TODO validation
router.post(
    '/ganres',
    async (req, res) => {
        try {
            const { name } = req.body;

            const ganre = new Ganre({ name });

            await ganre.save();

            res.status(201).json({});
        } catch (e) {
            res.status(500).json({ message: "Something wrong try again later" });
        }
    })
router.get(
    '/ganres',
    async (req, res) => {
        try {
            res.status(201).json(await Ganre.find());
        } catch (e) {
            res.status(500).json(e);
        }
    })

module.exports = router;