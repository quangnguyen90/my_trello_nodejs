const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/my_trello_nodejs', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

var Schema = mongoose.Schema;

var taskSchema = new Schema({
    title:  String,
    description: String,
    deadline:   Date,
    member: String,
    status: String
}, {
    collection: "task"
});

var TaskModel = mongoose.model('task', taskSchema);

module.exports = TaskModel;