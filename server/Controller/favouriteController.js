import favouriteModel from "../Model/favouriteModel";
import recipeModel  from "../Model/recipeModel";

const addFavourites = async (req, res) => {
  const { recipeId } = req.body;
  const userId = req.user;

  if (!recipeId) {
    return res.status(400).json({ error: 'Recipe ID is required' });
  }

  try {
    const recipe = await recipeModel.findById(recipeId);
    if (!recipe) {
      return res.status(404).json({ error: 'Recipe not found' });
    }

    const favourite = new favouriteModel({ userId, recipeId });
    await favourite.save();

    res.status(201).json({ message: 'Recipe added to favourites', favourite });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

const getFavourites = async (req, res) => {
  const userId = req.user;
  try {
    const favourites = await favouriteModel.find({ userId }).populate('recipeId');
    res.status(200).json(favourites);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

const removeFavourites = async (req, res) => {
  try {
    const {  recipeId } = req.params;
    const userId = req.user;
    const result = await favouriteModel.findOneAndDelete({ userId, recipeId });
    if (!result) {
      return res.status(404).send('Favorite recipe not found');
    }
    res.send('Recipe removed from favorites');
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }

}

module.exports = {
  addFavourites,
  getFavourites,
  removeFavourites,
 }
