import mongoose from "mongoose";
export const connectToDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI!, {
            dbName: "Frontend_Compiler"
        });
        console.log("Connected To DB");
    } catch (error) {
        console.log("Error", error)
    }
}