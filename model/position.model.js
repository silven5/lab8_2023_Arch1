// Підключення до БД
var connection = require('../config/config.bd');
// Функція для створення об'єкту Position
var Position = function (position) {
    this.id_posad = position.Id_posad;
    this.naz_posad = position.Naz_posad;
    this.oklad = position.Oklad
}
// Створення нового запису у БД
// newDep - об'єкт департамент зі значеннями які створюються
// result - результат свторення
Position.create = function (newPos, result) {
    connection.query("INSERT INTO dovid_posad set ?", newPos, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            console.log(res.insertId);
            result(null, res.insertId);
        }
    });
};
// Пошук у таблиці за id
//id - значення id відділу
// result - результат запиту з пошуку
Position.findById = function (id, result) {
    connection.query("Select * from dovid_posad where id_posad = ? ", id,
        function (err, res) {
            if (err) {
                console.log("error: ", err);
                result(err, null);
            }
            else {
                result(null, res);
            }
        });
};
// Виведення усіх департаментів, що є у таблиці
// result - результат запиту
Position.findAll = function (result) {
    connection.query("Select * from dovid_posad",
        function (err, res) {
            if (err) {
                console.log("error: ", err);
                result(null, err);
            }
            else {
                console.log('Position : ', res);
                result(null, res);
            }
        });
};
// Зміна запису з певним id у БД 
//id - значення id відділу
// dep - значення що змінюється включає назву відділу
// result - результат запиту
Position.update = function (id, pos, result) {
    connection.query("UPDATE dovid_posad SET Naz_posad=?, Oklad=? WHERE id_posad = ?",
        [pos.naz_posad, pos.oklad, id],
        function (err, res) {
            if (err) {
                console.log("error: ", err);
                result(null, err);
            } else {
                result(null, res);
            }
        });
};
// Видалення запису з певним id у БД
//id - значення id відділу
// result - результат запиту
Position.delete = function (id, result) {
    connection.query("DELETE FROM dovid_posad WHERE id_posad = ?", [id],
        function (err, res) {
            if (err) {
                console.log("error: ", err);
                result(null, err);
            }
            else {
                result(null, res);
            }
        });
};
// Вказуємо, що експортуємо з модуля Position
module.exports = Position;