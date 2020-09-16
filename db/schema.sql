-- OLD DB STRUCTURE

DROP DATABASE IF EXISTS mma_db;

CREATE DATABASE mma_db;
-- **** VERSION 3 ****
-- This one is only 3 tables
CREATE TABLE users (
    id INT AUTO_INCREMENT,
    memberStatus INT NOT NULL,
    firstName VARCHAR (50) NOT NULL,
    lastName VARCHAR (50) NOT NULL,
    certLevel TINYINT NOT NULL,
    age INT (10) NOT NULL,
    email VARCHAR (50) NOT NULL,
    phoneNumber VARCHAR (50) NOT NULL,
    password LONGBLOB NOT NULL,
    primary key (id)
);

CREATE TABLE calendarSessions (
    foreign key (sessionID), 
    time INT (10) NOT NULL,
    weekDay INT (10) NOT NULL,
    primary key (sessionID)
);

CREATE TABLE sessions (
    sessionID INT NOT NULL, 
    sessionName VARCHAR (50) NOT NULL,
    teacherID INT (10) NOT NULL,
    level INT (10) NOT NULL, 
    inPersonLimit INT (10) NOT NULL,
    adultClass BOOLEAN DEFAULT true,
    primary key (sessionID)
)

-- JUNCTION TABLE
CREATE TABLE activitiesJunction (
    sessionID INT AUTO_INCREMENT,
    studentID INT (10) NOT NULL,
    date DATETIME NOT NULL,
    inPerson BOOLEAN DEFAULT true,
    primary key (sessionID),
    attendance BOOLEAN 
);

CREATE TABLE kicks (
    postID INT AUTO_INCREMENT,
    message VARCHAR (280) NOT NULL,
    userID VARCHAR (50) NOT NULL,
    primary key (postID)
);










-- *** VERSION 2 ***
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

-- ** VERSION 1 **
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

