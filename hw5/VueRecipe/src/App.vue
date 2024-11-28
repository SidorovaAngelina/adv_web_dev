<template>
  <div class="container">
    <h1>Кулинарные идеи - Итальянская кухня.</h1>
    
    <div class="search-sort-container">
      <input 
        type="text" 
        v-model="searchQuery" 
        placeholder="Поиск по рецептам..." 
        class="search-input"
      />

      <select v-model="sortField" class="sort-select">
        <option value="" disabled selected>Сортировать</option>
        <option value="servings">По количеству порций</option>
        <option value="readyInMinutes">По времени приготовления</option>
      </select>
    </div>

    <div class="recipe-container">
      <RecipeCard
        v-for="recipe in filteredRecipes"
        :key="recipe.id"
        :recipe="recipe"
      />
      <p v-if="filteredRecipes.length === 0">Нет доступных рецептов.</p>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue';
import RecipeCard from './components/RecipeCard.vue';

export default {
  components: {RecipeCard},
  setup() {
    const recipes = ref([]);
    const sortField = ref('');
    const searchQuery = ref('');

    const fetchRecipes = async () => {
      const apiKey = '77bdfe2494fe4d928cdea68c770398ed';
      const apiUrl = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&addRecipeInformation=true&cuisine=Italian`;
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error('Сеть ответила с ошибкой: ' + response.status);
        const data = await response.json();
        recipes.value = data.results.slice(0, 9);
      } catch (error) {
        console.error('Ошибка при получении данных:', error);
      }
    };

    const filteredRecipes = computed(() => {
      let filtered = recipes.value;

      // Фильтрация по запросу поиска (по первым буквам)
      if (searchQuery.value) {
        filtered = filtered.filter(recipe =>
          recipe.title.toLowerCase().startsWith(searchQuery.value.toLowerCase())
        );
      }

      // Сортировка по выбранному полю
      if (sortField.value) {
        filtered = [...filtered].sort((a, b) => a[sortField.value] - b[sortField.value]);
      }

      return filtered;
    });

    onMounted(fetchRecipes);

    return { recipes, sortField, searchQuery, filteredRecipes };
  },
};
</script>

<style>
@import './assets/styles.css';
</style>