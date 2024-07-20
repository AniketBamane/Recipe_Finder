const recipeModel = require("../Model/recipeModel");

const getRecipes = async (req, res, next) => {
  const { limit, skip, search } = req.query;
  try {
    // Add a filter for the search term
    const filter = search ? {
      ingredients: { $elemMatch: { $regex: search, $options: 'i' }}}: {};
    
    const recipes = await recipeModel.find(filter).skip(Number(skip)).limit(Number(limit));
    if (recipes.length > 0) {
      res.status(200).json(recipes);
    } else {
      res.status(200).json([]);
    }
  } catch (err) {
    res.status(404).json({
      message: err.message || "Error retrieving recipes",
    });
  }
};

const getRecipeById = async (req, res, next) => {
  try {
    const recipe = await recipeModel.findById(req.params.id);
    if (recipe) {
      res.status(200).json(recipe);
    } else {
      res.status(200).json(null);
    }
  } catch (err) {
    res.status(404).json({
      message: err.message || "Error retrieving recipe",
    });
  }
};

module.exports = {
  getRecipes,
  getRecipeById,
};
