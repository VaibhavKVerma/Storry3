const { DataTypes } = require("sequelize");
const sequelize = require("../db/sqldb");
const User = require("./userSchema");

const UserNickname = sequelize.define(
  "UserNickname",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    nickname: {
      type: DataTypes.STRING,
      unique: true,
    },
    userId: {
      type: DataTypes.UUID,
      references: {
        model: User,
        key: "id",
      },
    },
  },
  {
    freezeTableName: true,
  }
);

// User table associated with UserNickname where userId is the foreign key for User table
UserNickname.belongsTo(User, { foreignKey: "userId" });

// Create the table if it doesn't exist
UserNickname.sync({ force: false })
  .then(() => {
    console.log("UserNickname table synced successfully");
  })
  .catch((error) => {
    console.error("Error syncing UserNickname table:", error);
  });

module.exports = UserNickname;
