import { model, Schema, models } from "mongoose";

const orderSchema = new Schema(
  {
    items: { type: [Schema.Types.Mixed], required: true },
    finalPrice: { type: Number, required: true },
    finalQuantity: { type: Number, required: true },
    paymentStatus: { type: String, required: true },
    user: {
      id: {
        type: Schema.Types.ObjectId,
        ref: "user",
      },
      email: { type: String, required: true },
    },
    selectAddress: { type: Schema.Types.Mixed, required: true },
  },
  { timestamps: true }
);

export const Order = models.Order || model("Order", orderSchema);
