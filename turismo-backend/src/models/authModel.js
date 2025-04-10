import db from "../config/db.js";

class authModel {


    static getAll() {
        return new Promise((resolve, reject) => {
            db.query("SELECT * FROM usuarios", (err, results) => {
                if (err) {
                    return reject(err);
                }
                resolve(results);
            });
        });
    }

    static getById(id) {
        return new Promise((resolve, reject) => {
            db.query("SELECT * FROM usuarios WHERE id_usuario = ?", [id], (err, results) => {
                if (err) {
                    return reject(err);
                }
                resolve(results[0]);
            });
        });
    }


    static create(user) {
        return new Promise((resolve, reject) => {
            db.query("INSERT INTO usuarios SET ?", user, (err, results) => {
                if (err) {
                    return reject(err);
                }
                resolve(results.insertId);
            });
        });
    }

    static update(id, user) {
        return new Promise((resolve, reject) => {
            db.query("UPDATE usuarios SET ? WHERE id_usuario = ?", [user, id], (err, results) => {
                if (err) {
                    return reject(err);
                }
                resolve(results.affectedRows);
            });
        });
    }

    static delete(id) {
        return new Promise((resolve, reject) => {
            db.query("DELETE FROM usuarios WHERE id_usuario = ?", [id], (err, results) => {
                if (err) {
                    return reject(err);
                }
                resolve(results.affectedRows);
            });
        });
    }

}
export default authModel;