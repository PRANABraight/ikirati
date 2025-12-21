import { Router } from 'express';
import {
    getAllStories,
    getStoryById,
    getMyStories,
    createStory,
    updateStory,
    deleteStory,
    storyValidation
} from '../controllers/storiesController';
import { authenticateJWT } from '../middleware/authMiddleware';
import { requireAuth } from '../middleware/roleMiddleware';

const router = Router();

// Public routes
router.get('/', getAllStories);
router.get('/:id', getStoryById);

// Protected routes (require authentication)
router.get('/user/me', authenticateJWT, requireAuth, getMyStories);
router.post('/', authenticateJWT, requireAuth, storyValidation, createStory);
router.put('/:id', authenticateJWT, requireAuth, storyValidation, updateStory);
router.delete('/:id', authenticateJWT, requireAuth, deleteStory);

export default router;
