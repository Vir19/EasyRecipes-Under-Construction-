const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');

// create and config server
const server = express();
server.use(cors());
server.use(express.json());

// init express aplication
const serverPort = 4000;
server.listen(serverPort, () => {
  console.log(`Server listening at http://localhost:${serverPort}`);
});

// CONECTAR BASE DE DATOS

// Función asíncrona que conecta la bdd
async function getConnection() {
// Variable que guarda el await
  const connection = await mysql.createConnection({
    // El host de tu base de datos
    host: 'localhost',
    // El nombre de tu base de datos.
    database: 'netflix',
    // Usuario
    user: 'root',
    // Contraseña de la base de datos. 
    password: 'VirGiNiA5619?',
  });
  await connection.connect();

  console.log(
    `Conexión establecida con la base de datos (identificador=${connection.threadId})`
  );

  return connection;
}

// ENDPOINT listado de películas
server.get('/movies', async (req, res) => {
  console.log('Pidiendo a la base de datos información de las películas.');
  let sql = 'SELECT * FROM movies';

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
// EndPoint Listado de películas
server.get('/actors', async (req, res) => {
  console.log('Pidiendo a la base de datos información de las películas.');
  let sql = 'SELECT * FROM actors';

  const connection = await getConnection();
  const [results, fields] = await connection.query(sql);
  res.json(results);
  connection.end();
});
