// Requiring bcrypt for password hashing. Using the bcryptjs version as the regular bcrypt module sometimes causes errors on Windows machines
// var bcrypt = require("bcryptjs");
// Creating our User model
module.exports = function (sequelize, DataTypes) {
  var Kick = sequelize.define("Kick", {
    // The email cannot be null, and must be a proper email before creation
    message: {type: DataTypes.TEXT, allowNull: false, len: [280], validate: {len: [1]} },
    // kicktopicID: {
    //   type: DataTypes.INTEGER,
    //   references: {
    //      model: 'kicktopics', // 'kicktopics' refers to table name
    //      key: 'id', // 'id' refers to column name in persons table
    //   }
    // },
    // userID: {
    //   type: DataTypes.INTEGER,
    //   references: {
    //      model: 'users', // 'users' refers to table name
    //      key: 'id', // 'id' refers to column name in persons table
    //   }
    // }, 
  });

  Kick.associate = function(models) {
    // We're saying that a Kick should belong to an User
    // Kick.belongsTo(models.User);
    Kick.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  Kick.associate = function(models) {
    
    Kick.belongsTo(models.KickTopic, {
      foreignKey: {
      allowNull: false
      }
    });
  };

  return Kick;
};
