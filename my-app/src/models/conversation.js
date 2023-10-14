const { default: mongoose } = require("mongoose");

const ConversationSchema = new mongoose.Schema({
  users: [String],
  messages: [
    {
      from: String,
      text: String,
      createdAt: {
        type: String,
        default: Date.now,
      },
    },
  ],
});

const Conversation =
  mongoose.models?.Conversation ??
  mongoose.model("Conversation", ConversationSchema);

export default Conversation;
