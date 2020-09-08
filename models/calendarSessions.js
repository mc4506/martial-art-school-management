module.exports = function (sequelize, DataTypes) {
    const CalendarSessions = sequelize.define("CalendarSessions", {
       startTime: {type: DataTypes.INTEGER, allowNull: false },
    });

    CalendarSessions.associate = function(models) {
        CalendarSessions.belongsToMany(models.User, { through: 'UserSessions'});
        CalendarSessions.belongsTo(models.Sessions);
        CalendarSessions.belongsTo(models.CalendarDays);
    };

    return CalendarSessions;
};
