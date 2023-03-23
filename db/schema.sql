-- starts the db
DROP DATABASE IF EXISTS springhunters_db;
CREATE DATABASE springhunters_db;
USE springhunters_db;

-- creating the tables
CREATE TABLE users (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  username VARCHAR(255) NOT NULL UNIQUE KEY,
  password VARCHAR(255) NOT NULL,
  permissions varchar(30),
  customer_level varchar(30),
  zipcode INT(5),
  email VARCHAR(30) NOT NULL UNIQUE
);
-- creating the tables
CREATE TABLE springs (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  image_url TEXT,
  zipcode INT(5),
  fees VARCHAR(20),
  pets BOOLEAN,
  statepark BOOLEAN,
  camping BOOLEAN,
  scuba BOOLEAN,
  lat DECIMAL (7,4),
  lng DECIMAL (7,4)
);
-- currently disabled
-- CREATE TABLE ratings (
--   id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
--   user_id INT,
--   spring_id INT,
--   rating INT,
--   FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
--   FOREIGN KEY (spring_id) REFERENCES springs(id) ON DELETE SET NULL
-- );
-- creating the tables
CREATE TABLE comments (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  spring_id INT,
  comment TEXT,
  rating_id INT,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
  FOREIGN KEY (spring_id) REFERENCES springs(id) ON DELETE SET NULL
);
-- creating the tables
CREATE TABLE new_spring (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  zipcode INT(5),
  pets BOOLEAN,
  statepark BOOLEAN,
  camping BOOLEAN
);
