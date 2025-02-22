require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./utils/db.utils');
const generate = require('./controllers/generate.controllers');

const app = express()
const PORT = process.env.PORT || 3000;

app.use(cors())
app.use(express.json())

app.get('/api', (req, res) => {
    res.send('Hellooo World...')
})

app.post('/api/generate', generate)

app.listen(PORT, () => {
    console.log(`Server is Running on Port ${PORT}`)
    connectDB()
})