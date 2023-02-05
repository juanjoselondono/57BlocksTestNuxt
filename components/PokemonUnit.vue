<script setup>
import pokemonData from '../utils/pokemonData.js'
</script>
<template lang="">
    <div v-if="pokemonImage != ''" class="pokemons_container">
        <router-link
            :to="link"
            target="_blank"
            class="card pokemons_container_item"
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
    margin-top: 5%;
    width: 40vh;
    padding: 10px;
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
@media only screen and (max-width: 600px) {
    .pokemons_container_item {
        width: 30vh;
        padding: 5px;
    }
}
</style>
