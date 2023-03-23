// import express from "express";
// import exports from "../controller/departament.controller";
const express = require('express')
// Створюємо новий маршрутизатор
const router = express.Router()

const departamentController = require('../controller/departament.controller');
// Перегляд всіх відділів
router.get('/', departamentController.findAll);
// Створення нового відділу
router.post('/', departamentController.create);
// Пошук відділу за id
router.get('/:id', departamentController.findById);
// Редагування відділу id
// !router.put('/:id', departamentController.update);
router.post('/put/:id', departamentController.update)
// Видалення відділу за id
// !router.delete('/:id', departamentController.delete);
router.get('/delete/:id', departamentController.delete);
// Експортуємо за замовченням router
module.exports = router
