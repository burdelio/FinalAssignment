import Task from "../models/task.js"

const getAllTasks = async () => {
    const data = await Task.findAll();
    return data;
}

const createTask = async (iDesc, iAge, iLoc) => {
    const task = {
        desc: iDesc,
        age: iAge,
        location: iLoc,
        done: false,
    }

    try {
        const data = await Task.create(task);
        return data;
    } catch (err) {
        throw err.message || 'Unknown error occured during task creation'
    }
}

const deleteTask = async (id) => {
    try {
        const result = await Task.destroy({
            where: { id: id }
        });
        return Boolean(result);
    } catch (err) {
        throw err.message || 'Unknown error occured during task deletion'
    }
}

export { createTask, getAllTasks, deleteTask }