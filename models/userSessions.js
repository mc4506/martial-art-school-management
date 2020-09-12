module.exports = function (sequelize, DataTypes) {
    const UserSessions = sequelize.define("UserSessions", {
        isPresent: { type: DataTypes.BOOLEAN, defaultValue: 0, allowNull: false},
    });
    UserSessions.associate = function(models) {
        UserSessions.belongsTo(models.User, {
          foreignKey: {
            allowNull: false
          }
        });
        UserSessions.belongsTo(models.CalendarSessions, {
          foreignKey: {
          allowNull: false
          }
        });
      };
    return UserSessions;
};