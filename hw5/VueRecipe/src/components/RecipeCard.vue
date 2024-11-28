<template>
    <div class="recipe-card">
      <h3>{{ recipe.title }}</h3>
      <img :src="recipe.image" :alt="recipe.title" />
      <p>Время приготовления: {{ recipe.readyInMinutes }} минут</p>
      <p>Количество порций: {{ recipe.servings }}</p>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      recipe: Object,
    },
  };
  </script>
  
  <style scoped>
  .recipe-card {
    background: rgba(255, 255, 255, 0.689);
    border: 1px solid #ddd;
    border-radius: 5px;
    padding: 15px;
    width: calc(33.333% - 20px);
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
}

.recipe-card img {
  max-width: 100%;
  border-radius: 5px;
}
</style>