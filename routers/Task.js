const express = require('express');
const router = express.Router();
const TaskModel = require("../models/Task");

function convertStringToDate(stringDate) {
    var arr = stringDate.split('-');
    var year = parseInt(arr[2]);
    var month = parseInt(arr[1]) - 1;
    var date = parseInt(arr[0]) + 1;
    return new Date(year, month, date);
}

router.get('/', (req, res, next) => {
    TaskModel.find({})
    .then(data => {
        res.json({
            message: 'Task List',
            data: data
        });
    })
    .catch(err => {
        res.status(500).json(err);
    })
});

router.get('/:id', (req, res, next) => {
    TaskModel.findOne({
        _id: req.params.id
    })
    .then(data => {
        res.json({
            message: 'Task detail',
            data: data
        });
    })
    .catch(err => {
        res.status(500).json(err);
    })
});

router.post('/', (req, res, next) => {
    var title = req.body.title;
    var description = req.body.description;
    var deadline = req.body.deadline;
    var member = req.body.member;
    var status = req.body.status;

    TaskModel.create({
        title: title,
        description: description,
        deadline: convertStringToDate(deadline),
        member: member,
        status: status
    })
    .then(data => {
        res.json({
            message: 'Create ok',
            data: data
        });
    })
    .catch(err => {
        res.status(500).json(err);
    })
});

router.put('/:id', (req, res, next) => {
    var id = req.params.id;
    var newData = {};
    if (req.body.title) newData.title = req.body.title;
    if (req.body.description) newData.description = req.body.description;
    if (req.body.deadline) newData.deadline = convertStringToDate(req.body.deadline);
    if (req.body.member) newData.member = req.body.member;
    if (req.body.status) newData.status = req.body.status;

    TaskModel.updateOne({ _id: id }, newData)
    .then(data => {
        res.json({
            message: 'Update ok',
            data: data
        });
    })
    .catch(err => {
        res.status(500).json(err);
    });
});

router.delete('/:id', (req, res, next) => {
    TaskModel.deleteOne({
        _id: req.params.id
    })
    .then(data => {
        res.json({
            message: 'Delete ok'
        });
    })
    .catch(err => {
        res.status(500).json(err);
    });
});

module.exports = router;