import mongoose from "mongoose";

const connectDB = async () => {
    try{
        console.log(`Connecting to ${process.env.MONGO_URI}`);
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline);
    }
    catch (error){
        console.log(error)
        process.exit(1)
    }
}

export default connectDB