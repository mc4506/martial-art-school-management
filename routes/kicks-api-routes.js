// Requiring our models and passport as we've configured it
const db = require("../models");
const passport = require("../config/passport");

module.exports = function (app) {

  app.get("/api/topicsall", function (req, res) {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {

      db.KickTopic.findAll({}).then(function (results) {
        // results are available to us inside the .then
        res.json(results);
      });
    }
  });

  app.get("/api/topic/:id", function (req, res) {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      db.Kick.findAll({
        where: {
          KickTopicId: req.params.id,
        },
        // include: {all: true}
        // include: [db.User]
      }).then(function (dbKicks) {

        res.json(dbKicks);
      });
    }
  });

  app.post("/api/username", function (req, res) {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      db.User.findOne({
        where: {
          id: req.body.UserId,
        }
      }).then(function (dbKicks) {
        let jsKick = {
          name: dbKicks.firstName + ' ' + dbKicks.lastName,
          message: req.body.message,
          time: req.body.createdAt
        }
        res.json(jsKick);
      }).catch(function (err) {
        console.log(err);
      });
    }
  });


  // Add a kick
  app.post("/api/kicknew", function (req, res) {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      console.log("Kick Data:");
      console.log(req.body);

      db.Kick.create({
        message: req.body.message,
        UserId: parseInt(req.body.UserId),
        KickTopicId: parseInt(req.body.KickTopicId)
      })
        .then(function (results) {
          console.log(results)
          res.end();
        })
        .catch(function (err) {
          console.log(err)
        });
    }
  });

  // Add a new topickick
  app.post("/api/topicnew", function (req, res) {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      console.log("Topic Data:");
      console.log(req.body);

      db.KickTopic.create({
        topicTitle: req.body.title
      }).then(function (results) {
        // `results` here would be the newly created topic
        res.end();
      });
    }
  });

};
