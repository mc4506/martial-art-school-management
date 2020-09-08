// Requiring our models and passport as we've configured it
const db = require("../models");
const passport = require("../config/passport");

module.exports = function (app) {

  app.get("/api/topicsall", function (req, res) {
    if (!req.user) {
      // The user is not logged in, send back to startup screen
      res.redirect("/");
    } else {

      db.KickTopic.findAll({}).then(function (results) {
        // results are available to us inside the .then
        res.json(results);
      });
    }
  });

  app.get("/api/topic/:id", function (req, res) {
    if (!req.user) {
      // The user is not logged in, send back to startup screen
      res.redirect("/");
    } else {
      db.Kick.findAll({
        where: {
          KickTopicId: req.params.id,
        },
        // include: {all: true}
        include: { model: db.User, attributes: ['firstName', 'lastName'] }
      }).then(function (dbKicks) {

        res.json(dbKicks);
      });
    }
  });


  // Add a kick
  app.post("/api/kicknew", function (req, res) {
    if (!req.user) {
      // The user is not logged in, send back to startup screen
      res.redirect("/");
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
      // The user is not logged in, send back to startup screen
      res.redirect("/");
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
