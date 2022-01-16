const router = require("express").Router();

const {
  createThought,
  getAllThoughts,
  getThoughtById,
  updateThoughtById,
  deleteThoughtById,
  createReaction,
  deleteReactionById,
  getAllReactions,
  deleteAllReactions
} = require("../../controllers/thought.controller");

router
  .route("/")
  .get(getAllThoughts);

router
  .route("/reactions")
  .get(getAllReactions)
  .delete(deleteAllReactions);

router
  .route("/:id")
  .get(getThoughtById)
  .post(createThought)
  .put(updateThoughtById)
  .delete(deleteThoughtById);

router
  .route("/:thoughtId/reactions")
  .put(createReaction)
  .delete(deleteReactionById);

router.use((req, res) => {
  res.status(404).send("Got a problem in routes/apiRoutes/thought-routes.js");
});

module.exports = router;