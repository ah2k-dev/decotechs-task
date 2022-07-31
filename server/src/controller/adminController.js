const user = require("../model/user");
const todo = require("../model/todo");

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
        todo.status = "uncompleted";
        todo.save();
      }
    });

    res.status(200).send({ todo: exTodo, success: true });
  } catch (err) {
    res.status(500).send({ error: err, success: false });
  }
};
const getUsers = async (req, res) => {
  try {
    const allUsers = await user.find();
    res.status(200).send({ user: allUsers, success: true });
  } catch (err) {
    res.status(500).send({ error: err, success: false });
  }
};
const giveRemarks = async (req, res) => {
  try {
    const { id } = req.params;
    const { remarks } = req.body;
    const exTodo = await todo.findById(id);
    if (!exTodo) {
      return res.status(400).send({ message: "no such todo", success: false });
    }
    exTodo.remarks = remarks;
    exTodo.save();
    res
      .status(200)
      .send({ message: "remarks added successfully", success: true });
  } catch (err) {
    res.status(500).send({ error: err, success: false });
  }
};

module.exports = {
  getUsers,
  getTodo,
  giveRemarks,
};
