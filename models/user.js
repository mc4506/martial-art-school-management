// Requiring bcrypt for password hashing. Using the bcryptjs version as the regular bcrypt module sometimes causes errors on Windows machines
const bcrypt = require("bcryptjs");
// Creating our User model
module.exports = function (sequelize, DataTypes) {
  const User = sequelize.define("User", {
    memberStatus: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0},
    firstName: { type: DataTypes.STRING, allowNull: false },
    lastName: { type: DataTypes.STRING, allowNull: false },
    certLevel: {type: DataTypes.INTEGER, allowNull: false, defaultValue: 0},
    age: { type: DataTypes.INTEGER, allowNull: false, validate: { max: 120 }, defaultValue: 1},
    // The email cannot be null, and must be a proper email before creation
    email: { type: DataTypes.STRING, allowNull: false, unique: true, validate: { isEmail: true } },
    phoneNumber: { type: DataTypes.STRING, allowNull: false, defaultValue: "000-000-0000"},
    password: { type: DataTypes.STRING},
    googleId: { type: DataTypes.STRING},
    profilePhotoURL: { type: DataTypes.STRING}
  });

  // Creating a custom method for our User model. This will check if an unhashed password entered by the user can be compared to the hashed password stored in our database
  User.prototype.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
  };
  // Hooks are automatic methods that run during various phases of the User Model lifecycle
  // In this case, before a User is created, we will automatically hash their password
  User.addHook("beforeCreate", user => {
    // console.log(user.password);
    if(user.password !== undefined) {
      user.password = bcrypt.hashSync(
        user.password,
        bcrypt.genSaltSync(10),
        null
      );
    } 
  });
  User.associate = function(models){
    User.hasMany(models.UserSessions, { onDelete: "cascade"})

    User.hasMany(models.Kick, {
      onDelete: "cascade"
    });
  };
  return User;
};
