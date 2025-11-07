const recipeModel = require("../Model/recipeModel");

const getRecipes = async (req, res, next) => {
  const { limit, skip, search } = req.query;
  console.log('[RECIPE] Get recipes request:', { limit, skip, search });
  try {
    // Add a filter for the search term
    const filter = search ? {
      ingredients: { $elemMatch: { $regex: search, $options: 'i' }}}: {};
    
    console.log('[RECIPE] Filter applied:', filter);
    const recipes = await recipeModel.find(filter).skip(Number(skip)).limit(Number(limit));
    console.log('[RECIPE] Found recipes count:', recipes.length);
    
    if (recipes.length > 0) {
      res.status(200).json(recipes);
    } else {
      res.status(200).json([]);
    }
  } catch (err) {
    console.log('[RECIPE] Error getting recipes:', err.message);
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
