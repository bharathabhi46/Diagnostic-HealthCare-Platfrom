import mongoose, { mongo } from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    collector: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    tests: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Test",
        required: true,
      },
    ],

    status: {
      type: String,
      enum: [
        "BOOKED",
        "ASSIGNED",
        "SAMPLE_COLLECTED",
        "REPORT_READY",
        "COMPLETED",
      ],
      default: "BOOKED",
    },

    reportUrl: {
      type: String,
      default: null,
    },

    totalAmount: {
      type: Number,
      required: true,
    },
  },

  {
    timestamps: true,
  },
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
