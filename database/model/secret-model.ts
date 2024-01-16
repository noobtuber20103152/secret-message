import mongoose from "mongoose";

const secretSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please provide username"],
    unique: false,
  },
  email: {
    type: String,
    required: [true, "Please provide email"],
    unique: false,
  },
  secret: {
    type: String,
    required: [true, "Please provide a secret message"],
  },
  isPublic: {
    type: Boolean,
  },
});

const Secret =
  mongoose.models.secrets || mongoose.model("secrets", secretSchema);

export default Secret;
