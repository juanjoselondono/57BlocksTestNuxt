<script setup>
import { VueCookieNext } from 'vue-cookie-next'
</script>
<template>
    <nav class="navbar navbar-container navbar-expand bg-body-tertiary">
        <div class="container-fluid">
            <a href="/" class="navbar-brand" to="/">
                <svg
                    class="my-svg-component"
                    width="35"
                    height="40"
                    viewBox="0 0 35 40"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M17.7977 0.952946L17.1911 0.601562L16.5845 0.952946L0.806722 10.0925L0.203125 10.4421V11.1396V29.4187V30.1162L0.806722 30.4659L16.5845 39.6054L17.1911 39.9567L17.7977 39.6054L33.5755 30.4659L34.1791 30.1162V29.4187V11.1396V10.4421L33.5755 10.0925L17.7977 0.952946ZM2.62352 28.2148V13.8415L14.6583 24.9598L2.62352 28.2148ZM17.2923 25.7499L23.8016 33.3304L31.7587 28.7211V21.8373L17.2923 25.7499ZM22.5249 34.0699L15.7409 26.1695L3.79583 29.4002L17.1911 37.1596L22.5249 34.0699ZM3.00536 12.2197L15.9296 24.1598L25.8667 8.57899L3.00536 12.2197ZM24.0877 7.39368L17.1911 3.39872L5.06461 10.4232L24.0877 7.39368ZM17.6568 24.1489L27.1949 9.19356L31.7587 11.8372V20.3349L17.6568 24.1489Z"
                        fill="black"
                    />
                </svg>
                57Blocks
            </a>
            <div class="justify-content-center items" id="navbarSupportedContent">
                <ul class="navbar-nav" >
                    <li class="nav-item">
                        <slot class="favorites-link" name="favorites"></slot>
                    </li>
                    <li class="nav-item">
                        <slot name="logout" :onClick="logout"></slot>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>
<script>
export default {
    name: 'NavBar',
    emits: ['authenticated'],
    methods: {
        logout() {
            VueCookieNext.removeCookie('authenticated')
            this.$router.replace({ path: '/login' })
        },
    },
}
</script>
<style>

.my-svg-component {
    /* Scoped CSS here */
    width: 50px;
    height: 50px;
}
#navbarNav {
    transition: none !important;
}
.items{
    right: 30px;
    align-self: center;
    justify-self: center;
    margin-left: 10%;
}
</style>
