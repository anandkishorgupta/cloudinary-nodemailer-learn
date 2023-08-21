import dotenv from "dotenv";
import express from "express";
import fileUpload from "express-fileupload";
import { cloudinaryConnect } from "./config/cloudinary.js";
import { connectDB } from "./config/database.js";
import fileUploadRoute from "./routes/fileUploadRoute.js";
const app = express();
app.use(fileUpload())
app.use(express.json())
dotenv.config()
const PORT = process.env.PORT || 3000
cloudinaryConnect()
// route mount
app.use("/api/v1/upload",fileUploadRoute)
// connect to db and server listen
const connectServer = async () => {
    try {
        await connectDB();
        app.listen(PORT, () => {
            console.log("server is running on port ", PORT)

        })

    } catch (error) {
console.log(error)
    }
}                          
connectServer();
