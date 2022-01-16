const User = require("../models/User");

const UserController = {
  getAllUsers(req, res) {
    User.find({})
      .select("-__v")
      .then(userData => res.json(userData))
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  getUserById({ params }, res) {
    User.findOne({ _id: params.id })
      // .populate(
      //   {
      //     path: "friends",
      //     select: "username _id"
      //   }
      // )
      .populate(
        {
          path: "thoughts",
          select: "username thoughtText "
        }
      )
      .then(userData => {
        if (!userData) {
          res.status(404).json({ message: "No user by this id." });
          return;
        }
        res.json(userData);
      })
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  createUser({ body }, res) {
    User.create(body)
      .then(data => res.json(data))
      .catch(err => res.status(400).json(err));
  },

  updateUser({ params, body }, res) {
    User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
      .then(userData => {
        if (!userData) {
          res.status(404).json({ message: "No user by this id." });
          return;
        }
        res.json(userData);
      })
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  deleteUserById({ params }, res) {
    User.deleteOne({ _id: params.id })
      .then(userData => {
        if (!userData) {
          res.status(404).json({ message: "No user by this id." });
          return;
        }
        res.json(userData);
      })
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  addFriend({ params }, res) {
    User.findOne({ _id: params.friendId })
      .then(userData => {
        if (!userData) {
          res.status(404).json({ message: "Couldn't the user to be added as a friend." });
          return;
        }
        console.log(userData);
        return User.findOneAndUpdate(
          { _id: params.userId },
          { $push: { friends: userData } },
          { new: true, runValidators: true }
        )
          .then(friendData => {
            if (!friendData) {
              res.status(404).json({ message: "Couldn't the user to add the friend to." });
              return;
            }
            res.json(friendData);
          })
          .catch(err => {
            res.status(400).json({ message: "Something in addFriend went wrong." });
            console.log(err);
          });
      }); //end of first then

  },

  removeFriend({ params }, res) {
    User.findOne({ _id: params.friendId })
      .then(userData => {
        if (!userData) {
          res.status(404).json({ message: "Couldn't find the user to be removed from friends list." });
          return;
        }
        console.log(userData);
        return User.findOneAndUpdate(
          { _id: params.userId },
          { $pull: { friends: userData._id } },
          { new: true, runValidators: true }
        )
          .then(friendData => {
            if (!friendData) {
              res.status(404).json({ message: "Couldn't the user to remove the friend from." });
              return;
            }
            res.json(friendData);
          })
          .catch(err => {
            res.status(400).json({ message: "Something in removeFriend went wrong." });
            console.log(err);
          });
      }); //end of first then

  }
}

module.exports = UserController;