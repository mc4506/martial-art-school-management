module.exports = function (sequelize, DataTypes) {
    const CalendarDays = sequelize.define("CalendarDays", {
       date: {type: DataTypes.DATEONLY, allowNull: false },
       dayOfWeek: {type: DataTypes.INTEGER, allowNull: false },
       weekNumber: {type: DataTypes.INTEGER, allowNull: false }
    });

    CalendarDays.associate = function(models) {
        CalendarDays.hasMany(models.CalendarSessions);
    };

    return CalendarDays;
};