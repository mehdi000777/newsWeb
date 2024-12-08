import mongoose from "mongoose";

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.DB_URL);
    } catch (error) {
        console.log(error.message);
    }
}

export default connectDb;