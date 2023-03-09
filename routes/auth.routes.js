const { Router } = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const { check, validationResult } = require('express-validator')
const User = require('./models/User')
const router = Router()

router.post(
    '/register',
    [
        check('password', "Минимальная длина пароля 6 символов").isLength({ min: 6 })
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: "Некоректные данные при регистрации. Пароль: минимальное количество символов 6"
                })
            }

            const { nikname, password } = req.body

            const candidate = await User.findOne({ nikname })

            if (candidate) {
                return res.status(400).json({ message: "Такой пользователь уже существует" })
            }

            const hashedPassword = await bcrypt.hash(password, 12)

            const user = new User({ nikname, password: hashedPassword })

            await user.save()

            res.status(201).json({ message: "Пользователь создан" })

        } catch (e) {
            res.status(500)
        }
    })

router.post(
    '/login',
    [
        check('password', 'Введите пароль').exists()
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: "Некоректные данные при входе в систему. Пароль: минимальное количество символов 6"
                })
            }

            const { nikname, password } = req.body;

            const user = await User.findOne({ nikname })

            if (!user) {
                return res.status(400).json({ message: "Пользователь не найден" })
            }

            const isMatch = await bcrypt.compare(password, user.password)

            if (!isMatch) {
                return res.status(400).json({ message: "Неверный пароль" })
            }

            const token = jwt.sign(
                { userId: user.id },
                config.get('jwtSecret'),
                { expiresIn: '1h' }
            )

            res.json({ token, userId: user.id })

        } catch (e) {
            res.status(500)
        }
    })

router.get(
    '/users/:userId',
    async (req, res) => {
        try {
            const { userId } = req.params
            const user = await User.findById(userId);
            res.status(200).json(user)
        } catch (e) {
            res.status(500).json(e);
        }
    })

module.exports = router;