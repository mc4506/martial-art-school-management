module.exports = function (sequelize, DataTypes) {
    const Sessions = sequelize.define("sessions", {
        sessionName: { type: DataTypes.STRING, allowNull: false },
        teacherID: {type: DataTypes.INTEGER, allowNull: false },
        level: { type: DataTypes.INTEGER, allowNull: false },
        inPersonLimit: {type: DataTypes.INTEGER, allowNull: false },
        adultclass: { type: DataTypes.BOOLEAN, allowNull: false },
    });
    // Sessions.associate = function(models){
    //     Sessions.hasMany(models.Users, {});
    //   }
    return Sessions;
};
