const express = require("express");
const cors = require("cors");
const mysql = require("mysql2/promise");
require("dotenv").config();

// create and config server
const server = express();
server.use(cors());
server.use(express.json());

// init express aplication
const port = 4000;
server.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

// CONECTAR BASE DE DATOS

// Función asíncrona que conecta la bdd
async function getConnection() {
  const connection = await mysql.createConnection({
    host: process.env.MYSQL_HOST,
    database: process.env.MYSQL_DB,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASS,
  });
  await connection.connect();

  console.log(
    `Conexión establecida con la base de datos (identificador=${connection.threadId})`
  );

  return connection;
}

// ENDPOINT listado de recetas
server.get("/api/recetas", async (req, res) => {
  console.log("pidiendo recetas");
  let sql = "SELECT * FROM recetas";

  const connection = await getConnection();
  const [results] = await connection.query(sql);

  // Variable que almacena el número de elementos dentro del array:
  const numOfElements = results.length;
  //Variable que almacena el Objeto de respuesta:
  const response = {
    info: { count: numOfElements },
    results: results,
  };
  // Se aplica la anterior variable en la respuesta del json
  res.json(response);
  // Cerramos conexión
  connection.end();
});

// Obtener receta por ID

server.get("/api/recetas/:id", async (req, res) => {
  // Almacenamos el id en una variable
  const recipeId = req.params.id;
  sql = ` SELECT * FROM recetas WHERE id = ?`;

  const connection = await getConnection();
  const [results] = await connection.query(sql, [recipeId]);

  if (results.length === 0) {
    res.json({
      success: false,
      error: "No se ha encontrado la receta solicitada",
    });
  } else {
    res.json(results[0]);
  }

  console.log(`pidiendo receta por el id ${req.params.id}`);
  connection.end();
});

// INSERT PARA TODAS LAS RECETAS

server.post("/api/recetas", async (req, res) => {
  const { nombre, ingredientes, instrucciones } = req.body;
  const newRecipe = [nombre, ingredientes, instrucciones];
  const addNewRecipe = `
INSERT INTO recetas (nombre, ingredientes, instrucciones)
  VALUES (?, ?, ?);
`;
  const connection = await getConnection();

  try {
    const [results] = await connection.execute(addNewRecipe, newRecipe);
    const newId = results.insertId;

    res.json({
      success: true,
      id: newId,
      message: "¡Bien, se ha añadido tu receta!",
    });
  } catch (error) {
    console.error("Error al añadir rec.", error);
    res.status(500).json({
      success: false,
      error: "Error. Todos los campos deben estar rellenos",
    });
  }

  connection.end();
});

// PUT PARA EDITAR RECETAS
server.put("/api/recetas/:id", async (req, res) => {
  // Se almacenan los datos a editar en una variable
  const { nombre, ingredientes, instrucciones } = req.body;
  // Se almacena el ID seleccionado para poder usarlo más adelante
  const { id } = req.params;
  // Comprobamos que no nos pasen datos vacíos a la tabla
  if (!nombre || !ingredientes || !instrucciones) {
    return res.status(400).json({
      success: false,
      error: "No se pueden dejar los campos vacíos.",
    });
  }
  // Añadimos el id al cuerpo de la receta a editar
  const bodyRecipe = [nombre, ingredientes, instrucciones, id];
  // Query SQL para editar receta
  const editRecipe = `
  UPDATE recetas
  SET nombre = ?,
  ingredientes = ?,
  instrucciones = ?
  WHERE (id = ?);
`;
  const connection = await getConnection();
  const count = `
  SELECT COUNT(*) as count
   FROM recetas
    WHERE id = ?;`;

  try {
    // Executamos la comprobación del id de la receta (si existe o no).
    const [testResults] = await connection.execute(count, [id]);
    // Mensaje de error en caso de que la receta no exista:
    if (testResults[0].count === 0) {
      return res.status(404).json({
        sucess: false,
        error: "La receta no existe",
      });
    }
    // Almacenamos los resultados del UPDATE en la variable results.
    const [results] = await connection.execute(editRecipe, bodyRecipe);

    res.json({
      success: true,
      message: "¡Bien, se ha editado la receta!",
    });
  } catch (error) {
    console.error("Error al editar receta", error);
    res.status(500).json({
      success: false,
      error: "No se ha podido editar la receta, inténtalo de nuevo.",
    });
  }

  connection.end();
});

// Endpoint para ELIMINAR receta.

server.delete("/api/recetas/:id", async (req, res) => {
  const { id } = req.params;
  const deleteRecipe = `
  DELETE FROM recetas
   WHERE (id = ?);
`;
  const connection = await getConnection();
  const count = `
  SELECT COUNT(*) as count
   FROM recetas
    WHERE id = ?;`;

  try {
    const [testResults] = await connection.execute(count, [id]);

    if (testResults[0].count === 0) {
      return res.status(404).json({
        sucess: false,
        error: "La receta seleccionada no existe",
      });
    }

    const [results] = await connection.execute(deleteRecipe, [id]);

    res.json({
      success: true,
      message: "La receta se ha eliminado correctamente.",
    });
  } catch (error) {
    console.error("Error al eliminar rec.", error);
    res.status(500).json({
      success: false,
      error: "Error en la base de datos",
    });
  }

  connection.end();
});
