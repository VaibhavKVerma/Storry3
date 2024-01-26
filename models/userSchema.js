const { DataTypes } = require("sequelize");
const sequelize = require("../db/sqldb");

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    email_id: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
      unique: true,
    },
    user: {
      type: DataTypes.STRING,
    },
    author: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM,
      values: ["user", "admin"],
      defaultValue: "user",
    },
    gender: {
      type: DataTypes.ENUM,
      values: ["male", "female", "others"],
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    jwtToken: {
      type: DataTypes.STRING,
    },
  },
  {
    indexes: [
      {
        unique: true,
        fields: ["email_id"],
      },
      {
        fields: ["active"],
      },
    ],
    freezeTableName: true,
  }
);

// Create the table if it doesn't exist
User.sync({ force: false })
  .then(() => {
    console.log("User table synced successfully");
  })
  .catch((error) => {
    console.error("Error syncing User table:", error);
  });

module.exports = User;
