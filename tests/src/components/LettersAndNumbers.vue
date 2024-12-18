<template>
  <div>
    <!-- Правила игры -->
    <div v-if="!gameStarted && !gameOver" class="rules-modal">
      <h1>"Буквы и цифры" - это игра на развитие логики и реакции.</h1>
      <p>На экране будет появляться объект - комбинация из буквы и цифры, а также вопрос.</p>
      <p>Если объект находится на розовом фоне, ответьте на вопрос - Является ли буква гласной.</p>
      <p>Если объект находится на голубом фоне, ответьте на вопрос - Является ли цифра четной.</p>
      <p>Для этого используйте стрелки на клавиатуре или кнопки да/нет на экране.</p>
      <p>Длительность игры: 60 секунд. Постарайтесь за это время набрать как можно больше очков.</p>
      <button @click="startGame">Начать игру</button>
    </div>

    <!-- Игра -->
    <div v-if="gameStarted && !gameOver" class="game-container">
      <div class="score">Счет: {{ score }}</div>
      <div class="time">Оставшиеся секунды: {{ time }}</div>
      
      <div class="field"> 
        <div class="current-field" :style="{ backgroundColor: fieldColor }">
          <p v-if="currentField">Четное ли число?</p>
          <p v-else>Является ли буква гласной?</p>
          <p>{{ currentCombo }}</p>
        </div>
      </div>
      
      <div class="answer">{{ answer }}</div>
      <div class="controls">
        <button @click="handleAnswer(false)">Нет</button>
        <button @click="handleAnswer(true)">Да</button>
      </div>
    </div>

    <!-- Сообщение об окончании игры, с выводом результата -->
    <div v-if="gameOver" class="game-over">
      Игра окончена! Результат: {{ score }} баллов
      <button class="restart-button" @click="restartGame">Пройти заново</button>      
    </div>
  </div>
</template>

<script>
import '@/assets/test2.css';

export default {
  name: 'LettersAndNumbers',
  data() {
    return {
      gameStarted: false,
      score: 0,
      time: 60,
      gameOver: false,
      timer: null,
      currentCombo: '',
      currentField: true,
      answer: '',
      correctAnswer: false,
      fieldColor: '',
      isAnswering: false
    };
  },
  methods: {
    // Начало игры
    startGame() {
      this.gameStarted = true;
      this.score = 0;
      this.time = 60;
      this.gameOver = false;
      this.answer = '';
      this.nextRound();
      this.startTimer();
      window.addEventListener('keydown', this.handleKeydown);
    },
    
    // Переход к след раунду
    nextRound() {
      const letters = 'АБВГДЕЁЖИЙКЛМНОПРСТУФХЦЧШЩЫЭЮЯ';
      const randomLetter = letters.charAt(Math.floor(Math.random() * letters.length));
      const randomNumber = Math.floor(Math.random() * 9) + 1;
      this.currentCombo = `${randomLetter}${randomNumber}`;
      this.currentField = Math.random() > 0.5;

      // Устанавливаем цвет фона в зависимости от типа вопроса
      if (this.currentField) {
        this.fieldColor = 'lightblue'; 
        this.correctAnswer = (randomNumber % 2 === 0);
      } else {
        this.fieldColor = 'lightpink';
        this.correctAnswer = ['А', 'Е', 'Ё', 'И', 'О', 'У', 'Ы', 'Э', 'Ю', 'Я'].includes(randomLetter);
      }
    },

    // Ответ пользователя
    handleAnswer(userAnswer) {
      if (userAnswer === this.correctAnswer) {
        this.score += 50;
        this.answer = 'Правильно!';
      } else {
        this.answer = 'Неправильно!';
      }
      
      // Блокируем возможность отвечать на время задержки
      this.isAnswering = true; 
      setTimeout(() => {
        this.answer = '';
        this.isAnswering = false;
        this.nextRound();
      }, 1000);
    },

    // Метод для обработки нажатий клавиш
    handleKeydown(event) {
      if (this.gameOver || this.isAnswering) return;

      if (event.key === 'ArrowLeft') {
        this.handleAnswer(false);
      } else if (event.key === 'ArrowRight') {
        this.handleAnswer(true);
      }
    },

    // запуск таймера
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

  // уничтожение
  beforeDestroy() {
    clearInterval(this.timer);
    window.removeEventListener('keydown', this.handleKeydown);
  }
}
</script>