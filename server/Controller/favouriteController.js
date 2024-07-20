const favouriteModel = require("../Model/favouriteModel");
const  recipeModel  = require("../Model/recipeModel");

const addFavourites = async (req, res) => {
  const { recipeId } = req.body;
  const userId = req.user;

  if (!recipeId) {
    return res.status(400).json({ message: 'Recipe ID is required' });
  }

  try {
    const recipe = await recipeModel.findById(recipeId);
    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }
    const addedRecipe = await favouriteModel.findOne({recipeId});
    if(addedRecipe){
      return res.status(400).json({ message: 'Recipe already added to favourites' });
    }
    const favourite = new favouriteModel({ userId, recipeId });
    await favourite.save();
    res.status(201).json({ message: 'Recipe added to favourites', favourite });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

const getFavourites = async (req, res) => {
  const userId = req.user;
  try {
    const favourites = await favouriteModel.find({ userId }).populate('recipeId');
    if(favourites.length > 0){
    res.status(200).json(favourites);
    }else{
      res.status(200).json([]);
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
}

const removeFavourites = async (req, res) => {
  try {
    const {  recipeId } = req.params;
    const userId = req.user;
    const result = await favouriteModel.findOneAndDelete({ userId, recipeId });
    if (!result) {
      return res.status(404).json({message:'Favorite recipe not found'});
    }
    res.status(200).json({message:'Recipe removed from favorites'});
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }

}

module.exports = {
  addFavourites,
  getFavourites,
  removeFavourites,
 }
