const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
const dotenv = require('dotenv').config();

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
    user: process.env.MYSQL_USER ,
    password: process.env.MYSQL_PASS,
  });
  await connection.connect();

  console.log(
    `Conexión establecida con la base de datos (identificador=${connection.threadId})`
  );

  return connection;
}

// ENDPOINT listado de recetas
server.get('/api/recetas', async (req, res) => {
  console.log('pidiendo recetas');
  let sql = 'SELECT * FROM recetas';

  const connection = await getConnection();
  const [results] = await connection.query(sql);

  // Variable que almacena el número de elementos dentro del array:
  const numOfElements = results.length;

  //Variable que almacena el Objeto de respuesta: 
 const response = {
  info: {count: numOfElements},
  results: results
 };
  // Se aplica la anterior variable en la respuesta del json
  res.json(response);
  // Cerramos conexión
  connection.end();
});


// INSERT PARA TODAS LAS RECETAS
const addNewRecipe = `
INSERT INTO recetas (nombre, ingredientes, instrucciones)
  VALUES (?, ?, ?);
`;