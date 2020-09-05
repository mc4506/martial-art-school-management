module.exports = function (sequelize, DataTypes) {
    const CalendarSessions = sequelize.define("calendarSessions", {
       time: {type: DataTypes.INT, allowNull: false },
       weekDay: { type: DataTypes.INT, allowNull: false }
    });
    return CalendarSessions;
};
