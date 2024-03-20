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
server.get('api/recetas', async (req, res) => {
  console.log('pidiendo recetas');
  let sql = 'SELECT * FROM recetas';

  const connection = await getConnection();
  const [results, fields] = await connection.query(sql);
  res.json(results);
  connection.end();
});
//EndPoint Listado de usuarios 
server.get('/users', async (req, res) => {
  console.log('Pidiendo a la base de datos información de las películas.');
  let sql = 'SELECT * FROM users';

  const connection = await getConnection();
  const [results, fields] = await connection.query(sql);
  res.json(results);
  connection.end();
});

// EndPoint Listado de actores
server.get('/actors', async (req, res) => {
  console.log('Pidiendo a la base de datos información de las películas.');
  let sql = 'SELECT * FROM actors';

  const connection = await getConnection();
  const [results, fields] = await connection.query(sql);
  res.json(results);
  connection.end();
});

// INSERT PARA TODAS LAS RECETAS

const addNewRecipe = `
INSERT INTO recetas_db.recetas (nombre, ingredientes, instrucciones)
  VALUES (?, ?, ?);
`;