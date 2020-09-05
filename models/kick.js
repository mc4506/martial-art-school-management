module.exports = function(sequelize, DataTypes) {
  const Kick = sequelize.define("Kick", {
    postID: { type: DataTypes.INT, allowNull: false },
    userID: { type: DataTypes.STRING, allowNull: false },
    message: { type: DataTypes.TEXT, allowNull: false, len: [280] },
    created_at: Sequelize.DATE
  });
  return Kick;
};
