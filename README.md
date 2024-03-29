# Backend de Mi Biblioteca de Autoras
Este es el backend de la aplicación "Mi Biblioteca de Autoras", una herramienta diseñada para gestionar la biblioteca personal de las usuarias, permitiéndoles almacenar y gestionar información sobre libros escritos por autoras.👩🖋📖

## Funcionalidades
El backend proporciona las siguientes funcionalidades a través de una API REST:

#### Autenticación de usuarias👩:
Las usuarias pueden iniciar sesión para acceder a sus bibliotecas personales.

#### Gestión de libros📕📙📒📗📘:

- Añadir libros a tu biblioteca: Las usuarias pueden añadir libros a su biblioteca, proporcionando información como título, autora, año de publicación, número de páginas, sinopsis, si lo han leído y la puntuación que le quieran dar.
- Modificar libros: Las usuarias pueden actualizar la información de los libros existentes en su biblioteca.
- Eliminar libros: Las usuarias pueden eliminar libros de su biblioteca.

#### Endpoints de la api
Método get
- /books: Muestra una lista en formato .json de todos los libros registrados.
- /books/:id: Busca libros por su id. Si no existe, muestra un mensaje de error.
- /author/:author: Filtra los libros por autora.
- /books/read/yes: Muestra los libros de la lista leídos.
- /books/read/no: Muestra los libros de la lista sin leer.
- 
Método post
- /books/add: Añade un nuevo registro a la base de datos.
- /register: Registra una nueva usuaria.
- /login: Da acceso al perfil a la usuaria.
- 
Método put
- /books/modify/:id: Actualiza los datos del libro filtrado por id.
- 
Método delete
. /books/deleto/:id: Elimina un libro filtrado por id.

### Tecnologías Utilizadas👩‍💻👩‍💻👩‍💻
- Node.js, Express.js y CORS
- Base de Datos: MySQL
- Autenticación: JSON Web Tokens (JWT)

## Contribución
Si deseas contribuir a este proyecto, ¡eres bienvenida! Siempre estamos abiertas a nuevas ideas y mejoras. Si deseas reportar un problema o solicitar una nueva función, por favor abre un issue en este repositorio. La idea es que "Mi biblioteca de autoras" siga creciendo hasta que llegue ser una aplicación funcional, con una interfaz agradable, acesible, intuitiva y fácil de manejar.
¡Gracias por vuestro interés!
