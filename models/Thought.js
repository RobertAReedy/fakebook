/**
 * put REACTION schema here too, as reactions will
 * always be to thoughts
 */

const { Schema, model, Types } = require("mongoose");
const dateFormat = require("date-format");

const ReactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId()
    },
    reactionBody: {
      type: String,
      required: "Reaction body can't be empty",
      trim: true,
      maxlength: 280
    },
    username: {
      type: String,
      required: "Author slot can't be empty (reaction)",
      trim: true
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: createdAtVal => dateFormat.asString(createdAtVal)
    }
  },
  {
    toJSON: {
      getters: true
    },
    id: false
  }
);

const ThoughtSchema = new Schema(
  {
    username: {
      type: String,
      required: "Author slot can't be empty",
      trim: true
    },
    thoughtText: {
      type: String,
      required: "Thought text can't be empty",
      trim: true,
      minlength: 1,
      maxlength: 279
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: createdAtVal => dateFormat.asString(createdAtVal)
    },
    reactions: [ReactionSchema] 
  },
  {
    toJSON: {
      getters: true,
      virtuals: true
    },
    id: false
  }
);

ThoughtSchema.virtual("reactionCount").get(function () {
  if (this.reactions)
    return this.reactions.length;
});

const Thought = model("Thought", ThoughtSchema);
const Reaction = model("Reaction", ReactionSchema);

module.exports = { Thought, Reaction };