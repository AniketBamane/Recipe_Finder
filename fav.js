//function to retrieve favorite recipes from localStorage
function getFavoriteRecipes() {
    return JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
}

//function to display fav recipes
function displayFavoriteRecipes(recipes) {
    const favoritesContainer = document.getElementById('favorites-container');
    favoritesContainer.innerHTML = '';

    recipes.forEach(recipe => {
        const recipeCard = document.createElement('div');
        recipeCard.classList.add('recipe-card');
        recipeCard.innerHTML = `
            <img src="${recipe.image}" alt="${recipe.title}">
            <div class="recipe-card-content">
                <h3>${recipe.title}</h3>
                <div class="details">
                    <p>Prep Time: ${recipe.prepTime} minutes</p>
                    <p>Difficulty: ${recipe.difficulty}</p>
                    <p>Rating: ${recipe.rating} (${recipe.reviewCount} reviews)</p>
                    <p>Meal Type: ${recipe.mealType}</p>
                </div>
                <div class="tags">
                    ${recipe.tags.map(tag => `<span>${tag}</span>`).join('')}
                </div>
            </div>
        `;
        recipeCard.addEventListener('click', () => openRecipeDetails(recipe));
        favoritesContainer.appendChild(recipeCard);
    });
}

//function to open recipe details 
function openRecipeDetails(recipe) {
    const recipeDetailsWindow = window.open('', '_blank');
    recipeDetailsWindow.document.write(`
        <html>
        <head>
            <title>${recipe.title}</title>
            <link rel="stylesheet" href="styles.css">
        </head>
        <body>
            <h1>${recipe.title}</h1>
            <img src="${recipe.image}" alt="${recipe.title}">
            <p>Prep Time: ${recipe.prepTime} minutes</p>
            <p>Difficulty: ${recipe.difficulty}</p>
            <p>Rating: ${recipe.rating} (${recipe.reviewCount} reviews)</p>
            <p>Meal Type: ${recipe.mealType}</p>
            <div class="tags">
                ${recipe.tags.map(tag => `<span>${tag}</span>`).join('')}
            </div>
        </body>
        </html>
    `);
}

//function to filter recipes based on search 
function filterRecipes(searchTerm) {
    const favoriteRecipes = getFavoriteRecipes();
    const filteredRecipes = favoriteRecipes.filter(recipe =>
        recipe.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    displayFavoriteRecipes(filteredRecipes);
}

//initialize fav recipes on page 
document.addEventListener('DOMContentLoaded', () => {
    const favoriteRecipes = getFavoriteRecipes();
    displayFavoriteRecipes(favoriteRecipes);

    //event listener for the search bar
    document.querySelector('.search-input').addEventListener('input', (e) => {
        filterRecipes(e.target.value);
    });

    //event listener for the Favorites link
    const favoritesLink = document.getElementById('favorites-link');
    favoritesLink.addEventListener('click', (event) => {
        event.preventDefault(); 
        if (window.location.pathname.endsWith('fav.html')) {
            window.location.reload(); 
        } else {
            window.location.href = 'fav.html'; 
        }
    });
});
