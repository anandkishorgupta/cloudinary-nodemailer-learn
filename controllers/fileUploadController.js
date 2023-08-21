import path from 'path';
import { fileURLToPath } from 'url';
// localfileupload handler function
export const localFileUpload = async (req, res) => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    try {
        // fetch file
        const file = req.files.file;
        console.log(file)
        let filePath = path.join(__dirname, 'files', `${Date.now()}.${file.name.split(".")[1]}`); //filePath --- files  is folder name  
        file.mv(filePath, (err) => {
            if (err) {
                console.log(err)
            }    
        })
        res.json({
            success: true,
            message: "local file uploaded successfully"
        })
    } catch (error) {
        console.log(error)
    }

}