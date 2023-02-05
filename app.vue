<script setup>
import { VueCookieNext } from 'vue-cookie-next'
</script>

<template>
    <RouterView class="router_view" />
</template>
<script>
export default {
    name: 'App',
    emits: ['authenticated'],
    data() {
        return {
            authenticated: false,
        }
    },
    methods: {
        setAuthenticated() {
            this.$emit('authorized', this.authenticated)
        },
    },
    mounted() {
        var authorized = Boolean(VueCookieNext.getCookie('authenticated'))
        this.authenticated = authorized
        console.log('authorized', authorized)
        if (authorized) {
            this.authenticated = true
        } else {
            this.$router.replace({ path: '/login' })
        }
    },
}
</script>

<style>
  .router_view{
    height: 100%;
  }
  #__nuxt{
    height: 100%;
  }
</style>
