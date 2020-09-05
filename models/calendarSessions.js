module.exports = function (sequelize, DataTypes) {
    const CalendarSessions = sequelize.define("calendarSessions", {
       time: {type: DataTypes.INTEGER, allowNull: false },
       weekDay: { type: DataTypes.INTEGER, allowNull: false }
    });
    return CalendarSessions;
};
