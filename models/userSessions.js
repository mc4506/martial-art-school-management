module.exports = function (sequelize, DataTypes) {
    const UserSessions = sequelize.define("UserSessions", {
        isPresent: { type: DataTypes.BOOLEAN, defaultValue: 0, allowNull: false},
    });

    return UserSessions;
};