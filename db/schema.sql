DROP DATABASE IF EXISTS mma_db;

CREATE DATABASE mma_db;

-- CREATE TABLE users(
--     id INT AUTO_INCREMENT,
--     memberStatus STATUS NOT NULL,
--     firstName VARCHAR (50) NOT NULL,
--     lastName VARCHAR (50) NOT NULL,
--     certLevel TINYINT NOT NULL,
--     age INT (10) NOT NULL,
--     email VARCHAR (50) NOT NULL,
--     telephone VARCHAR (50) NOT NULL,
--     password VARCHAR (20) NOT NULL,
--     primary key (id)
-- );

-- CREATE TABLE sessions (
--     sessionID INT AUTO_INCREMENT,
--     sessionName VARCHAR (50) NOT NULL,
--     level TINYINT NOT NULL,
--     limit INT NOT NULL,
--     primary key (sessionID)
-- );

-- CREATE TABLE calendarSessions(
--     sessionID INT AUTO_INCREMENT,
--     employeeID INTEGER NOT NULL,
--     classSize INT (10) NOT NULL,
--     date DATETIME NOT NULL,
--     status TINYINT NOT NULL,
--     primary key (sessionID)
-- );

-- CREATE TABLE kicks (
--     postID INT AUTO_INCREMENT,
--     message VARCHAR (280) NOT NULL,
--     userID VARCHAR (50) NOT NULL,
--     primary key (postID)
-- );

-- CREATE TABLE students(
-- id INT auto_increment,
-- firstName VARCHAR (30) NOT NULL,
-- lastName VARCHAR (30) NOT NULL,
-- email VARCHAR (60) NOT NULL,
-- password VARCHAR (100) NOT NULL,
-- studentRank VARCHAR (10) NOT NULL,
-- inPersonClass BOOLEAN DEFAULT true,
-- age INT (10) NOT NULL,
-- primary key (id)
-- );

-- CREATE TABLE classes (
-- id INT (10),
-- className VARCHAR (100) NOT NULL,
-- dayOfWeek VARCHAR (8) NOT NULL,
-- hourofDay INT (5) NOT NULL,
-- numOfInPersonStudents INT (5) NOT NULL,
-- totalNumOfStudents INT (5) NOT NULL,
-- minRank INT (5) NOT NULL,
-- maxRank INT (5) NOT NULL
-- )

-- CREATE TABLE users (
-- userID INT AUTO_INCREMENT,
-- userName VARCHAR (20) NOT NULL,
-- password VARCHAR (20) NOT NULL,
-- googleAuthID VARCHAR (100) NOT NULL,
-- googleEmail VARCHAR (50) NOT NULL,
-- isEmployee BOOLEAN DEFAULT FALSE,
-- primary key (userID)
-- )

-- CREATE TABLE kicks (
-- postID INT AUTO_INCREMENT,
-- message VARCHAR (280) NOT NULL,
-- userID VARCHAR (30) NOT NULL,
-- timeStamp VARCHAR (30) NOT NULL,
-- primary key (postID)
-- )

