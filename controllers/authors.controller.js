const author = require('../models/authors.model'); // Importar el modelo de la BBDD

// GET http://localhost:3000/entries --> ALL
// GET http://localhost:3000/entries?email=hola@gmail.com --> por email
const getAuthors = async (req, res) => {
    let authors;
    if (req.query.email) {
        authors = await author.getAuthorByEmail(req.query.email);
    }
    else {
        authors = await author.getAllAuthors();
    }
    res.status(200).json(authors); // [] con las entries encontradas
}

//createEntry
// POST http://localhost:3000/api/entries
// let newEntry = {
//     title:"noticia desde Node",
//     content:"va a triunfar esto2",
//     email:"alejandru@thebridgeschool.es",
//     category:"sucesos"}

// Crear entry por email
const createAuthor = async (req, res) => {
    const newAuthor = req.body; // {title,content,email,category}
    const response = await author.createAuthor(newAuthor);
    res.status(201).json({
        "items_created": response,
        data: newAuthor
        },
        {
            message: `usuario creado: ${req.query.email}`
        });
}

/*
{
        title: "Nos vamos de tortillas",
        content: "Corren rumores de que papa noel tenía un saco vacio y lo llenó",
        date: "2021-12-25",
        category: "sucesos",
        email: "alejandru@thebridgeschool.es",
        old_title: "Noticia: Un panda suelto por la ciudad"
    }
*/

const updateAuthor = async (req, res) => {
    const modifiedAuthor = req.body; // {title,content,date,category,email,old_title}
    const response = await author.updateAuthor(modifiedAuthor);
    res.status(200).json({
        "items_updated": response,
        data: modifiedAuthor
    },{
        message: `usuario creado: ${req.query.email}`
    });
}

const deleteAuthor = async (req, res) => {
    let authors;
    if (req.query.title) {
        authors = await author.getAuthorByEmail(req.query.email);
        if (authors.length > 0) {
            deleted = await author.deleteAuthor(req.query.email); 
            res.status(200).json({message: `Se ha borrado ${req.query.email}`})
        }else{
            res.status(404).json("No se ha encontrado el autor")
        }
    }
    else {
        res.status(404).json("No se ha encontrado el autor")
    }
}

module.exports = {
    getAuthors,
    createAuthor,
    updateAuthor,
    deleteAuthor
}