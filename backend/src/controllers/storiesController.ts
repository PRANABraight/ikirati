import { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { Story } from '../models/Story';

// Validation middleware for creating/updating stories
export const storyValidation = [
    body('title').trim().notEmpty().withMessage('Title is required'),
    body('text').trim().notEmpty().withMessage('Story text is required'),
    body('image').optional().trim().isURL().withMessage('Image must be a valid URL'),
    body('author').optional().trim(),
    body('link').optional().trim().isURL().withMessage('Link must be a valid URL'),
];

// Get all stories (public)
export async function getAllStories(req: Request, res: Response) {
    try {
        const stories = await Story.findAll();
        res.json(stories);
    } catch (err) {
        console.error('Get stories error:', err);
        res.status(500).json({ error: 'Failed to fetch stories' });
    }
}

// Get single story (public)
export async function getStoryById(req: Request, res: Response) {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ error: 'Invalid story ID' });
        }

        const story = await Story.findById(id);
        if (!story) {
            return res.status(404).json({ error: 'Story not found' });
        }

        res.json(story);
    } catch (err) {
        console.error('Get story error:', err);
        res.status(500).json({ error: 'Failed to fetch story' });
    }
}

// Get current user's stories
export async function getMyStories(req: Request, res: Response) {
    try {
        const user = req.user as { id: number };
        const stories = await Story.findByUserId(user.id);
        res.json(stories);
    } catch (err) {
        console.error('Get my stories error:', err);
        res.status(500).json({ error: 'Failed to fetch stories' });
    }
}

// Create a new story (authenticated)
export async function createStory(req: Request, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const user = req.user as { id: number };
        const { title, text, image, author, link } = req.body;

        const story = await Story.create({
            title,
            text,
            image,
            author,
            link,
            user_id: user.id
        });

        res.status(201).json(story);
    } catch (err) {
        console.error('Create story error:', err);
        res.status(500).json({ error: 'Failed to create story' });
    }
}

// Update a story (owner or admin only)
export async function updateStory(req: Request, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ error: 'Invalid story ID' });
        }

        const user = req.user as { id: number; role: string };
        const story = await Story.findById(id);

        if (!story) {
            return res.status(404).json({ error: 'Story not found' });
        }

        // Check ownership or admin
        if (story.user_id !== user.id && user.role !== 'admin') {
            return res.status(403).json({ error: 'You can only edit your own stories' });
        }

        const { title, text, image, author, link } = req.body;
        const updated = await Story.update(id, { title, text, image, author, link });

        if (!updated) {
            return res.status(400).json({ error: 'No fields to update' });
        }

        const updatedStory = await Story.findById(id);
        res.json(updatedStory);
    } catch (err) {
        console.error('Update story error:', err);
        res.status(500).json({ error: 'Failed to update story' });
    }
}

// Delete a story (owner or admin only)
export async function deleteStory(req: Request, res: Response) {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ error: 'Invalid story ID' });
        }

        const user = req.user as { id: number; role: string };
        const story = await Story.findById(id);

        if (!story) {
            return res.status(404).json({ error: 'Story not found' });
        }

        // Check ownership or admin
        if (story.user_id !== user.id && user.role !== 'admin') {
            return res.status(403).json({ error: 'You can only delete your own stories' });
        }

        await Story.delete(id);
        res.json({ message: 'Story deleted successfully' });
    } catch (err) {
        console.error('Delete story error:', err);
        res.status(500).json({ error: 'Failed to delete story' });
    }
}
