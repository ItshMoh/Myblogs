import express, { Request, Response } from 'express';
import Post from '../models/Post';

const router = express.Router();

// GET all posts (sorted by timestamp descending)
router.get('/', async (req: Request, res: Response) => {
    try {
        const posts = await Post.find().sort({ timestamp: -1 });
        res.json(posts);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching posts', error });
    }
});

// POST create new post
router.post('/', async (req: Request, res: Response) => {
    try {
        const { content } = req.body;

        if (!content || !content.trim()) {
            return res.status(400).json({ message: 'Content is required' });
        }

        const newPost = new Post({
            content,
            userId: 'mohan',
            userName: 'mohan',
            timestamp: new Date()
        });

        const savedPost = await newPost.save();
        res.status(201).json(savedPost);
    } catch (error) {
        res.status(500).json({ message: 'Error creating post', error });
    }
});

export default router;
