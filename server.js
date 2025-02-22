require('dotenv').config();
const express = require('express');
const connectDB = require('./utils/db.utils');

const app = express()
const PORT = process.env.PORT || 3000;

app.get('/api', (req, res) => {
    res.send('Hellooo World...')
})

app.listen(PORT, () => {
    console.log(`Server is Running on Port ${PORT}`)
    connectDB()
})