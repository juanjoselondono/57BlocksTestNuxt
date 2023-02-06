<script setup>
    import pokemonData from '../utils/pokemonData.js'
</script>
<template lang="">
        <router-link
        :to="link"
        target="_blank"
        class="card" style="margin: 5%"
        >
            <img class="card-img-top" :src="pokemonImage" alt="Card image cap"/>
            <div class="card-body">
                <h5 class="card-title">{{pokemon}}</h5>
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
<style lang="">
    
</style>