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

CREATE TABLE purchases(
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    buyer TEXT NOT NULL,
    totalPrice REAL NOT NULL,
    createdAt TEXT NOT NULL,
    FOREIGN KEY (buyer) REFERENCES users(id)
);

DROP TABLE users;
DROP TABLE products;
DROP TABLE purchases;

INSERT INTO users (id, name, email, password)
VALUES
    ('u001', 'Fulano', 'fulano@hotmail.com', 'fulano123'),
    ('u002', 'Ciclano', 'ciclano@hotmail.com', 'ciclano321'),
    ('u003', 'Beltrano', 'beltrano@hotmail.com', 'beltrano231'),
    ('u004', 'Vinicius', 'vinicius@hotmail.com', 'vini123');

INSERT INTO products (id, name, price, description, imageUrl)
VALUES
    ('prod001', 'Teclado', 150, 'Teclado mecânico RGB', 'https://picsum.photos/seed/Teclado/400'),
    ('prod002', 'Monitor', 150, 'Monitor 4K Full HD gamer', 'https://picsum.photos/seed/Monitor/400'),
    ('prod003', 'Mouse', 150, 'Mouse mecânico gamer', 'https://picsum.photos/seed/Mouse/400'),
    ('prod004', 'Webcan', 150, 'Webcan 4K full HD', 'https://picsum.photos/seed/Webcan/400'),
    ('prod005', 'SSD', 150, 'SSD 1T SandDisc', 'https://picsum.photos/seed/SSD/400');

INSERT INTO purchases (id, buyer, totalPrice, createdAt)
VALUES  
    (); 

SELECT * FROM users;
SELECT * FROM products;
SELECT * FROM purchases;