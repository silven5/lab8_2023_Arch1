// !Додаємо для виведення
const express = require('express')
var app = express();
var path = require('path');
app.engine('ejs', require('ejs').__express);
const Position = require('../model/position.model');
// Виведення всій інформації з таблиці
exports.findAll = function (req, res) {
    Position.findAll(function (err, position) {
        console.log('controller')
        if (err)
            res.send(err);
        // !З'єднуємо з файлом виведення
        res.render('position.ejs', { Position: position });
        // res.send(position);

    });
};

// Створення нового запису
exports.create = function (req, res) {
    const new_position = new Position(req.body);
    //handles null error
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.status(400).send({ error: true, message: 'Please provide all required field' });
    } else {
        Position.create(new_position, function (err, position) {
            if (err)
                res.send(err);
            // !Переходимо на сторинку з таблицей відділів
            res.redirect('/api/position')
        });
    }
};
// Пошук за id
exports.findById = function (req, res) {
    Position.findById(req.params.id, function (err, position) {
        if (err)
            res.send(err);
        // !Перехід на сторінку редагування
        res.render('position_edit.ejs', { Position: position });
        // res.json(position);
    });
};
// редагування інформації
exports.update = function (req, res) {
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.status(400).send({ error: true, message: 'Please provide all required field' });
    } else {
        Position.update(req.params.id, new Position(req.body), function (err, position) {
            if (err)
                res.send(err);
            // !Повернення на сторінку з таблицею відділів
            res.redirect('/api/position')
            // res.json({ error: false, message: 'position successfully updated' });
        });
    }
};
// видалення інформації
exports.delete = function (req, res) {
    Position.delete(req.params.id, function (err, position) {
        console.log("HI" + req.params.id);
        if (err)
            res.send(err);
        res.redirect('/api/position')
        // res.json({ error: false, message: 'position successfully deleted' });
    });
};
