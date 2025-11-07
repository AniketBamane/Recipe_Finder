const mongoose = require('mongoose');
const Recipe = require('./Model/recipeModel');
require('dotenv').config();

const sampleRecipes = [
  {
    id: 1, name: "Spaghetti Carbonara", ingredients: ["spaghetti", "eggs", "bacon", "parmesan", "black pepper"],
    instructions: ["Boil pasta", "Cook bacon", "Mix eggs and cheese", "Combine all"], prepTimeMinutes: 15,
    cookTimeMinutes: 20, servings: 4, difficulty: "Medium", cuisine: "Italian", caloriesPerServing: 450,
    tags: ["pasta", "italian", "dinner"], userId: 1, image: "https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=400",
    rating: 4.5, reviewCount: 120, mealType: ["Dinner"]
  },
  {
    id: 2, name: "Chicken Tikka Masala", ingredients: ["chicken", "tomatoes", "cream", "spices", "onions"],
    instructions: ["Marinate chicken", "Cook chicken", "Make sauce", "Combine"], prepTimeMinutes: 30,
    cookTimeMinutes: 25, servings: 6, difficulty: "Medium", cuisine: "Indian", caloriesPerServing: 380,
    tags: ["chicken", "indian", "spicy"], userId: 1, image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400",
    rating: 4.7, reviewCount: 95, mealType: ["Dinner"]
  },
  {
    id: 3, name: "Caesar Salad", ingredients: ["romaine lettuce", "croutons", "parmesan", "caesar dressing"],
    instructions: ["Wash lettuce", "Make dressing", "Toss ingredients"], prepTimeMinutes: 10,
    cookTimeMinutes: 0, servings: 2, difficulty: "Easy", cuisine: "American", caloriesPerServing: 250,
    tags: ["salad", "healthy", "vegetarian"], userId: 1, image: "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400",
    rating: 4.2, reviewCount: 78, mealType: ["Lunch"]
  }
];

// Generate 100 recipes by repeating and modifying the sample recipes
const generateRecipes = () => {
  const recipes = [];
  const cuisines = ["Italian", "Indian", "American", "Mexican", "Chinese", "French", "Thai", "Japanese"];
  const difficulties = ["Easy", "Medium", "Hard"];
  const mealTypes = [["Breakfast"], ["Lunch"], ["Dinner"], ["Snack"], ["Breakfast", "Lunch"]];
  
  for (let i = 1; i <= 100; i++) {
    const baseRecipe = sampleRecipes[i % 3];
    recipes.push({
      ...baseRecipe,
      id: i,
      name: `${baseRecipe.name} ${i}`,
      cuisine: cuisines[i % cuisines.length],
      difficulty: difficulties[i % difficulties.length],
      mealType: mealTypes[i % mealTypes.length],
      rating: Math.round((Math.random() * 2 + 3) * 10) / 10,
      reviewCount: Math.floor(Math.random() * 200) + 10,
      caloriesPerServing: Math.floor(Math.random() * 400) + 200,
      prepTimeMinutes: Math.floor(Math.random() * 30) + 10,
      cookTimeMinutes: Math.floor(Math.random() * 45) + 15
    });
  }
  return recipes;
};

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');
    
    await Recipe.deleteMany({});
    console.log('Cleared existing recipes');
    
    const recipes = generateRecipes();
    await Recipe.insertMany(recipes);
    console.log('Seeded 100 recipes successfully');
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();