import express from "express";
import postsRouter from "./routers/posts.js";
import connection from "./config/db.js";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(express.json());
app.use("/posts", postsRouter);

app.get("/", (req, res) => {
    res.send("Ciao");
});

app.use((req, res) => {
    res.status(404).json({
        error: "Not Found",
        message: "Endpoint non esistente"
    });
});

app.use((err, req, res, next) => {
    console.error(err.stack);

    res.status(err.status || 500).json({
        error: "Errore del server",
        message: err.message || "Si è verificato un errore interno"
    });
});

app.listen(port, () => {
    console.log("In ascolto dalla porta " + port);
});
