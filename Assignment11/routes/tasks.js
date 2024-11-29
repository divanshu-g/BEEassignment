const express = require('express');
const Task = require('../models/Task');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// Create Task
router.post('/', authMiddleware, async (req, res, next) => {
    try {
        const { title, description } = req.body;
        const newTask = new Task({ userId: req.user.userId, title, description });
        await newTask.save();
        res.status(201).json({ message: 'Task created successfully', task: newTask });
    } catch (error) {
        next(error);
    }
});

// Get Tasks
router.get('/', authMiddleware, async (req, res, next) => {
    try {
        const { page = 1, limit = 10, search, sort } = req.query;

        const query = { userId: req.user.userId, deleted: false };
        if (search) query.$or = [{ title: new RegExp(search, 'i') }, { description: new RegExp(search, 'i') }];

        const tasks = await Task.find(query)
            .sort(sort === 'status' ? { status: 1 } : { createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(Number(limit));
        res.status(200).json(tasks);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
