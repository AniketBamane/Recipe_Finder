import React, {  useEffect, useState, useRef } from 'react';
import home from '../styles/homepage.module.css';
import Navbar from './Navbar';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { useRecipeContext } from '../store/recipeContext';
import LoadingDots from '../components/LoadingDots';
import LoadingSkeleton from '../components/LoadingSkeleton';

const HomePage = () => {
  const [recipes, setRecipes] = useState([]);
  const { token } = useRecipeContext()
  const [skip, setSkip] = useState(0); // items to skip
  const [loading, setLoading] = useState(false); // loading state
  const [hasMore, setHasMore] = useState(true); // track if more recipes are available
  const [searchQuery, setSearchQuery] = useState(""); // state for search query
  const loader = useRef(null);
  const input = useRef(null);

  const addtoFavourite = async (recipeId) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/favourite/addtofavourite`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ recipeId })
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
          duration: 1000,
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

  const getAllRecipes = async (skip, search) => {
    setLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/recipe/getallrecipes?limit=8&skip=${skip}&search=${search}`, {
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
            background: "#FF474C",
            color: "white",
          },
        });
      } else {
        if (data.length === 0) {
          setHasMore(false); // No more recipes to load
        } else {
          setRecipes((prevRecipes) => search?  data: [...prevRecipes, ...data]); // append new recipes or reset on new search
        }
      }
    } catch (err) {
      toast.error(err.message, {
        duration: 2000,
        style: {
          background: "#FF474C",
          color: "white",
        },
      });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    input.current.focus()
    // setSkip(0); // Reset skip when search query changes
    // setHasMore(true); // Reset hasMore when search query changes
     if(!searchQuery){
      getAllRecipes(skip, searchQuery);
     } else{
        getAllRecipes(0, searchQuery);
     }// Fetch with search query
  }, [searchQuery,skip]);

  useEffect(() => {
 if(!searchQuery)
    {   const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !loading && hasMore) {
        setSkip((prevSkip) => prevSkip + 8);
      }
    }, {
      threshold: 1.0,
    });
    if (loader.current) {
      observer.observe(loader.current);
    }
    return () => {
      if (loader.current) {
        observer.unobserve(loader.current);
      }
    };}
  }, [loading, hasMore]);

  // New share function
  const shareRecipe = (recipe) => {
    const recipeUrl = `${window.location.protocol}//${window.location.host}/recipe/${recipe._id}`;
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

  return (
    <div className={home.homepage}>
      <Navbar />
      <input
      ref={input}
        type="text"
        className={home.searchBox}
        placeholder="Search recipes..."
        value={searchQuery}
        onChange={(e) => {
          if(e.target.value == ""){
            window.location.reload();
          }else{
            setSearchQuery(e.target.value)
          }
        }} // Update search query
      />
      <div className={home.recipeCardsContainer}>
        {recipes.map((recipe, index) => (
          <div className={home.recipeCard} key={index}>
            <img src={recipe.image} alt={recipe.name} className={home.recipeImage} />
            <div className={home.recipeInfo}>
              <div style={{ display: 'flex', justifyContent: "space-between" }}>
                <h2 className={home.recipeName}>{recipe.name}</h2>
                <div style={{
                  fontSize: "20px",
                  height: "30px",
                  width: "30px",
                  borderRadius: "50%",
                  border: "1px solid black",
                  display: "flex",
                  justifyContent: "center",
                  cursor: "pointer"
                }} onClick={() => addtoFavourite(recipe._id)}>❤️</div>
              </div>
              <p>Prep Time: {recipe.prepTimeMinutes} minutes</p>
              <p>Difficulty: {recipe.difficulty}</p>
              <p>Rating: {recipe.rating} ({recipe.reviewCount} reviews)</p>
              <p>Meal Type: {recipe.mealType}</p>
              <div className={home.recipeTags}>
                {recipe.tags.map((tag, idx) => (
                  <span className={home.tag} key={idx}>{tag}</span>
                ))}
              </div>
              <Link to={`recipe/${recipe._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "15%",
                    marginTop: "15px",
                    width: "100%",
                    cursor: "pointer",
                    backgroundColor: "#f5f5f5",
                    borderRadius: "5px",
                    fontSize: "20px",
                    fontWeight: "bold",
                    color: "#333"
                  }}
                >
                  see more..
                </div>
              </Link>
              <button onClick={() => shareRecipe(recipe)} className={home.shareButton}>Share</button>
            </div>
          </div>
        ))}
      </div>
      {loading && <LoadingDots />}
      <div ref={loader} />
    </div>
  );
};

export default HomePage;
