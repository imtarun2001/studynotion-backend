const cloudinary = require('cloudinary').v2;

exports.uploadMediaToCloudinary = async (url,file,folder) => {
    try {
        const options = {
            folder,
            resource_type: 'auto',
            type: url ? 'upload' : null
        }
        return await cloudinary.uploader.upload(url ? url : file.tempFilePath,options);
    } catch(err) {
        console.log(`error in uploadMediaToCloudinary`);
        console.log(`Error while uploading media in cloudinary`);
        console.log(err.message);
        throw err;
    }
};