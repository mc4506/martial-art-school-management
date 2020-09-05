module.exports = function (sequelize, DataTypes) {
    const CalendarSessions = sequelize.define("CalendarSessions", {
       time: {type: DataTypes.INTEGER, allowNull: false },
       weekDay: { type: DataTypes.INTEGER, allowNull: false }
    });

    CalendarSessions.associate = function(models) {
        CalendarSessions.belongsTo(models.Sessions);
    }

    return CalendarSessions;
};
