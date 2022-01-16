const { Thought, User, Reaction } = require("../models/index");

const thoughtController = {
  createThought({ params, body }, res) {
    Thought.create(body)
      .then(({ _id }) => {
        return User.findOneAndUpdate(
          { _id: params.id },
          { $push: { thoughts: _id } },
          { new: true, runValidators: true }
        );
      })
      .then(thoughtData => {
        if (!thoughtData) {
          res.status(404).json({ message: "No user found with this id" });
          return;
        }
        res.json(data);
      })
      .catch(err => res.json(err));
  },

  getAllThoughts(req, res) {
    Thought.find({})
      .select("-__v")
      .then(thoughtData => res.json(thoughtData))
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  getAllReactions(req, res) {
    Reaction.find({})
      .select("-__v")
      .then(thoughtData => res.json(thoughtData))
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  deleteAllReactions(req, res) {
    Reaction.deleteMany({})
      .then(reactDeleteData => res.json(reactDeleteData))
      .catch(err => {
        res.status(400).json(err);
      })
  },

  getThoughtById({ params }, res) {
    Thought.findOne({ _id: params.id })
      .then(thoughtData => {
        if (!thoughtData) {
          res.status(404).json({ message: "No thought by this id." });
          return;
        }
        res.json(thoughtData);
      })
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      })
  },

  updateThoughtById({ params, body }, res) {
    Thought.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
      .then(thoughtData => {
        if (!thoughtData) {
          res.status(404).json({ message: "No thought by this id." });
          return;
        }
        res.json(thoughtData);
      })
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      })
  },

  deleteThoughtById({ params }, res) {
    Thought.findOneAndDelete({ _id: params.id })
      .then(thoughtData => {
        if (!thoughtData) {
          res.status(404).json({ message: "No thought by this id." });
          return;
        }
        res.json(thoughtData);
      })
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      })
  },

  createReaction({ params, body }, res) {
    Reaction.create({
      reactionBody: body.reactionBody,
      username: body.username,
      reactionId: params.thoughtId
    })
      .then((reactionData) => {
        console.log(reactionData);
        return Thought.findOneAndUpdate(
          { _id: params.thoughtId },
          { $push: { reactions: reactionData } },
          { new: true, runValidators: true }
        );
      })
      .then(reactionData => {
        if (!reactionData) {
          res.status(404).json({ message: "No thought found with this ID to add reaction to." });
          return;
        }
        res.json(data);
      })
      .catch(err => res.json(err));
  },

  deleteReactionById({ params }, res) {
    Reaction.findOneAndDelete({ _id: params.thoughtId })
      .then(reactionData => {
        if (!reactionData) {
          res.status(404).json({ message: "No reaction by this id (delete)." });
          return;
        }
        console.log(reactionData);
        return Thought.findOneAndUpdate(
          { _id: reactionData.reactionId },
          { $pull: { reactions: { _id: reactionData._id } } },
          { new: true, runValidators: true }
        )
      })
      .then(updatedThought => {
        res.json(updatedThought);
      })
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      })
  }
};

module.exports = thoughtController;