import mongoose from "mongoose";
const userTests = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
});
