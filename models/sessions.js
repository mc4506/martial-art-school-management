module.exports = function (sequelize, DataTypes) {
    const Sessions = sequelize.define("Sessions", {
        sessionName: { type: DataTypes.STRING, allowNull: false },
        teacherID: {type: DataTypes.INTEGER, allowNull: false },
        level: { type: DataTypes.INTEGER, allowNull: false },
        inPersonLimit: {type: DataTypes.INTEGER, allowNull: false },
        adultclass: { type: DataTypes.BOOLEAN, allowNull: false },
    });
    Sessions.associate = function(models){
        // Sessions.belongsToMany(models.User, { through: 'UserSessions'});
        Sessions.hasMany(models.CalendarSessions);
    };

    return Sessions;
};
