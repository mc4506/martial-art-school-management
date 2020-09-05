module.exports = function (sequelize, DataTypes) {
    const Sessions = sequelize.define("sessions", {
        sessionID: { type: DataTypes.INT, allowNull: false },
        sessionName: { type: DataTypes.STRING, allowNull: false },
        classSize: {type: DataTypes.INT, allowNull: false },
        date: { type: DataTypes.DATETIME, allowNull: false },
        status: {type: DataTypes.INT, allowNull: false }
    });
    return Sessions;
};
