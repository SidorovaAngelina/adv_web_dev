<template>
  <div>
    <!-- Правила игры. -->
    <div v-if="!gameStarted && !gameOver" class="rules-modal">
      <h1>"Аэропорт" - это игра на развитие переключения внимания.</h1>
      <p>Укажите, куда летит самолет на синем фоне и откуда летит самолет на красном фоне.</p>
      <p>Для этого используйте стрелки на клавиатуре.</p>
      <p>Длительность игры: 60 секунд. Постарайтесь за это время набрать как можно больше очков.</p>
      <button @click="startGame">Начать игру</button>
    </div>
    
    <!-- Игра. -->
    <div v-if="gameStarted && !gameOver" class="game-container">
      <div class="score">Счет: {{ score }}</div>
      <div class="time">Оставшиеся секунды: {{ time }}</div>
      <div class="question">{{ question }}</div>
      <div class="circle" :style="{ backgroundColor: circleColor }">
        <img :class="planeDirection" src="/plane.png" alt="Самолет">
      </div>
      <div class="answer">{{ answer }}</div>
    </div>
    
    <!-- Сообщение об окончании игры, с выводом результата. -->
    <div v-if="gameOver" class="game-over">
      Игра окончена! Результат: {{ score }} баллов
      <button class="restart-button" @click="restartGame">Пройти заново</button>
    </div>
  </div>
</template>

<script>
import '@/assets/test1.css';

export default {
  name: 'Airport',
  data() {
    return {
      gameStarted: false,
      circleColor: 'blue',
      score: 0,
      planeDirection: 'plane-up',
      correctKey: '',
      answer: '',
      time: 60,
      gameOver: false, 
      timer: null,
      isKeyPressAllowed: true
    }
  },
  computed: { 
    question() {
      return this.circleColor === 'blue' ? 'Куда летит самолет?' : 'Откуда летит самолет?';
    }
  },
  methods: {
    // Начало игры
    startGame() {
      this.gameStarted = true;
      this.score = 0;
      this.time = 60;
      this.gameOver = false;
      this.answer = '';
      this.isKeyPressAllowed = true;
      window.addEventListener('keydown', this.handleKeydown);
      this.generateRandomDirection();
      this.startTimer();
    },
    
    // Обработка нажатия клавиш
    handleKeydown(event) {
      event.preventDefault();
      if (this.gameOver || !this.isKeyPressAllowed) return;
  
      if (event.key === this.correctKey){ 
      this.handleCorrectAnswer();
      } else {
        this.handleIncorrectAnswer();
      }

      this.isKeyPressAllowed = false; 
      // Задержка перед началом след раунда
      setTimeout(() => { 
        this.answer = '';
        this.generateRandomDirection();
        this.isKeyPressAllowed = true;
      }, 1000);
    },

    handleCorrectAnswer() {
      this.score += 50;
      this.answer = 'Правильно!';
    },

    handleIncorrectAnswer() {
      this.answer = 'Неправильно!'; 
    },

    // Генерация случайного направления самолета
    generateRandomDirection() {
      const directions = ['up', 'down', 'left', 'right'];
      const randomDirection = this.getRandomDirection(directions);
      this.planeDirection = `plane-${randomDirection}`;
      this.circleColor = this.getRandomColor();
      this.correctKey = this.getCorrectKey(randomDirection);
    },
    
    // Получение случайного направления из массива
    getRandomDirection(directions) {
      return directions[Math.floor(Math.random() * directions.length)];
    },
    
    // Генерация цвета - красный или синий
    getRandomColor() {
      return Math.random() > 0.5 ? 'blue' : 'red';
    },
    
    // Получение правильной клавиши в зависимости от направления и цвета круга
    getCorrectKey(direction) {
      const oppositeDirections = {
        up: 'down', 
        down: 'up',
        left: 'right',
        right: 'left'
      };

      // Определение правильного ответа, зависящее от цвета круга
      const keyDirection = this.circleColor === 'blue' ? direction : oppositeDirections[direction]; 
      return `Arrow${keyDirection.charAt(0).toUpperCase() + keyDirection.slice(1)}`;
    },
    
    // Запуск таймера
    startTimer() {
      this.timer = setInterval(() => { 
        if (this.time > 0) {
          this.time -= 1;
        } else {
          this.gameOver = true;
          clearInterval(this.timer);
        }
      }, 1000);
    },

    // Перезапуск игры
    restartGame() {
      this.startGame();
    }
  },
  
  // Очистка перед уничтожением компонента
  beforeDestroy() {
    clearInterval(this.timer);
    window.removeEventListener('keydown', this.handleKeydown);
  }
}
</script>