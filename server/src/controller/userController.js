const user = require('../model/user');
const todo = require('../model/todo');



const getTodo = async (req, res) => {
    try {
        const { id } = req.params;
        const exUser = await user.findById(id);
        if (!exUser) {
            return res.status(400).send({ message: "no such user", success: false });
        }
        const exTodo = await todo.find({ user: exUser._id });

        exTodo.forEach(async (todo) => {
            if (todo.time < new Date()) {
                todo.status = 'uncompleted';
                todo.save();
            }
        })

        res.status(200).send({ todo: exTodo, success: true });
    }
    catch (err) {
        res.status(500).send({ error: err, success: false })
    }
};

const addTodo = async (req, res) => {
    try {
        const { id } = req.params
        const {
            title,
            description,
            priority,
            time,
        } = req.body;
        console.log(time)
        const exuser = await user.findById(id);
        if (!exuser) {
            res.status(400).send({ message: "no such user", success: false });
        }

        const newTodo = new todo({
            user: exuser._id,
            title: title,
            description: description,
            priority: priority,
            time: time,
        })

        newTodo.save();
        res.status(200).send({ message: "todo added successfully", success: true });
    }
    catch (err) {
        res.status(500).send({ error: err, success: false })
    }
}

const updateTodo = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            title,
            description,
            priority,
            status
        } = req.body;

        const exTodo = await todo.findById(id);
        if (!exTodo) {
            return res.status(400).send({ message: "no such todo", success: false });
        }
        
        if (exTodo.time < new Date()) {
            exTodo.status = 'uncompleted';
            exTodo.save();
        }
        
        if (exTodo.status == 'uncompleted') {
            exTodo.status = exTodo.status;
            return res.status(200).send({ message: "can't change time up", success: true });
        }

        exTodo.status = status;
        exTodo.title = title;
        exTodo.description = description;
        exTodo.priority = priority;
        exTodo.save();
        res.status(200).send({ message: "todo updated successfully", success: true });
    }
    catch (err) {
        res.status(500).send({ error: err, success: false })
    }
};

const removeTodo = async (req, res) => {
    try {
        const { id } = req.params;
        const exTodo = await todo.findById(id);
        if (!exTodo) {
            return res.status(400).send({ message: "no such todo", success: false });
        }
        exTodo.remove();
        res.status(200).send({ message: "todo removed successfully", success: true });
    }
    catch (err) {
        res.status(500).send({ error: err, success: false })
    }
}

module.exports = {
    getTodo,
    addTodo,
    updateTodo,
    removeTodo
}