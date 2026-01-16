import connection from "../config/db.js";


function index(req, res) {
    const sql = "SELECT * FROM posts";

    connection.query(sql, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({
                error: "Errore del database"
            });
        }

        res.json({
            count: results.length,
            results: results
        });
    });
}

function show(req, res) {
    const id = parseInt(req.params.id);

    const sql = "SELECT * FROM posts WHERE id = ?";

    connection.query(sql, [id], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({
                error: "Errore del database"
            });
        }

        if (results.length === 0) {
            return res.status(404).json({
                error: "Post non trovato"
            });
        }

        res.json(results[0]);
    });
}


function store(req, res) {
    const dati = req.body;
    console.log("Dati ricevuti:", req.body);

    if (dati.titolo === undefined || dati.titolo.length <= 0) {
        res.status(400);
        return res.json({
            error: "Errore del client",
            message: "Devi inserire un titolo",
        });
    }

    const newId = posts[posts.length - 1].id + 1;
    const newPost = {
        id: newId,
        titolo: dati.titolo,
        contenuto: dati.contenuto,
        tags: dati.tags,
    };

    posts.push(newPost);
    res.json("Creo un nuovo post");
}

function update(req, res) {
    const id = parseInt(req.params.id);

    const post = posts.find((post) => post.id === id);

    if (post === undefined) {
        res.status(404);
        return res.json({
            error: "Not found",
            message: "Post non trovato",
        });
    }
    const dati = req.body;
    console.log(dati);


    if (dati.titolo === undefined || dati.titolo.length === 0) {
        res.status(400);
        return res.json({
            error: "Errore del client",
            message: "Devi inserire un titolo",
        });
    }

    post.titolo = dati.titolo;
    post.contenuto = dati.contenuto;
    post.tags = dati.tags;


    res.json(post);
    //res.json("Aggiorno il post numero" + id);
}

function modify(req, res) {
    const id = req.params.id;
    res.json("Aggiorna parzialmente");
}

function destroy(req, res) {
    const id = parseInt(req.params.id);

    const sql = "DELETE FROM posts WHERE id = ?";

    connection.query(sql, [id], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({
                error: "Errore del database"
            });
        }


        res.status(204).send();
    });
}










const controller = {
    index,
    show,
    store,
    update,
    modify,
    destroy

}

export default controller