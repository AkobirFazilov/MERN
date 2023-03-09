const express = require('express')
const config = require('config')
const path = require('path')
const mongoose = require('mongoose')
// const bp = require('body-parser')
const cors = require('cors');
const app = express();
app.use(cors({
    origin: 'http://localhost:3000'
}));

app.use(express.json({ extended: true }))
app.use('/api', require('./routes/books.routes'))
app.use('/api', require('./routes/ganres.routes'))
app.use('/api', require('./routes/auth.routes'))

if (process.env.NODE_ENV === 'production') {
    app.use('/', express.static(path.join(__dirname, 'client', 'build')))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

const PORT = config.get('port') || 5000;

async function start() {
    try {
        mongoose.set('strictQuery', false)
        await mongoose.connect(config.get('mongoUri'))
        app.listen(PORT, () => console.log(`App has been started on port ${PORT}...`));

    } catch (e) {
        console.log('Server Error', e.message);
        process.exit(1);
    }
}

start();

