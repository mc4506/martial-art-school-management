DROP DATABASE IF EXISTS mma_db;

CREATE DATABASE mma_db;

CREATE TABLE students(
id INT (10) auto_increment,
firstName VARCHAR (30) NOT NULL,
lastName VARCHAR (30) NOT NULL,
email VARCHAR (60) NOT NULL,
rank INT (10) NOT NULL,
inPersonClass BOOLEAN DEFAULT true,
userID VARCHAR (100) NOT NULL,
age INT (10) NOT NULL
primary key (id)
);

CREATE TABLE classes (
id INT AUTO_INCREMENT,
className VARCHAR (100) NOT NULL,
dayOfWeek VARCHAR (8) NOT NULL,
hourofDay INT (5) NOT NULL,
numOfInPersonStudents INT (5) NOT NULL,
totalNumOfStudents INT (5) NOT NULL,
minRank INT (5) NOT NULL,
maxRank INT (5) NOT NULL
)

CREATE TABLE users (
userID VARCHAR (30) NOT NULL,
userName VARCHAR (20) NOT NULL,
password VARCHAR (20) NOT NULL,
googleAuthID VARCHAR (100) NOT NULL,
googleEmail VARCHAR (50) NOT NULL,
isEmployee BOOLEAN DEFAULT FALSE
primary key (userID)
)

CREATE TABLE kicks (
postID INT AUTO_INCREMENT,
message VARCHAR (280) NOT NULL,
userID VARCHAR (30) NOT NULL,
timeStamp VARCHAR (30) NOT NULL
primary key (postID)
)
