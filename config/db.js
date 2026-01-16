import mysql from "mysql2";

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "test"
});

connection.connect((err) => {
    if (err) {
        console.error("Errore di connessione al DB:", err);
        return;
    }
    console.log("Connessione al database MySQL avvenuta con successo");
});

export default connection;
