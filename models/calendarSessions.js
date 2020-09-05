module.exports = function (sequelize, DataTypes) {
    const CalendarSessions = sequelize.define("calendarSessions", {
        sessionID: { type: DataTypes.INT, allowNull: false },
        employeeID: { type: DataTypes.INT, allowNull: false },
        level: {type: DataTypes.INT, allowNull: false },
        limit: { type: DataTypes.INT, allowNull: false },
    });
    return CalendarSessions;
};
