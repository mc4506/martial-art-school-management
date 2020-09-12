module.exports = function (sequelize, DataTypes) {
    const CalendarSessions = sequelize.define("CalendarSessions", {
       startTime: {type: DataTypes.INTEGER, allowNull: false },
    });

    CalendarSessions.associate = function(models) {
        CalendarSessions.hasMany(models.UserSessions, { onDelete: "cascade"})
        CalendarSessions.belongsTo(models.Sessions);
        CalendarSessions.belongsTo(models.CalendarDays);
    };

    return CalendarSessions;
};
