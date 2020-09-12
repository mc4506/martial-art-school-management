// Requiring our models and passport as we've configured it
const db = require("../models");
const passport = require("../config/passport");

module.exports = function (app) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), (req, res) => {
    // Sending back a password, even a hashed password, isn't a good idea
    res.json({
      email: req.user.email,
      id: req.user.id
    });
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", (req, res) => {
    console.log(req.body);
    db.User.create({
        memberStatus: 0,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        certLevel: parseInt(req.body.certLevel),
        age: parseInt(req.body.age),
        email: req.body.email,
        phoneNumber: req.body.phone,
        password: req.body.password
      })
      .then(() => {
        res.redirect(307, "/api/login");
      })
      .catch(err => {
        console.log(err)
        res.status(401).json(err);
      });
  });

  // Route for logging user out
  app.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", (req, res) => {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      console.log(req.user);
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        firstName: req.user.firstName,
        lastName: req.user.lastName,
        age: req.user.age,
        email: req.user.email,
        phoneNumber: req.user.phoneNumber,
        certLevel: req.user.certLevel,
        memberStatus: req.user.memberStatus,
        id: req.user.id
      });
    }
  });

  // get class schedule for current week
  app.get("/api/class_schedule/:weekNumber", (req, res) => {
    db.CalendarSessions.findAll({
      include: [{
          model: db.Sessions
        },
        {
          model: db.CalendarDays,
          where: {
            weekNumber: req.params.weekNumber
          }
        }
      ]
    }).then(function (results) {
      res.json(results);
    });
  });

  app.get("/api/class_schedule/:level/:isAdult", async (req, res) => {
    // console.log(req.params.level);
    try {
      const results = await db.CalendarSessions.findAll({
        include: {
          model: db.Sessions,
          where: {
            level: req.params.level,
            adultclass: req.params.isAdult
          }
        }
      });
      // console.log(results);
      // check if classes are full. If full add a flag to an updatedResults array
      const data = await updateResults(results);
      // console.log(data);
      res.json(data);
    } catch (err) {
      res.json(err);
    }
  });


  app.get("/api/all_members", (req, res) => {
    db.User.findAll().then(function (results) {
      res.json(results);
    })
  });

  app.post("/api/enroll", (req, res) => {
   
    console.log(req.body);
    const promises = req.body.data.map( e => {
      db.UserSessions.create({
        CalendarSessionId: e.CalendarSessionId,
        UserId: e.UserId
      }).catch( err => {
        console.log(err);
      })
    });

    Promise.all(promises)
    .then((results) => {
      res.json(results);
    }).catch( err => {
      res.send(err);
    })
  });

  app.get("/api/classes/:memberId", (req, res) => {
    db.UserSessions.findAll({
      where: {
        UserId: req.params.memberId
      }
    }).then(data => {
      res.json(data)
    }).catch(err => {
      res.send(err);
    })
  });

  // app.get("/api/enrollto_class/:id", (req, res) => {
  //   db.UserSessions.findAll({
  //     where: {
  //       CalendarSessionId: req.params.id
  //     }
  //   }).then(function (users) {
  //     getAllStudents(users)
  //     .then( students => {
  //       res.json(students);
  //     });   
  //   });
  // });

  app.get("/api/enrollto_class/:id", (req, res) => {
    console.log(req.params.id)
    // db.UserSessions.findAll(

    // )
    // .then( results => {
    //   res.json(results);
    // });
    db.UserSessions.findAll({
      where: {
        CalendarSessionId: req.params.id
      },
      include: {
        model: db.User, attributes: ['firstName', 'lastName', 'certLevel'],
      }
    }).then(results => {
      res.json(results);
    }).catch(err => {
      res.send(err);
    });
  });
};

const hasReachedInPersonLimit = async function (id) {

  const numberOfStudents = await db.UserSessions.count({
    where: {
      CalendarSessionId: id,
    }
  });
  const queryResults = await db.CalendarSessions.findOne({
    where: {
      id: id
    },
    include: {
      model: db.Sessions,
    }
  });
  // console.log(queryResults);
  if (numberOfStudents >= queryResults.Session.dataValues.inPersonLimit) {
    console.log(`class ${id} has reached limit`);
    return true;
  } else return false;
};

const updateResults = async function (results) {
  const updatedResults = [];

  for (const result of results) {
    if (await hasReachedInPersonLimit(result.id)) {
      result.dataValues["reachedLimit"] = true;
      // console.log(result);
      updatedResults.push(result);
    } else {
      updatedResults.push(result);
    }
    // console.log(updatedResults);
  }
  return updatedResults;
}

const getAllStudents = async function (users) {
  const students = [];
  
  for (const user of users) {
    const student = await db.User.findOne({
      where: {
        id: user.dataValues.UserId
      }
    });
    students.push(student);
  };
  return students;
}
