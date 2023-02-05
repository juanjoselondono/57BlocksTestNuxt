<script setup>
    import pokemonData from '../utils/pokemonData.js'
</script>
<template>
    <div class="details_container">
        <div class="details_container_item" style="max-width: 540px">
            <div>
                <img :src="pokemonImage" />
            </div>
            <div>
                <div class="card-body">
                    <h5 class="card-title">{{ $route.params.id }}</h5>
                    <div v-for="item in stats" :key="item.name">
                        <div class="card-text">
                            {{ item.stat.name }}: {{ item.base_stat }}
                            <div
                                class="progress"
                                role="progressbar"
                                aria-label="Success example"
                                aria-valuenow="25"
                                aria-valuemin="0"
                                aria-valuemax="100"
                            >
                                <div
                                    class="progress-bar bg-success"
                                    :style="{ width: `${item.base_stat}%` }"
                                ></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    emits: ['authenticated'],
    data() {
        return {
            stats: [],
            pokemonImage: '',
        }
    },
    methods: {
        async fetchData() {
            var response = await pokemonData(this.$route.params.id)
            this.stats = response.stats
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
}
</script>
<style>
.details_container {
    overflow-x: hidden; /* Hide scrollbars */
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}
.details_container_item {
    display: grid;
    grid-template-rows: 1fr;
    grid-template-columns: 1fr 1fr;
    align-items: center;
    justify-items: center;
    align-content: center;
    justify-content: center;
}
.card-text,
.card-title {
    color: black;
}
@media only screen and (max-width: 600px) {
    .details_container_item {
        grid-template-rows: 1fr 1fr;
        grid-template-columns: 1fr;
    }
}
</style>
