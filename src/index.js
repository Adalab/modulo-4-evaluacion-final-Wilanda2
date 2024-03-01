//Esto es mi servidor, basado en node, y se lo tengo que decir en el package.json. Creamos la estructura, creamos los scripts que necesitamos e instalamos las dependencias (cors, express, mysql2 y dotenv)-->npm instal cors express mysql2 dotenv

//Importar libreria que necesito para crear el servidor
const express = require('express');
// instalamos el cors
const cors = require('cors');
//mysql - dependencia para trabajar con la base de datos
const mysql = require('mysql2/promise');

//Creamos el archivo .env, hermano de package,json, para crear las variables de entorno donde guardar información sensible, y le decimos que lo use
require("dotenv").config(); 

//Importo la dependencia para encriptar contraseñas.
const bcrypt = require('bcrypt');

//Importo jsonWebToken.
const jwt = require('jsonwebtoken');

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

//conexión a la base de datos
async function getConnection() {
  //crear y configurar la conexión
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

// //Función para el token
// const generateToken = (data) => {
//   const token = jwt.sign(data, 'secret_key_invented', { expiresIn: '1h' });
//   return token;
// };

// //Funciones para la autenticación (verificar y autenticar).
// const verifyToken = (token) => {
//   const verifyT = jwt.verify(token, process.env.SECRET_KEY_TOKEN ||'secret_key_invented')
//   return verifyT;
// }
// const authenticate = (req, res) => {
//   const tokenBearer = req.headers["authorization"];

//   const token = tokenBearer.split(" ")[1];

//   if (!token) {
//     return res.status(401).json({error: "No hay token"})
//   }

//   const validateToken = verifyToken(token);
//   req.user = validateToken;
//   next()  
// }

//ENDPOINT para Leer/Listar todos los registros existentes
app.get('/books', async(req, res)=>{
  
  const conex = await getConnection();

  const booksSQL = "SELECT * FROM books";
  const [result] = await conex.query(booksSQL);
  
  res.json(result);
})

//ENDPOINT para Leer registros filtrado por id.
app.get('/books/:id', async (req, res)=>{
  //recibo el id del libro por url params
  const conex = await getConnection();
  
  const idBook = req.params.id;  

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
    return res.json({success: true, error: "El id solicitado no existe."})
  }
  res.json(result);
})

//ENDPOINT para Leer registros filtrado por autora.
app.get('/author/:author', async(req, res)=>{
  
  const conex = await getConnection();

  const author = req.params.author;

  const authorSQL = "SELECT * FROM books WHERE author = ? ";
  const [result] = await conex.query(authorSQL, [author]);
  conex.end();
  
  res.json({ result });
})

//ENDPOINT para Leer registros filtrado por libros leídos.
app.get('/books/read/yes', async(req, res)=>{
  
  const conex = await getConnection();

  const booksSQL = "SELECT * FROM books WHERE isItRead = 1";
  const [result] = await conex.query(booksSQL);
  conex.end();
  
  res.json({ result });
})

//ENDPOINT para Leer registros filtrado por libros no leídos.
app.get('/books/read/no', async(req, res)=>{
  
  const conex = await getConnection();

  const booksSQL = "SELECT * FROM books WHERE isItRead = 0";
  const [result] = await conex.query(booksSQL);
  conex.end();
  
  res.json({ result });
})

//ENDPOINT para Insertar un libro nuevo.
app.post('/books/add', async (req, res)=>{
  //recibimos el objeto de la base de datos por el body
  const data = req.body;
  //desestrucutramos de lo que viene del body, no tiene que ver con lo que viene de la base de datos
  const { title, author, genre, yearBook, pages, synopsis, isItRead, rate } = data //destructuring de objeto, vienen del body de la petición

  const conex = await getConnection();

  const sql = "INSERT INTO books (title, author, genre, yearBook, pages, synopsis, isItRead, rate) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
  const [result] = await conex.query(sql, [
    title, 
    author,
    genre,
    yearBook,
    pages,
    synopsis,
    isItRead,
    rate
  ])
  conex.end();

  res.json({
    success: true,
    id: result.insertId //id que generó MySQL para la nueva fila
  })
})

//ENDPOINT para Actualizar un libro existente.
app.put('/books/modify/:id', async (req, res)=>{
try {
  const conex = await getConnection();

  //estas son url params, el id del registro que quiero modificar
  const id = req.params.id;
  //por el body voy a mandar los datos de toda el registro
  const data = req.body;
  const { title, author, genre, yearBook, pages, synopsis, isItRead, rate } = data;

  const sql = "UPDATE books SET title = ?, author = ?, genre = ?, yearBook = ?, pages = ?, synopsis = ?, isItRead = ?, rate = ? WHERE id = ?"; //ojo con el where, si no se lo ponemos lo borra todo
  const [result] = await conex.query(sql, [
    title, 
    author,
    genre,
    yearBook,
    pages,
    synopsis,
    isItRead,
    rate,
    id
  ])
  conex.end();

  res.json({
    success: true,
    message: "Actualizado correctamente."
  })
} catch (error) {
  console.log(error)
}
  
})

//ENDPOINT para Eliminar un registro existente.
app.delete("/books/delete/:id", async (req, res)=> {

  const conex = await getConnection();

  const idBook = req.query.id;
  const sql = "DELETE FROM books WHERE id = ?";
  const [result] = await conex.query(sql, [idBook])
  conex.end();

  if (result.affectedRows > 0) {
    res.json({
    success: true,
    message: "Libro eliminado correctamente."
  })
 } else {
    res.json({
      success: false,
      message: "No se ha eliminado ningún libro."
    })
  }
})


//ENPOINTS DE LOGIN

//ENDPOINT para registro
app.post('/register', async (req, res) => {
  const { email, nameUser, address, pass } = req.body;

  const conex = await getConnection();

  const selectUser = 'SELECT * FROM users WHERE email = ?  OR nameUser = ? ';
  const [resultSelect] = await conex.query(selectUser, [email, nameUser]);

  //Si no devuelve nada, si la longitud del array es 0, es que no existe. Con bcrypt, encripto la constraseña.
  if (resultSelect.length === 0) {
    const passwordHashed = await bcrypt.hash(pass, 10);
    const insertUser =
      'INSERT INTO users (email, nameUser, address, passwordUser) VALUES (?, ?, ?, ?)';
    const [resultInsert] = await conex.query(insertUser, [
      email,
      nameUser,
      address,
      passwordHashed
    ]);

    res.json({ success: true, data: resultInsert });
  }
});

//ENDPOINT para login
app.post('/login', async (req, res) => {
  const { email, pass } = req.body;

  const conex = await getConnection();

  const selectUser = 'SELECT * FROM users WHERE email = ?';
  const [resultSelect] = await conex.query(selectUser, [email]);

  if (resultSelect.length !== 0) {
    const isOkPass = await bcrypt.compare(
      pass,
      resultSelect[0].passwordUser
    );
    if (isOkPass) {
      //Defino cómo quiero que sea el token.
      const infoToken = {
        id: resultSelect[0].id,
        email: resultSelect[0].email
      };
      // Genero token llamando a la función. 
      const token = generateToken(infoToken);
      res.json({
        success: true,
        token: token,
      });
    } else {
      res.json({
        success: false,
        error: 'Contraseña incorrecta.',
      });
    }
  } else {
    res.json({
      success: false,
      error: 'El correo introducido no existe',
    });
  }
});

// //ENDPOINT para ruta privada de una usuaria
// app.get('/user', authenticate, async (req, res) => {
//   console.log(req.user);

// }), 

// //ENDPOINT para logout
// app.put('/logout', (req, res) =>{
//   const tokenHeader = req.headers["authorization"];
//   const token = tokenHeader.split(' ')[1]

//   jwt.sign(token, "", { expiresIn: 1 } , (logoutToken, error) => {
//      if (logoutToken) {
//         res.json({msg: 'Te has desconectado' });
//      } else {
//         res.json({msg: 'Error'});
//      }
//   });
// });


// // //1. Instalar y configurar el ejs
// // server.set('view engine', 'ejs');