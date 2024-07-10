import React, { useState } from 'react';
import './App.css';
import { useDebounce } from './useDebounce';

function App() {
  const [ingredient, setIngredient] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);

  const debouncedIngredient = useDebounce(ingredient, 500);

  const fetchRecipes = async (ingredients) => {
    setLoading(true);
    try {
      const query = ingredients.split(',').map(ing => ing.trim()).join(',');
      const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=5d8dc0f5&app_key=986215708f16a7be57f4478798151262`);
      const data = await response.json();
      setRecipes(data.hits);
    } catch (error) {
      console.error("Error fetching the recipes:", error);
    }
    setLoading(false);
  };

  React.useEffect(() => {
    if (debouncedIngredient) {
      fetchRecipes(debouncedIngredient);
    }
  }, [debouncedIngredient]);

  const shareRecipe = (recipe) => {
    const text = `Check out this recipe: ${recipe.label}\nSource: ${recipe.source}\nCalories: ${recipe.calories.toFixed(2)}\nIngredients: ${recipe.ingredientLines.join(', ')}\nLink: ${recipe.url}`;

    if (navigator.share) {
      navigator.share({
        title: recipe.label,
        text: text,
        url: recipe.url,
      }).catch((error) => console.error("Error sharing:", error));
    } else {
      const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
      window.open(whatsappUrl, '_blank');
    }
  };

  return (
    <div className="App">
      <h1>Recipe Search</h1>
      <input 
        type="text" 
        value={ingredient} 
        onChange={(e) => setIngredient(e.target.value)} 
        placeholder="Enter ingredients separated by commas" 
      />
      {loading ? <p>Loading...</p> : (
        <div className="content">
          {recipes.map((recipe, index) => (
            <div key={index} className="recipe-card">
              <img src={recipe.recipe.image} alt={recipe.recipe.label} />
              <h2>{recipe.recipe.label}</h2>
              <p>Source: {recipe.recipe.source}</p>
              <p>Prep Time: {recipe.recipe.totalTime || 'Not available'} minutes</p>
              <p>Difficulty: {recipe.recipe.difficulty || 'Unknown'}</p>
              <p>Rating: {recipe.recipe.rating || 'Not rated'}</p>
              <p>Reviews: {recipe.recipe.reviewCount || 0}</p>
              <p>Meal Type: {recipe.recipe.mealType?.join(', ') || 'Not specified'}</p>
              <p>Tags: {recipe.recipe.tags?.join(', ') || 'Not available'}</p>
              <p>Calories: {recipe.recipe.calories.toFixed(2)}</p>
              <p>Diet Labels: {recipe.recipe.dietLabels.join(', ') || 'Not available'}</p>
              <p>Health Labels: {recipe.recipe.healthLabels.join(', ') || 'Not available'}</p>
              <p>Cautions: {recipe.recipe.cautions.join(', ') || 'None'}</p>
              <p>Ingredients: {recipe.recipe.ingredientLines.join(', ')}</p>
              <p>Instructions: {recipe.recipe.instructions?.join(' ') || 'Instructions not available.'}</p>
              <button onClick={() => shareRecipe(recipe.recipe)}>Share</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
