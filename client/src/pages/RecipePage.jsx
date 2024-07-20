import React, { useContext, useEffect, useState } from 'react';
import styles from '../styles/recipepage.module.css';
import Navbar from './Navbar';
import { Link, useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useRecipeContext } from '../store/recipeContext';
import LoadingDots from '../components/LoadingDots';

const RecipePage = () => {
  const {id} = useParams()
  const navigate = useNavigate()
  const {token} = useRecipeContext()
  const [recipe,setRecipe] = useState(null)
  const [loading,setLoading] = useState(false)
  const getRecipe = async()=>{
    try{
      console.log(id)
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/recipe/getrecipe/${id}`,{
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      if (!response.ok) {
        toast.error(data.message, {
          duration: 2000,
          style: {
            background: '#FF474C',
            color: 'white',
          },
        });
      } else {
        console.log(data)
        setRecipe(data);
      }
    }catch(err){
      toast.error(err.message,{
        duration: 2000,
        style: {
          background: "#FF474C",
          color: "white",
        },
      })
    }finally{
      setLoading(false);
    }
  }

  const addtoFavourite = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/favourite/addtofavourite`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ recipeId:id })
      });
      const data = await response.json();
      if (!response.ok) {
        console.log(data);
        toast.error(data.message, {
          duration: 2000,
          style: {
            background: "#FF474C",
            color: "white",
          },
        });
      } else {
        toast.success('Recipe added to favourites!', {
          duration: 2000,
          style: {
            background: 'green',
            color: 'white',
          },
          icon: '🥳',
        });
      }
    } catch (err) {
      toast.error(err.message, {
        duration: 2000,
        style: {
          background: "#FF474C",
          color: "white",
        },
      });
    }
  }
  const shareRecipe = (recipe) => {
    const recipeUrl = `${import.meta.env.VITE_FRONTEND_URL}/recipe/${recipe._id}`;
    if (navigator.share) {
      navigator.share({
        title: recipe.name,
        text: `Check out this recipe: ${recipe.name}`,
        url: recipeUrl,
      }).catch((error) => console.error('Error sharing:', error));
    } else {
      navigator.clipboard.writeText(recipeUrl).then(() => {
        toast.success('Recipe link copied to clipboard!', {
          duration: 2000,
          style: {
            background: 'blue',
            color: 'white',
          },
        });
      });
    }
  };

  useEffect(() =>{
    setLoading(true);
    getRecipe();
  },[id])

  if(loading){
    return <LoadingDots />
  }

  if (recipe === null) {
    return (
      <div className={styles.recipePage}>
        <Navbar />
        <h2>No recipe found!</h2>
      </div>
    );
  }
  return (
    <div className={styles.recipePage}>
      <Navbar />
      <div style={{display:'flex'}}>
      <div style={{
                  fontSize: "15px",
                  height: "30px",
                  width: "30px",
                  fontWeight: "bold",
                  borderRadius: "50%",
                  border: "1px solid black",
                  display: "flex",
                  justifyContent: "center",
                  cursor: "pointer",

                }} onClick={()=>{
                  navigate(-1)
                }}> ←	</div>
      <h1 className={styles.recipeTitle} style={{flex:1}}>{recipe.name}</h1>
      </div>
      <div className={styles.recipeContainer}>
        <img src={recipe.image} alt={recipe.name} className={styles.recipeImage} />
        <div className={styles.recipeDetails}>
          <p><strong>Difficulty:</strong> {recipe.difficulty}</p>
          <p><strong>Cuisine:</strong> {recipe.cuisine}</p>
          <p><strong>Meal Type:</strong> {recipe.mealType.join(', ')}</p>
          <p><strong>Prep Time:</strong> {recipe.prepTimeMinutes} minutes</p>
          <p><strong>Cook Time:</strong> {recipe.cookTimeMinutes} minutes</p>
          <p><strong>Servings:</strong> {recipe.servings}</p>
          <p><strong>Calories per Serving:</strong> {recipe.caloriesPerServing}</p>
          <p><strong>Rating:</strong> {recipe.rating} ({recipe.reviewCount} reviews)</p>
          <div className={styles.recipeTags}>
            {recipe.tags.map((tag, index) => (
              <span key={index} className={styles.tag}>{tag}</span>
            ))}
          </div>
          <div className={styles.recipeIngredients}>
          <button onClick={() => shareRecipe(recipe)} className={styles.shareButton}>Share</button>
            <h2>Ingredients</h2>
            <ul>
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
          </div>
          <div className={styles.recipeInstructions}>
            <h2>Instructions</h2>
            <ol>
              {recipe.instructions.map((instruction, index) => (
                <li key={index}>{instruction}</li>
              ))}
            </ol>
          </div>
        </div>
        <div>
        <div style={{
                  fontSize: "30px",
                  height: "50px",
                  width: "50px",
                  borderRadius: "50%",
                  border: "1px solid black",
                  display: "flex",
                  justifyContent: "center",
                  cursor: "pointer"
                }} onClick={()=>addtoFavourite()} >❤️</div> 
        </div>
      </div>
    </div>
  );
};

export default RecipePage;
