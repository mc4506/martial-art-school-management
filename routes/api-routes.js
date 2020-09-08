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

  app.get("/api/class_schedule/:level/:isAdult", (req, res) => {
    // console.log(req.params.level);
    db.CalendarSessions.findAll({
      include: {
        model: db.Sessions,
        where: {
          level: req.params.level,
          adultClass: req.params.isAdult
        }
      }
    }).then(function (results) {
      res.json(results);
    });
  });


  app.get("/api/all_members", (req, res) => {
    db.User.findAll().then(function (results) {
      res.json(results);
    })
  });

  app.post("/api/enroll", (req, res) => {
    // console.log(req.body);
    req.body.data.forEach(e => {
      // NEED TO QUERY TO FIND HOW MANY STUDENTS ARE ENROLLED IN EACH CLASS
      // THEN QUERY TO FIND EACH CLASS'S IN PERSON LIMITS
      // THEN CREATE A ROW IN USERSESSIONS IF THERE IS ROOM IN THE CLASS.

      // db.UserSessions.findAll()
      // .then()
      // db.CalendarSessions.findOne({
      //   where: {
      //     id: e.CalendarSessionId
      //   },  
      //   include: {
      //     model: db.Sessions,
      //   }
      // }).then( results => {
      //   console.log(results);
      // })

      // console.log(classLimit);
      db.UserSessions.create({
        CalendarSessionId: e.CalendarSessionId,
        UserId: e.UserId
      }).then((results) => {
        res.json();
      }).catch((err) =>{
        res.send(err);
      })
    });

  });


};