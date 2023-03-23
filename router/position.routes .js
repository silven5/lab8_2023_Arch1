// import express from "express";
// import exports from "../controller/position.controller";
const express = require('express')
// Створюємо новий маршрутизатор
const router = express.Router()

const positionController = require('../controller/position.controller');
// Перегляд всіх відділів
router.get('/', positionController.findAll);
// Створення нового відділу
router.post('/', positionController.create);
// Пошук відділу за id
router.get('/:id', positionController.findById);
// Редагування відділу id
// !router.put('/:id', positionController.update);
router.post('/put/:id', positionController.update)
// Видалення відділу за id
// !router.delete('/:id', positionController.delete);
router.get('/delete/:id', positionController.delete);
// Експортуємо за замовченням router
module.exports = router
