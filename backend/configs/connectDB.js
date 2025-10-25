import mongoose from 'mongoose'
import 'dotenv/config'


const connectDB = async () => {
    try {
        mongoose.connection.on("connected",()=>
        console.log("🤝🤝 HandShaked with database")
        )
        await mongoose.connect(`${process.env.MONGODB_URI}/bite-restaurant`)
    } catch (error) {
        console.error(error)
        
    }
    
}

export default connectDB;