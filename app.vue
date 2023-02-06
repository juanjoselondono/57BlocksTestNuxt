<script setup>
import { VueCookieNext } from 'vue-cookie-next'
</script>

<template>
    <RouterView />
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
    beforeMount() {
        var authorized = Boolean(VueCookieNext.getCookie('authenticated'))
        if (authorized) {
            this.authenticated = true
        } else {
            this.$router.replace({ path: '/login' })
        }
        this.authenticated = authorized
        console.log('authorized', authorized)
    },
}
</script>
