import Post from "../model/postModel.js";


export const addPost = async (req, res)=>{
    try {
        const {title, content, image} = req.body;
        const userId = req.user.id;

        let imageUrl;

        // Check if a file was uploaded
        if (req.file) {
            // Encode the image to base64 format
            const encodeImage = `data:image/png;base64,${req.file.buffer.toString("base64")}`;

            // Upload the image to Cloudinary
            try {
            const cloudinaryUpload = await cloudinary.uploader.upload(encodeImage, {
                resource_type: "image", // Specify the type as an image
                encoding:'base64'
            });
            imageUrl = cloudinaryUpload.secure_url; // Use the URL of the uploaded image
            } catch (error) {
            return res.status(500).json({ message: "Error uploading image to Cloudinary.", error });
            }
        }
        const newPost = await Post.create({title,content,image,userId});
        res.status(201).json({message: "Post added successfully", post: newPost});
    } catch (error) {
        console.log("Error in adding post:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const getPosts = async (req, res)=>{
    try {
        const posts = await Post.find();
        res.status(200).json({posts});
    } catch (error) {
       console.log("Error in fetching posts:", error);
       res.status(500).json({ message: "Internal Server Error" }); 
    }
}

export const getPostById = async (req, res)=>{
    try {
        const postId = req.params.id;
        const post = await Post.findById(postId);
        if(!post){
            return res.status(404).json({message: "Post not found"});
        }
        res.status(200).json({post});
    } catch (error) {
        console.log("Error in fetching post by ID:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const deletePost = async (req, res)=>{
    try {
        const postId = req.params.id;
        const deletedPost = await Post.findByIdAndDelete(postId);
        if(!deletedPost){
            return res.status(404).json({message: "Post not found"});
        }
        res.status(200).json({message: "Post deleted successfully"});
    } catch (error) {
        console.log("Error in deleting post:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const updatePost = async (req, res)=>{
    try {
        const postId = req.params.id;
        const {title, content, image} = req.body;
        const updatedPost = await Post.findByIdAndUpdate(
            postId,
            {title, content, image},
            {new: true}
        );
        if(!updatedPost){
            return res.status(404).json({message: "Post not found"});
        }
        res.status(200).json({message: "Post updated successfully", post: updatedPost});
    } catch (error) {
        console.log("Error in updating post:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}