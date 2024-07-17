const mongoose = require("mongoose");

const favouriteSchema = mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User"},
  recipeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Recipe",
  },
  addedAt: { type: Date, default: Date.now },
});

module.exports =mongoose.models.favourites || mongoose.model("Favourite", favouriteSchema);
