const mongoose = require("mongoose");

const favouriteSchema = mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  recipeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Recipe",
    required: true,
  },
  addedAt: { type: Date, default: Date.now },
});

module.exports =mongoose.models.favourites || mongoose.model("Favourite", favouriteSchema);
