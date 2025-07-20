import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js"
import foodRouter from "./routes/foodRoute.js"
import userRouter from "./routes/userRoute.js"
import "dotenv/config"
import cartRouter from "./routes/cartRoute.js"
import orderRouter from "./routes/orderRoute.js"


//app config
const app = express()
const PORT_NO = process.env.PORT_NO

//middle ware
app.use(express.json())
app.use(cors())

//db connection
const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT_NO, () => {
      console.log(`Running at http://localhost:${PORT_NO}`);
    });
  } catch (error) {
    console.error("DB connection failed:", error);
    process.exit(1);
  }
};

startServer();

app.get("/", (req, res) => {
    res.send("API working well")
})

//api end points
app.use("/api/food", foodRouter)
app.use("/images", express.static("uploads"))
app.use("/api/user", userRouter)
app.use("/api/cart", cartRouter)
app.use("/api/order", orderRouter)

//mongodb+srv://abhishekgore1706:<db_password>@cluster0.bmlsfvl.mongodb.net