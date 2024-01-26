const User = require("../models/userSchema");

const createUser = async (userField) => {
  try {
    const user = await User.create(userField);
    return user;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};

const getUser = async (searchArgs) => {
  try {
    const user = await User.findOne({
      where: searchArgs,
      attributes: { exclude: ["password"] },
    });
    return user;
  } catch (error) {
    console.error("Error retrieving user:", error);
    throw error;
  }
};

const updateUser = async (id, updateParams) => {
  try {
    const [rowsAffected, [updatedUser]] = await User.update(updateParams, {
      where: { id },
      returning: true,
    });

    if (rowsAffected > 0) {
      return updatedUser;
    } else {
      throw new Error("User not found or not updated.");
    }
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};

const deleteUser = async (id) => {
  try {
    const rowsAffected = await User.destroy({
      where: { id },
    });

    if (rowsAffected > 0) {
      console.log(`User with id ${id} deleted successfully.`);
    } else {
      console.error(`User with id ${id} not found or not deleted.`);
    }
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
};

module.exports = {
    createUser,
    getUser,
    updateUser,
    deleteUser
}