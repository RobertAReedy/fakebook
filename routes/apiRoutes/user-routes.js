const router = require("express").Router();

const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUserById,
  addFriend,
  removeFriend,
} = require("../../controllers/user.controller");

router
  .route("/")
  .get(getAllUsers)
  .post(createUser);

router
  .route("/:id")
  .get(getUserById)
  .put(updateUser)
  .delete(deleteUserById);

router
  .route("/:userId/friends/:friendId")
  .put(addFriend)
  .delete(removeFriend);

module.exports = router;