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
