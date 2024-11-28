const apiKey = '77bdfe2494fe4d928cdea68c770398ed';
const apiUrl = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&addRecipeInformation=true&cuisine=Italian`; 

let recipes = [];

async function fetchRecipes() {
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Сеть ответила с ошибкой: ' + response.status);
        }
        const data = await response.json();
        recipes = data.results.slice(0, 9);
        displayRecipes(recipes);
    } catch (error) {
        console.error('Ошибка при получении данных:', error);
    }
}

function displayRecipes(recipes) {
    const container = document.getElementById('recipe-container');
    container.innerHTML = '';

    if (recipes.length === 0) {
        container.innerHTML = '<p>Нет доступных рецептов.</p>';
        return;
    }

    recipes.forEach(recipe => {
        const card = document.createElement('div');
        card.className = 'recipe-card';
        card.innerHTML = `
            <h3>${recipe.title}</h3>
            <img src="${recipe.image}" alt="${recipe.title}">
            <p>Время приготовления: ${recipe.readyInMinutes} минут</p>
            <p>Количество порций: ${recipe.servings}</p>
        `;
        container.appendChild(card);
    });
}

function sortRecipes(field) {
    if (!field) return recipes;

    if (field === 'readyInMinutes') {
        return recipes.sort((a, b) => a.readyInMinutes - b.readyInMinutes);
    } else if (field === 'servings') {
        return recipes.sort((a, b) => a.servings - b.servings);
    }
}

document.getElementById('sort-select').addEventListener('change', (event) => {
    const sortedRecipes = sortRecipes(event.target.value);
    displayRecipes(sortedRecipes);
});

fetchRecipes();