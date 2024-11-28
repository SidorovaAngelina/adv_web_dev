<script>
import axios from 'axios';

export default {
    data() {
        return {
            info: null,
            bitcoinCount: 0,
            loading: true,
            errored: false
        };
    },
    filters: {
        currencydecimal(value) {
            return value.toFixed(2);
        }
    },
    mounted() {
        axios
            .get('https://api.coindesk.com/v1/bpi/currentprice.json')
            .then(response => {
                this.info = response.data.bpi;
            })
            .catch(error => {
                console.log(error);
                this.errored = true;
            })
            .finally(() => {
                this.loading = false;
            });
    },
    methods: {
        calculateValue(rate) {
            return this.bitcoinCount * rate;
        }
    }
};
</script>

<template>
    <div class="wrapper">
        <h1>Bitcoin Price Index</h1>

        <section v-if="errored">
            <p>We're sorry, we're not able to retrieve this information at the moment, please try back later</p>
        </section>

        <section v-else>
            <div v-if="loading">Loading...</div>

            <div v-else>
                <label for="bitcoinCount">Введите количество, которое вы хотите приобрести:  </label>
                <input
                    type="number"
                    id="bitcoinCount"
                    v-model.number="bitcoinCount"
                    min="0"
                />

                <div v-if="bitcoinCount > 0">
                    <h2>Стоимость в разных валютах:  </h2>
                    <div
                        v-for="currency in info"
                        :key="currency.code"
                        class="currency"
                    >
                        {{ currency.description }}:
                        <span class="lighten">
                            <span v-html="currency.symbol"></span>
                            {{ calculateValue(currency.rate_float) | currencydecimal }}
                        </span>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<style scoped>
.wrapper {
    width: 600px;
    height: 250px;
    border-radius: 50px;
    padding: 20px;
    background: #1f0f24;
    text-align: center;
    color: #fff;
}

.currency {
    margin: 10px 0;
    font-size: 18px;
}

.lighten {
    color: #c1bbbb;
}

.error {
    color: #d03939;
}

input[type="number"] {
    margin-top: 20px;
    padding: 5px;
    font-size: 16px;
    width: 80px;
}
</style>