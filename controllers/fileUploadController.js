import { v2 as cloudinary } from 'cloudinary';
import path from 'path';
import { fileURLToPath } from 'url';
import File from '../models/FileModel.js';
// localfileupload handler function
export const localFileUpload = async (req, res) => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    try {
        // fetch file from request
        const file = req.files.file;
        console.log(file)
        // create path where to store the file 
        let filePath = path.join(__dirname, 'files', `${Date.now()}.${file.name.split(".")[1]}`); //filePath --- files  is folder name  
        file.mv(filePath, (err) => {
            if (err) {
                console.log(err)
            }
        })
        // creating a successfull response
        res.json({
            success: true,
            message: "local file uploaded successfully"
        })
    } catch (error) {
        console.log(error)
    }

}
function isFileTypeSupported(type, supportedType) {
    return supportedType.includes(type)
}
// upload file to cloudinary
async function uploadFileToCloudinary(file, folder, quality) {
    const options = { folder: folder }
    if (quality) {
        options.quality = quality
    }
    options.resource_type = "auto"
    return await cloudinary.uploader.upload(file.tempFilePath, options)
}
// image upload to cloudinary
export const imageUpload = async (req, res) => {
    try {
        // data fetch
        const { name, tags, email } = req.body;
        console.log(name, tags, email)
        const file = req.files.imageFile
        console.log(file)
        // validation
        const supportedType = ["jpg", "jpeg", "png"];
        const fileType = file.name.split(".")[1].toLowerCase();

        if (!isFileTypeSupported(fileType, supportedType)) {
            return res.status(404).json({
                success: false,
                message: "file format not supported "
            })
        }
        const response = await uploadFileToCloudinary(file, "coding") //coding is folder name 
        console.log(response)
        // save to db
        const fileData = await File.create({
            name, tags, email, imageUrl: response.secure_url
        })
        res.json({
            success: true,
            message: "image uploaded successfully",
            imageUrl: response.secure_url

        })
    } catch (error) {
        console.log(error)
        res.status(400).json({
            success: "false",
            message: "something went wrong"
        })
    }
}


// video upload handler
export const videoUpload = async (req, res) => {
    try {
        // data fetch
        const { name, tags, email } = req.body
        console.log(name, tags, email)
        const file = req.files.videoFile
        console.log("file", file)
        // validation
        const supportedType = ["mp4", "mov"]
        const fileType = file.name.split(".")[1].toLowerCase()
        if (!isFileTypeSupported(fileType, supportedType)) {
            return res.status(400).json({
                success: false,
                message: "file format not supported"
            })
        }
        // upload to cloudinary
        const response = await uploadFileToCloudinary(file, "coding")
        console.log(response)
        // save to db
        const fileData = new File({
            name, email, tags,
            videoUrl: response.secure_url
        })
        await fileData.save()
        res.status(200).json({
            name, tags, email, videoUrl: response.secure_url
        })

    } catch (error) {
        console.error(error);
        res.status(400).json({
            success: "false",
            message: "something went wrong"
        })
    }
}


// IMAGE SIZE REDUCER
export const imageSizeReducer = async (req, res) => {
    try {
        const { name, tags, email } = req.body
        console.log(name, tags, email)
        const file = req.files.imageFile

        const fileType = file.name.split(".")[1].toLowerCase();
        // validation
        const supportedType = ["jpg", "jpeg", "png"]
        if (!isFileTypeSupported(fileType, supportedType)) {
            return res.status(400).json({
                success: false,
                message: "file type not supported"
            })

        }
        const response = await uploadFileToCloudinary(file, "coding", 30)
        const fileData = new File({
            name, email, tags, imageUrl: response.secure_url
        })
        fileData.save()
        res.status(200).json({
            success: true,
            message: "uploaded to database successfully",
            imageUrl: response.secure_url
        })

    } catch (error) {
        console.log(error)
        res.json({
            success: false,
            message: "error occurred "
        })
    }
}


// handle image compress by height -- remaining

//limit the size of file upload -- remaining 