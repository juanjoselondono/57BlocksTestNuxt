<script setup>
    import fetchPokemon from '../utils/fetchPokemons';
    import Pokemon from './PokemonUnit.vue';
</script>
<template>
    <div>
        <nav aria-label="Page navigation example">
            <ul class="pagination justify-content-center">
                <li class="page-item"><button @click="changePrevious()" class="page-link">Previous</button></li>
                <li :key="page" class="page-item" v-for="page in arrayOfPages">
                    <button @click="changePage(page)"  class="page-link">{{page}}</button>
                </li>
                <li class="page-item">
                    <button @click="changeNext()" class="page-link">Next</button>
                </li>
            </ul>
        </nav>
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
    data(){
        return {
            currentPage: 1, 
            pages: 5,
            pokeList: {
                default: [],
            },
            limit: 20,
            previous: 1
        }
    },
    watch: {
        // whenever page changes, this function will run
        currentPage(newPage, oldPage) {
            this.previous = oldPage
            this.currentPage = newPage
            console.log('current page', this.currentPage)
        }
    },
    methods:{
        changePage(page){
            this.currentPage = page
            this.fetchData(this.limit, this.limit*(this.currentPage-1))
        },
        changePrevious(){
            this.fetchData(this.limit, this.limit*(this.previous-1))
        },
        changeNext(){
            this.fetchData(this.limit, this.limit*(this.currentPage))
            this.currentPage = this.currentPage+1
        },
        async fetchData(limit, offset) {
            console.log(`limit: ${limit}, offset: ${offset}`)
            var response = await fetchPokemon(limit, offset)
            this.pokeList = response.results
            //console.log(response.results)
        }
    },
    computed:{
        arrayOfPages(){
            return Array.from({length: this.pages}, (x, i) => i+1);
        }
    },
    mounted(){
        console.log(this.arrayOfPages)
    },
    beforeMount() {
        // watch the params of the route to fetch the data again
        this.$watch(
            () => this.$route.params,
            () => {
                this.fetchData(20, 0)
            },
            // fetch the data when the view is created and the data is
            // already being observed
            { immediate: true }
        )
    },
}
</script>
<style>
    .pokemon-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        justify-items: space-evenly;
        align-items: center;
    }
</style>