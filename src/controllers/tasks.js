import { getAllTasks, createTask, deleteTask } from "../services/tasks.js";

// handlers
const getAll = async (req, res) => {
    const data = await getAllTasks();
    res.send(data);
}

const create = async (req, res) => {
    const desc = req.body.desc;
    try {
        const data = await createTask(desc);
        res.send(data);
    } catch (err) {
        res.status(500).send({ message: err })
    }
}

const deleteOne = async (req, res) => {
    const id = req.body.id;

    try {
        if (!Number.isInteger(id)) {
            throw 'Wrong id number';
        }
        const result = await deleteTask(id);
        res.send({ removed: result });
    } catch (err) {
        res.status(500).send({ message: err })
    }
}

export { create, getAll, deleteOne }