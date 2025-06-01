const cloudinary = require('cloudinary').v2;

exports.uploadMediaToCloudinary = async (url,folder) => {
    try {
        const uploadedImage = await cloudinary.uploader.upload(url,{folder,type: 'upload',resource_type: 'image'});
        return uploadedImage;
    } catch(err) {
        console.log(`error in uploadMediaToCloudinary`);
        console.log(`Error while uploading media in cloudinary`);
        console.log(err.message);
        throw err;
    }
};