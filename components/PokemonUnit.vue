<script setup>
    import pokemonData from '../utils/pokemonData.js'
    import { VueCookieNext } from 'vue-cookie-next'
</script>
<template lang="">
    <div v-if="pokemonImage != ''" class="pokemons_container">
        <div class="card pokemons_container_item">
            <router-link
                :to="link"
                target="_blank"
            >
            <img :src="pokemonImage" class="card-img-top" alt="..." />
                <div class="card-body">
                    <h5 class="card-title">{{ pokemon.name }}</h5>
                    <ul class="poke_details_list">
                        <p class="card-text">Type : {{ pokemonTypes }}</p>
                        <p class="card-text">Ability : {{ pokemonAbility }}</p>
                    </ul>
                </div>
            </router-link>
            <button v-if = "!favorite" @click="addFavorite()" type="button" class="btn btn-outline-success favorite_button">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-circle" viewBox="0 0 16 16">
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                </svg>
                Favorites
            </button>
            <button v-if = "favorite" @click="removeFavorite()" type="button" class="btn btn-outline-danger favorite_button">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle" viewBox="0 0 16 16">
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                </svg>
                Favorites
            </button>
            <svg v-if ="favorite" xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-star-fill star_icon" viewBox="0 0 16 16">
                <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
            </svg>
        </div>
    </div>
</template>
<script>
export default {
    name: 'pokemonUnit',
    props: ['pokemon'],
    data() {
        return {
            pokemonImage: '',
            pokemonTypes: '',
            pokemonAbility: '',
            favorite: false,
            ListFavorites: []
        }
    },
    methods: {
        goToDetails() {
            this.$router.push({ path: `/details/${this.pokemon.name}` })
        },
        async fetchData() {
            var response = await pokemonData(this.pokemon.name)
            this.pokemonImage = response.sprites.other.dream_world.front_default
            this.pokemonTypes = response.types[0].type.name
            this.pokemonAbility = response.abilities[0].ability.name
        },
        addFavorite(){
            this.favorite = true
            //VueCookieNext.removeCookie('favorites')
            //VueCookieNext.setCookie('favorites', JSON.stringify(['carlos', 'emilio']))
            var favorites = JSON.parse(VueCookieNext.getCookie('favorites'))
            if(VueCookieNext.isCookieAvailable('favorites')){
                favorites.push(this.pokemon.name)
                console.log(favorites)
                VueCookieNext.setCookie('favorites', JSON.stringify(favorites))
            }
            else{
                favorites = []
                favorites.push(this.pokemon.name)
                console.log(favorites)
                VueCookieNext.setCookie('favorites', JSON.stringify(favorites))
            }
        },
        removeFavorite(){
            console.log('remove')
            this.favorite = false
            var pokemon = this.pokemon.name
            var filteredPokemon = this.ListFavorites.filter(function(item) {
                return item !== pokemon
            })
            VueCookieNext.setCookie('favorites', JSON.stringify(filteredPokemon))
            console.log(filteredPokemon)
        }
    },
    computed: {
        link() {
            return `/details/${this.pokemon.name}`
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
    mounted(){
        this.ListFavorites = JSON.parse(VueCookieNext.getCookie('favorites'))
        this.ListFavorites.forEach((element)=>{
            if(element == this.pokemon.name){
                this.favorite = true
            }
        })
    }
}
</script>
<style>
.pokemons_container {
    display: flex;
    flex-direction: column;
    justify-items: center;
    align-items: center;
    justify-content: center;
    align-self: center;
}
.pokemons_container_item {
    margin: 5%;
    width: 40vh;
    padding: 10px;
    color: black;
    position: relative;
    justify-items: center;
    align-items: center;
    justify-content: center;
}
.card-text, .card-title{
    color: black;
}
.pokemons_container_item:hover {
    transform: scale(1.05);
    transition: 0.8s;
    cursor: pointer;
    -webkit-box-shadow: 10px 10px 23px -6px rgba(0, 0, 0, 0.75);
    -moz-box-shadow: 10px 10px 23px -6px rgba(0, 0, 0, 0.75);
    box-shadow: 10px 10px 23px -6px rgba(0, 0, 0, 0.75);
}
.poke_details_list {
    text-align: left;
}
.card-img-top{
    height: 30vh;
}
.star_icon{
    justify-self: flex-end;
    align-self: flex-end;
    width: 55px;
    bottom: 10px;
    color: rgb(255, 230, 0);
    position: absolute;
}
.favorite_button{
    width: auto;
    justify-self: center;
    position: relative;
}
@media only screen and (max-width: 1000px) {
    .pokemons_container_item {
        width: 30vh;
        padding: 5px;
    }
}
</style>
