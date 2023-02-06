<script setup>
    import { VueCookieNext } from 'vue-cookie-next'
    import NavBar from '../components/NavBar.vue'
</script>
<template>
    <NavBar />
    <div class="login-container">
        <form @submit.prevent="login" class="login-container-form">
            <input
                class="login-container-form-input"
                v-model="email"
                type="text"
                placeholder="email@57blocks.com"
            />
            <input
                class="login-container-form-input"
                v-model="password"
                type="password"
                placeholder="password"
            />
            <input
                class="login-container-form-button"
                type="submit"
                value="log in"
            />
        </form>
        <p v-if="popOver" class="login-popover">
            Enter a valid email or password!
        </p>
    </div>
</template>
<script>
export default {
    data() {
        return {
            email: '',
            password: '',
            popOver: false,
        }
    },
    emits: ['authenticated'],
    computed: {
        //compute the valid email and password and return an object on booleans
        validate() {
            var v_mail = String(this.email)
                .toLowerCase()
                .match(
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                )
            v_mail = v_mail != null
            var v_password = this.password != ''
            this.$emit('authenticated', true)
            // Save session in a cookie
            VueCookieNext.setCookie('authenticated', true, 1)
            return {
                pswd: v_password,
                mail: v_mail,
            }
        },
    },
    methods: {
        login() {
            if (this.validate.mail && this.validate.pswd) {
                this.popOver = false
                this.$router.replace({ path: '/' })
            } else {
                console.log('not valid')
                this.popOver = true
            }
        },
    },
}
</script>
<style>
.login-container {
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-items: center;
    align-items: center;
    justify-content: center;
    align-self: center;
    width: 100%;
}
.login-container-form {
    display: flex;
    flex-direction: column;
    width: 100%;
}
.login-container-form-input {
    margin: 2%;
    border-radius: 10px;
    border: 0.5px solid rgb(133, 133, 133);
    padding: 10px;
    text-align: center;
    align-self: center;
}
.login-container-form-button {
    width: 10vh;
    align-self: center;
    padding: 5px;
    border-radius: 10px;
    border: none;
    background-color: #48a9a6;
    color: white;
    margin-top: 5%;
}
.login-container-form-button:active {
    transform: scale(0.9);
    transition: 0.2s;
}

.login-container-form-input:hover {
    transform: scale(0.95);
    transition: 1s;
}
.login-popover {
    margin: 5%;
}
</style>
