require('dotenv').config()
require('./config/database').connect()
const bcrypt = require('bcryptjs/dist/bcrypt')
const express = require('express')
const jwt = require('jsonwebtoken')
const User = require('./model/user')
const auth = require('./middleware/auth')

const app = express()
app.use(express.json())

app.post('/register', async (req, res) => {
    try {
        const { first_name, last_name, email, password } = req.body
        if (!(first_name && last_name && email && password)) {
            res.status(400).send('All input is required')
        }

        const oldUser = await User.findOne({ email })
        if (oldUser) {
            res.status(409).send('User already exist. Please login')
        }

        const encryptedPassword = await bcrypt.hash(password, 10)
        const user = await User.create({
            first_name,
            last_name,
            email: email.toLowerCase(),
            password: encryptedPassword
        })

        const token = jwt.sign(
            { user_id: user._id, email },
            process.env.TOKEN_KEY,
            {
                expiresIn: '2h'
            }
        )

        user.token = token
        res.status(201).json(user)
    } catch (err) {
        console.error(err)
    }
})

app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body

        if (!(email && password)) {
            res.status(400).send('All input is required')
        }

        const user = await User.findOne({ email })
        if (user && (await bcrypt.compare(password, user.password))) {
            const token = jwt.sign(
                { user_id: user._id, email },
                process.env.TOKEN_KEY,
                {
                    expiresIn: '1h'
                }
            )

            user.token = token
            res.status(200).json(user)
        }
        
        res.status(400).send('Invalid credentials')
    } catch (err) {
        console.log(err)
    }
})

app.get('/welcome', auth, (req, res) => {
    res.status(200).send('Welcome my friend!!!')
})

module.exports = app