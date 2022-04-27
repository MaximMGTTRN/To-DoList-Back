const Task = require("../../db/models/task/index.js");

module.exports.getAllTasks = (req, res) => {
  Task.find().then((result) => {
    res.send({ data: result });
  });
};

module.exports.createNewTask = (req, res) => {
  if (req.body) {
    const { body } = req;
    if (body.hasOwnProperty("text") && body.hasOwnProperty("isCheck")) {
      const task = new Task(req.body);
      task.save().then((result) => {
        Task.find().then((result) => {
          res.send({ data: result });
        });
      });
    } else {
      res.status(422).send("Error! Wrong body");
    }
  } else {
    res.status(422).send("Error! This is not body!");
  }
};

module.exports.changeTaskInfo = (req, res) => {
  if (req.body) {
    const { body } = req;
    if (
      body.hasOwnProperty("_id") &&
      (body.hasOwnProperty("text") || body.hasOwnProperty("isCheck"))
    ) {
      Task.updateOne({ _id: body._id }, body).then(() => {
        Task.find().then((result) => {
          res.send({ data: result });
        });
      });
    } else {
      res.status(422).send("Error! Wrong body");
    }
  } else {
    res.status(422).send("Error! This is not body!");
  }
};

module.exports.deleteTask = (req, res) => {
  const id = req.query._id;
  if (!id) return res.status(422).send("Error! Write correct Id");
  Task.deleteOne({ _id: id })
    .then(() => {
      Task.find().then((result) => {
        res.send({ data: result });
      });
    })
    .catch(() => {
      res.status(422).send("Error! Id can not be deleted");
    });
};
