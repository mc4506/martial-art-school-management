module.exports = function(sequelize, DataTypes) {
  const KickTopic = sequelize.define("KickTopic", {
    topicTitle: { type: DataTypes.STRING, allowNull: false, validate: {len: [1]}},
  });
  KickTopic.associate = function(models) {
    // Associating User with Kicks
    // When an User is deleted, also delete any associated Posts
    KickTopic.hasMany(models.Kick, {
      onDelete: "cascade"
    });
  };
  return KickTopic;
};
