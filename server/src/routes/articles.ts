import express, { Request, Response } from 'express';
import Article from '../models/Article';

const router = express.Router();

// GET all articles (sorted by timestamp descending)
router.get('/', async (req: Request, res: Response) => {
    try {
        const articles = await Article.find().sort({ timestamp: -1 });
        res.json(articles);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching articles', error });
    }
});

// POST create new article
router.post('/', async (req: Request, res: Response) => {
    try {
        const { title, content } = req.body;

        if (!title || !title.trim()) {
            return res.status(400).json({ message: 'Title is required' });
        }

        if (!content || !content.trim()) {
            return res.status(400).json({ message: 'Content is required' });
        }

        const wordCount = content.trim().split(/\s+/).length;

        const newArticle = new Article({
            title,
            content,
            author: 'mohan',
            wordCount,
            timestamp: new Date()
        });

        const savedArticle = await newArticle.save();
        res.status(201).json(savedArticle);
    } catch (error) {
        res.status(500).json({ message: 'Error creating article', error });
    }
});

export default router;
