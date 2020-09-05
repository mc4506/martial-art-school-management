module.exports = function (sequelize, DataTypes) {
    const Sessions = sequelize.define("sessions", {
        sessionName: { type: DataTypes.STRING, allowNull: false },
        teacherID: {type: DataTyoes.INT, allowNull: false },
        level: { type: DataTypes.INT, allowNull: false },
        inPersonLimit: {type: DataTypes.INT, allowNull: false },
        adultclass: { type: DataTypes.BOOLEAN, allowNull: false },
    });
    Sessions.associate = function(models){
        Sessions.hasMany(models.Users, {});
      }
    return Sessions;
};
