import mongoose from "mongoose";
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
    videoUrl:{
        type:String
    }
})
const File = mongoose.model("File", fileSchema)
export default File