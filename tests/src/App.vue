<template>
  <div id="app">
    <div class="buttons">
      <!-- Генерация кнопок для переклюяения между играми -->
      <button 
        v-for="game in games" 
        :key="game" 
        class="button" 
        @click="playGame(game)"
      >
        {{ game.label }}
      </button>
    </div>
    <Airport v-if="currentGame === 'Airport'"></Airport>
    <LettersAndNumbers v-if="currentGame === 'LettersAndNumbers'"></LettersAndNumbers>
  </div>
</template>

<script>
import '@/assets/base.css';
import Airport from './components/Airport.vue'
import LettersAndNumbers from './components/LettersAndNumbers.vue'

export default {
  components: {
    Airport,
    LettersAndNumbers,
  },
  data() {
    return {
      games: [
        { name: 'Airport', label: 'Аэропорт' },
        { name: 'LettersAndNumbers', label: 'Буквы и цифры' },
        { name: 'Game3', label: 'Игра 3' },
      ],
      currentGame: null
    }
  },
  methods: {
    //Переключение меду играми
    playGame(game) {
      this.currentGame = game.name;
    }
  }
}
</script>