const express = require('express')

const app = express()
const PORT = process.env.PORT || 3000;

app.get('/api', (req, res) => {
    res.send('Hellooo World...')
})

app.listen(PORT, () => {
    console.log(`Server is Running on Port ${PORT}`)
})