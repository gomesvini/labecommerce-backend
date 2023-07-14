-- Active: 1689279974666@@127.0.0.1@3306
CREATE TABLE users (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    createdAt TEXT DEFAULT (DATETIME()) NOT NULL
);

CREATE TABLE products (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    price REAL NOT NULL,
    description TEXT NOT NULL,
    imageUrl TEXT NOT NULL
);

INSERT INTO users (id, name, email, password)
VALUES
    ('u003', 'Beltrano', 'beltrano@hotmail.com','beltrano321');

INSERT INTO products (id, name, price, description, imageUrl)
VALUES
    ('prod003', 'Teclado', 150,'Teclado mecânico RGB', 'https://picsum.photos/seed/Teclado/400'),
    ('prod004', 'WebCan', 80,'Webcan 4k Full HD', 'https://picsum.photos/seed/Webcan4K/400'),
    ('prod005', 'SSD', 350,'SSD 1T Sandisc', 'https://picsum.photos/seed/SSD/400');
DROP TABLE products;

SELECT * FROM users;
SELECT * FROM products