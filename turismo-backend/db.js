const mysql = require('mysql');
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'admin',
    database: 'turismo'
});

db.connect((err) => {
    if (err) {
        console.error('Error de conexión: ' + err);
        return;
    }
    console.log('Conectado a la base de datos MySQL');
});

module.exports = db;

