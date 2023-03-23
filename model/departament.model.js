// Підключення до БД
var connection = require('./../config/config.bd');
// Функція для створення об'єкту Departament
var Departament = function (departament) {
    this.id_viddil = departament.Id_viddil;
    this.naz_viddil = departament.Naz_viddil;
}
// Створення нового запису у БД
// newDep - об'єкт департамент зі значеннями які створюються
// result - результат свторення
Departament.create = function (newDep, result) {
    connection.query("INSERT INTO dovid_viddil set ?", newDep, function (err, res) {
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
Departament.findById = function (id, result) {
    connection.query("Select * from dovid_viddil where id_viddil = ? ", id,
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
Departament.findAll = function (result) {
    connection.query("Select * from dovid_viddil",
        function (err, res) {
            if (err) {
                console.log("error: ", err);
                result(null, err);
            }
            else {
                console.log('Departament : ', res);
                result(null, res);
            }
        });
};
// Зміна запису з певним id у БД 
//id - значення id відділу
// dep - значення що змінюється включає назву відділу
// result - результат запиту
Departament.update = function (id, dep, result) {
    connection.query("UPDATE dovid_viddil SET Naz_viddil=? WHERE id_viddil = ?",
        [dep.naz_viddil, id],
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
Departament.delete = function (id, result) {
    connection.query("DELETE FROM dovid_viddil WHERE id_viddil = ?", [id],
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
// Вказуємо, що експортуємо з модуля Departament
module.exports = Departament;