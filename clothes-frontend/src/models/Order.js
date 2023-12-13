import { model, Schema, models } from "mongoose";

const orderSchema = new Schema(
  {
    items: { type: [Schema.Types.Mixed], required: true },
    finalPrice: { type: Number, required: true },
    finalQuantity: { type: Number, required: true },
    user: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    selectAddress: { type: Schema.Types.Mixed, required: true },
  },
  { timestamps: true }
);

export const Order = models.Order || model("Order", orderSchema);
