// !Додаємо для виведення
const express = require('express')
var app = express();
var path = require('path');
app.engine('ejs', require('ejs').__express);
const Departament = require('../model/departament.model');
// Виведення всій інформації з таблиці
exports.findAll = function (req, res) {
    Departament.findAll(function (err, departament) {
        console.log('controller')
        if (err)
            res.send(err);
        // !З'єднуємо з файлом виведення
        res.render('departament.ejs', { Departament: departament });
        // res.send(departament);

    });
};

// Створення нового запису
exports.create = function (req, res) {
    const new_departament = new Departament(req.body);
    //handles null error
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.status(400).send({ error: true, message: 'Please provide all required field' });
    } else {
        Departament.create(new_departament, function (err, departament) {
            if (err)
                res.send(err);
            // !Переходимо на сторинку з таблицей відділів
            res.redirect('/api/departament')
        });
    }
};
// Пошук за id
exports.findById = function (req, res) {
    Departament.findById(req.params.id, function (err, departament) {
        if (err)
            res.send(err);
        // !Перехід на сторінку редагування
        res.render('departament_edit.ejs', { Departament: departament });
        // res.json(departament);
    });
};
// редагування інформації
exports.update = function (req, res) {
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.status(400).send({ error: true, message: 'Please provide all required field' });
    } else {
        Departament.update(req.params.id, new Departament(req.body), function (err, departament) {
            if (err)
                res.send(err);
            // !Повернення на сторінку з таблицею відділів
            res.redirect('/api/departament')
            // res.json({ error: false, message: 'departament successfully updated' });
        });
    }
};
// видалення інформації
exports.delete = function (req, res) {
    Departament.delete(req.params.id, function (err, departament) {
        console.log("HI" + req.params.id);
        if (err)
            res.send(err);
        res.redirect('/api/departament')
        // res.json({ error: false, message: 'departament successfully deleted' });
    });
};
