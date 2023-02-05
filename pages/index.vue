<script setup>
import NavBar from '../components/NavBar.vue'
import { VueCookieNext } from 'vue-cookie-next'
import fetchPokemon from '../utils/fetchPokemons'
import Pokemon from '../components/PokemonUnit.vue'
</script>
<template>
    <div class="home_container">
        <NavBar>
            <template v-slot:logout="{ onClick }">
                <button
                    @click="onClick"
                    type="button"
                    class="btn button-slot btn-success"
                >
                    Logout
                </button>
            </template>
        </NavBar>
        <div class="pokemon-grid">
            <Pokemon
                v-for="item in pokeList"
                :key="item.url"
                :pokemon="item"
            ></Pokemon>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            pokeList: {
                default: [],
            },
        }
    },
    methods: {
        logout() {
            console.log('removed')
            VueCookieNext.removeCookie('authenticated')
            this.$router.replace({ path: '/login' })
        },
        async fetchData() {
            var response = await fetchPokemon()
            this.pokeList = response.results
            console.log(response.results)
        },
    },
    beforeMount() {
        // watch the params of the route to fetch the data again
        this.$watch(
            () => this.$route.params,
            () => {
                this.fetchData()
            },
            // fetch the data when the view is created and the data is
            // already being observed
            { immediate: true }
        )
    },
}
</script>
<style>
.home_container {
    overflow-x: hidden; /* Hide scrollbars */
    width: 100%;
}
.pokemon-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    justify-items: space-evenly;
    align-items: center;
}
.button-slot {
    margin-right: 20px;
}
@media only screen and (max-width: 600px) {
    .pokemon-grid {
        display: grid;
        grid-template-columns: 1fr;
    }
    .button-slot {
        margin-top: 20px;
    }
}
</style>
