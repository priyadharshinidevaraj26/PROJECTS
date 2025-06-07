CREATE DATABASE health_management;

USE health_management;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE
);
CREATE TABLE user_bmi (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    bmi DECIMAL(5,2),
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) -- Assuming a `users` table exists
);
select *from user_pulse;

CREATE TABLE user_blood_pressure (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    systolic INT,
    diastolic INT,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) -- Assuming a `users` table exists
);

CREATE TABLE user_pulse (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    pulse_rate INT,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);



