<script setup>
    import NavBar from '../components/NavBar.vue'
    import { VueCookieNext } from 'vue-cookie-next'
    import Pokemon from '../components/PokemonFavorite.vue';
</script>
<template>
    <div class="home_container">
        <div v-if ="auth">
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
                <template v-slot:favorites="{ onClick }">
                    <li class="nav-item button-slot">
                        <a class="nav-link nav-item" aria-current="page" href="#">favorites</a>
                    </li>
                </template>
            </NavBar>
            <div class = "pokemon-grid">
                <Pokemon
                    v-for="item in pokeList"
                    :key="item"
                    :pokemon="item"
                ></Pokemon>
            </div>
        </div>
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
            auth: false
        }
    },
    methods: {
        logout() {
            console.log('removed')
            VueCookieNext.removeCookie('authenticated')
            this.$router.replace({ path: '/login' })
        },
    },
    mounted() {
        this.auth = Boolean(VueCookieNext.getCookie('authenticated'))
        this.pokeList = JSON.parse(VueCookieNext.getCookie('favorites'))
        console.log(this.pokeList)
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
.nav-item{
    margin-right: 10px;
    align-self: center;
    justify-self: center;
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
