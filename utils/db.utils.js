const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log(`Database Connected Successfully: ${conn.connection.host}`)
    } catch (err) {
        console.error(`Error: ${err.message}`)
    }
}
module.exports = connectDB