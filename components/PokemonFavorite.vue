<script setup>
    import pokemonData from '../utils/pokemonData.js'
</script>
<template lang="">
        <router-link
        :to="link"
        target="_blank"
        class="card pokemon-container"
        >
            <img class="card-img-top pokemon-img" :src="pokemonImage" alt="Card image cap"/>
            <div class="card-body">
                <h5 class="card-title pokemon-title">{{pokemon}}</h5>
            </div>
        </router-link>
</template>
<script>
export default {
    props:["pokemon"],
    data(){
        return{
            pokemonImage : ''
        }
    },
    methods:{
        async fetchData() {
            var response = await pokemonData(this.pokemon)
            this.pokemonImage = response.sprites.other.dream_world.front_default
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
    computed: {
        link() {
            return `/details/${this.pokemon}`
        },
    },
}
</script>
<style>
    .pokemon-img{
        width: 20vh;
        justify-self: center;
        align-self: center;
    }
    .pokemon-title{
        justify-self: center;
        align-self: center;
        text-align: center;
    }
    .pokemon-container{
        margin: 5%;
    }
</style>