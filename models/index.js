/**
 * exists just to package all the model
 * exports into one file using requires,
 * then use modules.exports = {} where
 * the object brackets have every
 * require variable in them
 */

const {Thought, Reaction} = require("./Thought");

const User = require("./User");

module.exports = { Thought, User, Reaction };