import React, {  useEffect, useState } from 'react';
import styles from '../styles/favourites.module.css';
import Navbar from './Navbar';
import {  useRecipeContext } from '../store/recipeContext';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import LoadingSkeleton from '../components/LoadingSkeleton';

const Favorites = () => {
  const {token} = useRecipeContext();
  const [favRecipes, setFavRecipes] = useState([]);
  const [loading,setLoading] = useState(false)

  const removeFromFavourites = async(id)=>{
    try{
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/favourite/removefromfavourite/${id}`,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json()
      if (!response.ok){
        toast.error(data.message, {
          duration: 2000,
          style: {
            background: "#FF474C",
            color: "white",
          },
        });
      }
      setFavRecipes(favRecipes.filter(recipe=>recipe.recipeId._id!==id));
      toast.success('Recipe removed from favourites', {
        duration: 1000,
        style: {
          background: "#4CAF50",
          color: "white",
        },
      });
    }catch(err){
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

  const getAllFavourites = async()=>{
    try{
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/favourite/getfavourites`,{
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json()
      if (!response.ok){
        toast.error(data.message, {
          duration: 2000,
          style: {
            background: "#FF474C",
            color: "white",
          },
        });
      }
      console.log(data)
      setFavRecipes([...data]);
    }catch(err){
      toast.error(err.message, {
        duration: 2000,
        style: {
          background: "#FF474C",
          color: "white",
        },
      });
    }finally{
      setLoading(false);
    }
  }
  
  useEffect(()=>{
   setLoading(true);
    getAllFavourites();

  }, [token])

  if(loading){
    return <LoadingSkeleton />
  }
  return (
    <div className={styles.favoritesPage}>
      <Navbar />
      {favRecipes.length <= 0 ? (
        <h2 style={{
  color: '#333',
  fontSize: '1.5rem',
  textAlign: 'center',
  marginTop: '20px',
  fontWeight: 'bold',
  padding: '20px',
  borderRadius: '8px',
  backgroundColor: '#f9f9f9',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
}}>
  No favourites found
</h2>
      ):(
        <>
        <input
        type="text"
        className={styles.searchBox}
        placeholder="Search recipes of your favourites..."
      />
      <div className={styles.recipeCardsContainer}>
        {favRecipes.map((recipe, index) => (
          <div className={styles.recipeCard} key={index}>
            <img src={recipe.recipeId.image} alt={recipe.recipeId.name} className={styles.recipeImage} />
            <div className={styles.recipeInfo}>
            <div style={{display:'flex',justifyContent:"space-between"}}>
              <h2 className={styles.recipeName}>{recipe.recipeId.name}</h2>
              <div style={{fontSize:"20px",height:"32px",width:"32px",borderRadius:"50%",border:"1px solid black",display:"flex",justifyContent:"center",cursor:"pointer"}} onClick={()=> removeFromFavourites(recipe.recipeId._id)}>🗑️</div>
              </div>
              <p>Prep Time: {recipe.recipeId.prepTimeMinutes} minutes</p>
              <p>Difficulty: {recipe.recipeId.difficulty}</p>
              <p>Rating: {recipe.recipeId.rating} ({recipe.recipeId.reviewCount} reviews)</p>
              <p>Meal Type: {recipe.recipeId.mealType}</p>
              <div className={styles.recipeTags}>
                {recipe.recipeId.tags.map((tag, idx) => (
                  <span className={styles.tag} key={idx}>{tag}</span>
                ))}
              </div>
              <Link to={`/recipe/${recipe.recipeId._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <div
              style={
                {
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "15%",
                  marginTop:"15px",
                  width: "100%",
                  cursor: "pointer",
                  backgroundColor: "#f5f5f5",
                  borderRadius: "5px",
                  fontSize: "20px",
                  fontWeight: "bold",
                  color: "#333"
                }
              }
              >see more..</div>
          </Link>
          <button onClick={() => shareRecipe(recipe.recipeId)} className={styles.shareButton}>Share</button>
            </div>
          </div>
        ))}
      </div>
      </>
      )}
    </div>
  );
};

export default Favorites;
