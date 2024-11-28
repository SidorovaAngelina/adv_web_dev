<script>
import axios from 'axios'

export default {
    data() {
        return {
            region: "",
            error: "",
            averageTemp: null,
            cities: {
                Europe: ["Мадрид", "Берлин", "Рим", "Вена", "Париж"],
                Asia: ["Пекин", "Сеул", "Бангкок", "Токио", "Джакарта"],
                NorthAmerica: ["Мехико", "Лос-Анджелес", "Гавана", "Торонто", "Кингстон"],
                SouthAmerica: ["Рио-де-Жанейро", "Сан-Паулу", "Буэнос-Айрес", "Лима", "Богота"],
                Africa: ["Лагос", "Каир", "Киншаса", "Йоханнесбург", "Кейптаун"],
                Australia: ["Канберра", "Сидней", "Мельбурн", "Брисбен", "Перт"]
            }
        }
    },
    computed: {
        showAverageTemp() {
            return "Средняя температура: " + this.averageTemp.toFixed(1) + "°C";
        }
    },
    methods: {
        getWeather() {
            const chosenCities = this.cities[this.region];
            const requests = chosenCities.map(city => 
                axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=5a47038b248bfb215ed3b42d2468884d`)
            );
            
            axios.all(requests)
                .then(axios.spread((...responses) => {
                    const totalTemp = responses.reduce((sum, res) => sum + res.data.main.temp, 0);
                    this.averageTemp = totalTemp / responses.length;
                    this.error = "";
                }))
                .catch(error => {
                    this.error = error.message;
                    this.averageTemp = null;
                });
        }
    }
}
</script>

<template>
    <div class="wrapper">
        <h1>Погодное приложение</h1>
        <p>Выберите регион:</p>
        <select v-model="region" @change="getWeather">
            <option value="Europe">Европа</option>
            <option value="Asia">Азия</option>
            <option value="NorthAmerica">Северная Америка</option>
            <option value="SouthAmerica">Южная Америка</option>
            <option value="Africa">Африка</option>
            <option value="Australia">Австралия</option>
        </select>
        <p class="error">{{ error }}</p>
        <div v-if="averageTemp !== null">
            <p>{{ showAverageTemp }}</p>
        </div>
    </div>
</template>

<style scoped>
.error {
    color: #ca2c2c;
}

.wrapper {
    width: 600px;
    height: 250px;
    border-radius: 50px;
    padding: 20px;
    background: #1f0f24;
    text-align: center;
    color: #fff;
}

.wrapper h1 {
    margin-top: 15px;
}

.wrapper p {
    margin-top: 30px;
}

.wrapper select {
    margin-top: 30px;
    background: #ffd5fd;
    border: 2px solid #110813;
    color: #000;
    font-size: 14px;
    padding: 5px 8px;
    outline: none;
}
</style>