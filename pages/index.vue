<script setup>
    import NavBar from '../components/NavBar.vue'
    import Pagination from '../components/Pagination.vue'
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
        <Pagination
            :totalPages="10"
            :perPage="10"
        />

    </div>
</template>
<script>
export default {
    emits: ['authenticated'],
    data() {
        return {
            pokeList: {
                default: [],
            },
            currentPage: 1,
        }
    },
    methods: {
        logout() {
            console.log('removed')
            VueCookieNext.removeCookie('authenticated')
            this.$router.replace({ path: '/login' })
        },
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
