const express = require('express');
const router = express.Router();
const ToDo = require('../models/toDo');

// GET all to-dos with dynamic sorting and filtering
router.get('/toDo', async (req, res) => {
    try {
        const { sortBy = 'createdAt', sortOrder = 'asc', ...filters } = req.query;

        // Construct the sort object dynamically
        const sortOptions = {};
        sortOptions[sortBy] = sortOrder === 'asc' ? 1 : -1;

        // Find with dynamic filters and sort
        const toDos = await ToDo.find(filters).sort(sortOptions);
        res.status(200).json(toDos);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message});
    }
});

// CREATE a to-do
router.post('/toDo', async (req, res) => {
    try {
        const toDo = await ToDo.create(req.body);
        res.status(200).json(toDo);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message});
    }
});

// DELETE a to-do by ID
router.delete('/toDo/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletedToDo = await ToDo.findByIdAndDelete(id);
        if (!deletedToDo) {
            return res.status(404).json({message: 'To-Do not found'});
        }
        res.status(200).json(deletedToDo);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message});
    }
});

// UPDATE a to-do by ID
router.patch('/toDo/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updatedToDo = await ToDo.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedToDo) {
            return res.status(404).json({message: 'To-Do not found'});
        }
        res.status(200).json(updatedToDo);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message});
    }
});


module.exports = router;