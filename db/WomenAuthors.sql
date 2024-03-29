CREATE DATABASE WomenAuthors_db;
USE WomenAuthors_db;

CREATE TABLE Books (
id int auto_increment primary key,
title varchar(50) NOT NULL,
author varchar(50),
genre varchar(30),
yearBook smallint,
pages int,
synopsis text,
isItRead boolean,
rate int
);

INSERT INTO Books (title, author, genre, yearBook, pages, synopsis, isItRead, rate) VALUES ('Chicas de papel y de fuego 1', 'Natasha Ngan', 'Aventuras', 2019, 216, 'Cada año, eligen a ocho chicas hermosas que servirán al rey como Chicas de Papel. Es el más alto honor al que pueden aspirar. y a la vez, el más degradante. Este año hay una novena chica. Y en lugar de papel, está hecha de fuego. Lei pertenece a la casta de papel, la clase más baja de Ikhara. A pesar de eso, un rumor sobre sus ojos dorados ha despertado la curiosidad del rey; por eso, la apartan de su hogar y la llevan al opulento palacio, una prisión dorada, y su vida queda sometida a los caprichos del Rey Demonio. Mientras sueña con escapar, Lei comete lo impensable: se enamora.Su romance prohibido, entretejido con una trama explosiva que amenaza al mismísimo rey, va a obligar a Lei a decidir hasta dónde está dispuesta a llegar en su lucha por la libertad.Exótica, poética y absolutamente inolvidable, Chicas de papel y de fuego es una historia extraordinaria que nos recuerda que el amor puro y la pasión pueden trascender incluso el destino más desalentador.', 1, 5);
INSERT INTO Books (title, author, genre, yearBook, pages, synopsis, isItRead, rate) VALUES ('Opening Up', 'Tristan Taormino', 'Sexualidad', 2015, 420, 'Tristan Taormino nos ofrece una guía para crear y mantener relaciones abiertas. Basado en más de cien entrevistas, Opening Up explora los beneficios, posibilidades y retos de tener una relación abierta en sus distintas modalidades, desde la no monogamia en pareja a la polisoltería. El libro incluye consejos para lidiar con los celos, negociar los límites y gestionar el tiempo, entre otros muchos recursos útiles y siempre enfocados a la práctica.', 0, NULL);
INSERT INTO Books (title, author, genre, yearBook, pages, synopsis, isItRead, rate) VALUES ('La mitad evanescente', 'Brit Bennet', 'Drama', 2021, 368, 'Generación tras generación, la comunidad negra del pueblo de Mallard, en  Luisiana, ha intentado aclarar el tono de su piel favoreciendo los matrimonios mixtos. Las inseparables gemelas Desirée y Stella Vignes, con su color níveo, sus ojos castaños y su cabello ondulado, son un buen ejemplo de ello. Tan distintas y tan iguales, decidieron huir juntas del diminuto pueblo creyendo que también podrían escapar de su sangre. Años después y ante la mirada atónita de todos, Desireé regresa acompañada de una niña negra como el carbón. Hace tiempo que no sabe nada de Stella, después de que decidiera desaparecer y renunciar definitivamente a sus orígenes para vivir otra vida como mujer de raza blanca.', 0, NULL);
INSERT INTO Books (title, author, genre, yearBook, pages, synopsis, isItRead, rate) VALUES ('La chica de los libros', 'Lidia Fernández Galiana', 'Aventuras', 2022, 432, 'Tras el impactante final del primer libro, Oliver deberá encabezar una búsqueda desesperada mientras todo parece desmoronarse a su alrededor. Pero, a veces, los aliados pueden aparecer donde menos te lo esperas… ¿Que ha cambiado en Elizabeth? ¿Conseguirán solventar sus diferencias mientras tratan de sobrevivir en un mundo condenado?', 1, 4);
INSERT INTO Books (title, author, genre, yearBook, pages, synopsis, isItRead, rate) VALUES ('La bruja de la vista', 'Susan Dennard', 'Aventuras', 2022, 400, 'Las brujas de la visión son una antigua orden con la capacidad de ver el futuro. Recluidas en un convento, esperan el día en el que reciban la invitación de la diosa para ir al interior de la montaña y recibir un don sagrado.Y un día, todas las hermanas con el poder de la visión son convocadas al interior de la montaña y nunca vuelven. La única que no acudió a la llamada fue la joven Ryber, que también era la única de entre sus hermanas sin el poder de la visión; ahora solo ella puede salvarlas. En su viaje, se encuentra al joven capitán Kullen Ikray, que no recuerda quién es ni cómo ha llegado hasta allí. Juntos entrarán en la montaña, cuyos túneles están repletos de misterioso y horrores. Y lo que encuentren allí cambiará el destino de las Tierras Embrujadas para siempre.', 0, NULL);
INSERT INTO Books (title, author, genre, yearBook, pages, synopsis, isItRead, rate) VALUES ('La bruja de la verdad', 'Susan Dennard', 'Aventuras', 2019, 432, 'La tregua entre los tres imperios del continente está a punto de llegar a su fin. Safiya, una joven bruja de la verdad capaz de discernir siempre si alguien está mintiendo, ve ahora como nobles sin escrúpulos desean conseguir ese don a cualquier precio para afianzar su poder en la corte. Acompañada de su amiga Iseult y con la ayuda del astuto príncipe Merik, Safiya deberá huir de un implacable brujo de la sangre cegado por su afán de venganza y hacer frente a emperadores y mercenarios que no pararán hasta conseguir capturarla.', 0, NULL);

SELECT * FROM books;

SELECT * FROM books WHERE id = 4;

SELECT * FROM books WHERE isItRead = 1;

SELECT * FROM books WHERE isItRead = 0;

SELECT * FROM books WHERE author = "Cher";

CREATE TABLE users (
id int auto_increment primary key,
email varchar(50) NOT NULL,
nameUser varchar(50) NOT NULL,
address varchar(50),
passwordUser varchar(255) NOT NULL
)
