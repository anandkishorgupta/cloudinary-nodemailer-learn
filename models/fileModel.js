import dotenv from "dotenv";
import mongoose from "mongoose";
import nodemailer from "nodemailer";
dotenv.config()
const fileSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String
    },
    tags: {
        type: String
    },
    email: {
        type: String
    },
    videoUrl: {
        type: String
    }
})
// post middleware 
fileSchema.post("save", async function (doc) {
    try {
        console.log(doc)
        // transporter
        const transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: 465,
            secure: true,
            auth: {
                // TODO: replace `user` and `pass` values from <https://forwardemail.net>
                user: MAIL_USER,
                pass: MAIL_PASS,
            },
        });
        //   send mail
        const info = await transporter.sendMail({
            from: "Company name", // sender address
            to: doc.email, // list of receivers
            subject: "new file uploaded on cloudinary", // Subject line
            // text: "Hello world?", // plain text body
            html: `<b>file uploaded to cloudinary</b> view here: <a href="${doc.imageUrl}">${doc.imageUrl}</a>`, // html body
        });


    } catch (error) {
        console.log(error)
    }
})
const File = mongoose.model("File", fileSchema)
export default File