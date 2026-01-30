const { getAll, getOne, add, remove, update } = require('../model/tasks_M');

async function getAllTasks(req, res) {
    try {
        if (!req.user || !req.user.id) return res.status(401).json({ message: "Unauthorized" });

        let tasks = await getAll(req.user.id);
        res.status(200).json(tasks || []);
    } catch (err) {
        console.error("Error in getAllTasks:", err);
        res.status(500).json({ message: "Server error" });
    }
}

async function getTask(req, res) {
    try {
        const taskId = req.params.id;
        let task = await getOne(taskId, req.user.id);
        if (!task) return res.status(404).json({ message: "Task not found" });
        res.status(200).json(task);
    } catch (err) {
        console.error("Error in getTask:", err);
        res.status(500).json({ message: "Server error" });
    }
}

async function addTask(req, res) {
    try {
        const text = req.body.text;
        const userId = req.user.id;
        const categoryId = req.body.CategoryID || null; 

        if (!text) return res.status(400).json({ message: "Task text is required" });

        let taskId = await add({ text, userId, categoryId });
        
        res.status(201).json({ message: "Task added successfully", taskId });
    } catch (err) {
        console.error("Error in addTask:", err);
        res.status(500).json({ message: "Server error" });
    }
}

async function deleteTask(req, res) {
    try {
        let id = req.params.id;
        let affectedRows = await remove(id, req.user.id);
        if (affectedRows === 0) return res.status(404).json({ message: "Task not found" });
        res.status(200).json({ message: "Task deleted successfully" });
    } catch (err) {
        console.error("Error in deleteTask:", err);
        res.status(500).json({ message: "Server error" });
    }
}

async function updateTask(req, res) {
    try {
        const taskId = req.params.id;
        const userId = req.user.id;
        const { text, isDone, CategoryID } = req.body;

        const dataToUpdate = {};
        if (text !== undefined) dataToUpdate.text = text;
        if (isDone !== undefined) dataToUpdate.isDone = isDone;
        if (CategoryID !== undefined) dataToUpdate.categoryId = CategoryID;

        const affectedRows = await update(taskId, userId, dataToUpdate);

        if (affectedRows === 0)
            return res.status(404).json({ message: `Task ${taskId} not found` });

        res.status(200).json({ message: "Task updated successfully" });
    } catch (err) {
        console.error("Error in updateTask:", err);
        res.status(500).json({ message: "Server error" });
    }
}

module.exports = {
    getAllTasks,
    getTask,
    addTask,
    deleteTask,
    updateTask
};
