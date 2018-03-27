CREATE DATABASE IF NOT EXISTS test;

USE test;

CREATE TABLE IF NOT EXISTS person (
    name VARCHAR(80),
    id INT AUTO_INCREMENT,
    age INT NOT NULL,
    primary key(id)
);

insert into person(name, age) values("edward", 7), ("jimbo", 25), ("harry", 8);