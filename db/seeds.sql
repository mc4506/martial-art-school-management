INSERT INTO users (memberStatus,firstName,lastName,certLevel,age,email,phoneNumber,password)
VALUES ('0', 'John', 'Doe','5','37','mmaguy83@gmail.com','7325551234','coolguy123'),
       ('0', 'Jane', 'Doe','5','34','mmagal86@gmail.com','9085554321','coolgal123'),
       ('0', 'Jimmy', 'Doe','2','8','mmakid12@gmail.com','7325551234','coolkid321'),
       ('0', 'Jessica', 'Doe','2','10','mmagrl10@gmail.com','7325551234','coolgrl432'),
       ('0', 'Grandpa', 'Doe','7','67','grandpa@gmail.com','7324441234','grandpa876'),
       ('1', 'Master', 'John','7','42','masterJ@gmail.com','2013335555','masterJ42'),
       ('1', 'Master', 'Doe','7','32','masterD@gmail.com','2015551234','masterD32'),
       ('0', 'Grandma', 'Doe','7','68','grandma@gmail.com','7323445555','grandma876');

INSERT INTO sessions (sessionName,teacherID,level,inPersonLimit,adultClass)
VALUES ('Intermediate Kickboxing','6','5','12','1'),
       ('Advanced Kickboxing','7','7','12','1')
       ('Beginner Kickboxing','7','1','12','0');

INSERT INTO calendarSessions (time,weekDay,)
VALUES ('17','1'),
       ('19','3'),
       ('17','3'),
       ('17','4'),
       ('17','5');

INSERT INTO kicks (message, userID)
VALUES ("This is the best MMA school I've ever gone to, hands down.", "JDoe92"),
       ("Had a great time this weekend, see you guys next Sunday!", "SenseiT")
