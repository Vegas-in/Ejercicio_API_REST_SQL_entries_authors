const pool = require("../config/db_pgsql");
const queries = require("../queries/authors.queries"); // Queries SQL

// GET
const getAuthorByEmail = async (email) => {
  let client, result;
  try {
    client = await pool.connect(); // Espera a abrir conexion
    const data = await client.query(queries.getAuthorByEmail, [email]);
    result = data.rows;
  } catch (err) {
    console.log(err);
    throw err;
  } finally {
    client.release();
  }
  return result;
};

// GET
const getAllAuthors = async () => {
  let client, result;
  try {
    client = await pool.connect(); // Espera a abrir conexion
    const data = await client.query(queries.getAllAuthors);
    result = data.rows;
  } catch (err) {
    console.log(err);
    throw err;
  } finally {
    client.release();
  }
  return result;
};

// CREATE
const createAuthor = async (author) => {
  const { name, surname, email, image } = author;
  let client, result;
  try {
    client = await pool.connect(); // Espera a abrir conexion
    const data = await client.query(queries.createAuthor, [
      name,
      surname,
      email,
      image,
    ]);
    result = data.rowCount;
  } catch (err) {
    console.log(err);
    throw err;
  } finally {
    client.release();
  }
  return result;
};

//UPDATE

/*
    SET
        title=$1, 
        content=$2, 
        date=$3, 
        category=$4,
        id_author=(SELECT id_author FROM authors WHERE email = $5)
    WHERE 
        title = $6`,
*/
/*

{
    title: "Se acabaron las mandarinas de TB",
    content: "Corren rumores de que papa noel tenía un saco vacio y lo llenó",
    date: "2021-12-25",
    category: "sucesos",
    email: "alejandru@thebridgeschool.es",
    old_title: "Se acabaron las mandarinas de TB"
}

*/

const updateAuthor = async (author) => {
  const { name, surname, email, image} = author;
  let client, result;
  try {
    client = await pool.connect(); // Espera a abrir conexion
    const data = await client.query(queries.updateAuthor, [
      name,
      surname,
      email,
      image,
    ]);
    result = data.rowCount;
  } catch (err) {
    console.log(err);
    throw err;
  } finally {
    client.release();
  }
  return result;
};

// DELETE
const deleteAuthor = async (email) => {
  let client, result;
  try {
    client = await pool.connect(); // Espera a abrir conexion
    const data = await client.query(queries.deleteEntry, [email]);
    result = data.rows;
  } catch (err) {
    console.log(err);
    throw err;
  } finally {
    client.release();
  }
  return result;
};

const entries = {
  getAuthorByEmail,
  getAllAuthors,
  createAuthor,
  updateAuthor,
  deleteAuthor
};

module.exports = entries;