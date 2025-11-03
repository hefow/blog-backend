import express from 'express';
import { addPost, deletePost, getPostById, getPosts, updatePost } from '../controller/postController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/add',protect, addPost);
router.get('/', getPosts);
router.get('/:id', getPostById);
router.delete('/:id', deletePost);
router.put('/:id', updatePost);

export default router;
