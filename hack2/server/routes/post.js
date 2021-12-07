import express from 'express'
import Post from '../models/post'
import moment from 'moment'

const router = express.Router()

// TODO 2-(1): create the 1st API (/api/allPosts)
router.get('/allPosts', async (_, res) => {
    var Posts;
    var responseMessage = '';
    try{
        Posts = await Post.find().sort( { timestamp: -1 } );
        responseMessage = "success";
        // console.log(Posts)
        if(Posts.length === 0){
            Posts = null;
            responseMessage = "error";
            res.status(403).json({ data: Posts, message: responseMessage});
        }
    }catch(e){
        Posts = null;
        responseMessage = "error";
        res.status(403).json({ data: Posts, message: responseMessage});
        throw new Error("Database get allpost failed"); 
    }
    res.json({ data: Posts, message: responseMessage});
});
// TODO 3-(1): create the 2nd API (/api/postDetail)
router.get('/postDetail', async (req, res) => {
    var aPost;
    var responseMessage = '';
    try{
        aPost = await Post.find({postId: req.query.pid});
        responseMessage = "success";
        console.log(aPost)
        if(aPost.length === 0){
            aPost = null;
            responseMessage = "error";
            res.status(403).json({ post: aPost, message: responseMessage});
        }
    }catch(e){
        aPost = null;
        responseMessage = "error";
        res.status(403).json({ post: aPost, message: responseMessage});
        throw new Error("Database get allpost failed"); 
    }
    res.json({ post: aPost[0], message: responseMessage});
});
// TODO 4-(1): create the 3rd API (/api/newPost)
router.post('/newPost', async (req, res) => {
    console.log(req.body)
    var aPost;
    var responseMessage = '';
    try{
        aPost = await Post.create({postId: req.body.postId, title: req.body.title, content: req.body.content, timestamp: req.body.timestamp});
        responseMessage = "success";
        console.log(aPost);
    }catch(e){
        responseMessage = "error";
        res.status(403).json({message: responseMessage, post: null});
        throw new Error("Database get allpost failed"); 
    }
    res.json({message: responseMessage});
});
// TODO 5-(1): create the 4th API (/api/post)
router.delete('/post', async (req, res) => {
    console.log('why')
    console.log(req.body)
    var aPost;
    var responseMessage = '';
    try{
        aPost = await Post.deleteOne({postId: req.query.pid});
        responseMessage = "success";
        console.log(aPost);
    }catch(e){
        responseMessage = "error";
        res.status(403).json({message: responseMessage, post: null});
        throw new Error("Database get allpost failed"); 
    }
    res.json({message: responseMessage});
});
export default router