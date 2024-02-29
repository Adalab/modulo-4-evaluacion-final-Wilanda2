//Esto es mi servidor, basado en node, y se lo tengo que decir en el package.json. Creamos la estructura, creamos los scripts que necesitamos e instalamos las dependencias (cors, express, mysql2 y dotenv)-->npm instal cors express mysql2 dotenv

//Importar libreria que necesito para crear el servidor
const express = require('express');
// instalaMos el cors
const cors = require('cors');
//mysql - dependencia para trabajar con la base de datos
const mysql = require('mysql2/promise');

//Creamos el archivo .env, hermano de package,json, para crear las variables de entorno donde guardar información sensible, y le decimos que lo use
require("dotenv").config(); 

//Crear el servidor
const app = express(); //mi server/app/servidor, el nombre que quiera

//Configuro mi servidor para trabajar con cors, con ficheros json y con dotenv. Estas líneas deben estar siempre
app.use(cors());
app.use(express.json());

//inicializo el servidor en el puerto indicado. Ahora está en el .env, así que hay que decírselo
const port = process.env.PORT || 5500;
app.listen(port, () => {
  console.log(`Servidor conectado a http://localhost:${port}`);
});

//conexión a la bases de datos
async function getConnection() {
  //crear y configurar la conexion
  const connection = await mysql.createConnection({
    host: process.env.HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || 'root',
    database: 'womenauthors_db',
  }); 
  //delante de la conexión puede haber un await o no
  await connection.connect();
  console.log(connection)
  return connection;
}

//Creamos endpoints --> CRUD create, read, update, delete. La ruta del endpoint tiene que coincidir con la del front

//Insertar un registro en su entidad principal.
// Actualizar un registro existente.
// Eliminar un registro existente

//ENDPOINT para Leer/Listar todos los registros existentes
app.get('/books', async(req, res)=>{
  
  const conex = await getConnection();

  const booksSQL = "SELECT * FROM books";
  const [result] = await conex.query(booksSQL);
  
  res.json(result);
})

//ENDPOINT para // Leer registros filtrado por el campo de tu interés.
app.get('/books/:id', async (req, res)=>{
  //recibo el id del libro por url params
  const idBook = req.params.id;

  const conex = await getConnection();

  //validaciones que hay que pensar
  if (isNaN(parseInt(idBook))) {
    return res.json({success: false, error: "El id debe ser un número."})
  }

  const query = "SELECT * FROM books WHERE id = ?"
  //como esta query tiene un valor variable, la función necesita dos parámetros, el nombre de la constante donde se guarda la query y el nombre del valor variable, que, como es variable, siempre va a volver como array
  const [result] = await conex.query(query, [idBook]);
  conex.end();
  
  // Validación de que el id no existe.
  if (result.length === 0 ) {
    return res.json({success: true, error: "El id no existe."})
  }
  res.json({ result });
})

app.get('/books/:author', async(req, res)=>{
  
  const conex = await getConnection();

  const booksSQL = "SELECT * FROM books WHERE author = ?";
  const [result] = await conex.query(booksSQL);
  
  res.json(result);
})




// app.post('/recetas', async (req, res)=>{
//   //recibimos el objeto de la base de datos por el body
//   const data = req.body;
//   //desestrucutramos de lo que viene del body, no tiene que ver con lo que viene de la base de datos
//   const {nombreReceta, ingredientesReceta, instruc} = data //destructuring de objeto, vienen del body de la petición
//   const conex = await getConnection();
//   const sql = "INSERT INTO recetas (nombre ingredientes, instrucciones) values (?,?,?)";
//   const [result] = await conex.query(sql, [
//     nombreReceta, 
//     ingredientesReceta, 
//     instruc
//   ])
//   res.json({
//     success: true,
//     id: result.insertId //id que generó MySQL para la nueva fila
//   })
// })

// //el update debe ser método put
// app.put('/recetas/:id', async (req, res)=>{
//   const conex = await getConnection();
//   //estas son url params
//   const id = req.params.id;
//   //por el body voy a mandar los datos de toda la receta
//   const data = req.body
//   const {nombreReceta, ingredientesReceta, instruc} = data;

//   const sql = "UPDATE recetas SET nombre = ?, ingredientes = ?, instrucciones = ? WHERE id = ?"; //ojo con el where, si no se lo ponemos lo borra todo
//   const [result] = await conex.query(sql, [
//     nombreReceta, 
//     ingredientesReceta, 
//     instruc,
//     id
//   ])
//   res.json({
//     success: true,
//     message: "Actualizado correctamente"
//   })
// })

// //vamos a utilizar los queryparams
// app.delete("/recetas", async (req, res)=> {
//   const conex = await getConnection();
//   const idReeceta = req.query.id;

//   const sql = "DELETE FROM recetas WHERE id = ?";
//   const [result] = await conex.query(sql, [idReeceta])

//   if (result.affectedRows > 0) {
//     res.json({
//     success: true,
//     message: "Eliminado correctamente"
//   })
//  } else {
//     res.json({
//       success: false,
//       message: "No se ha eliminado nada"
//     })
//   }
// })


// // //1. Instalar y configuro el ejs
// // server.set('view engine', 'ejs');

// //crear mi función para conectarnos con la bases de datos
