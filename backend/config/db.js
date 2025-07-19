import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect("mongodb+srv://abhishekgore1706:a2323r2323@cluster0.bmlsfvl.mongodb.net/food-del")
    .then(() => console.log("Db connected"))
    .catch((err) => console.log(err))
}