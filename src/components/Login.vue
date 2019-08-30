<template>
    <b-container>
        <b-row>
            <b-form class="col-6 offset-3" @submit.prevent="onSubmit">
                <b-form-group
                    id="input-group-1"
                    label="Логин"
                    label-for="input-1"
                >
                    <b-form-input
                    id="input-1"
                    v-model="login"
                    type="text"
                    required
                    placeholder="Логин"
                    ></b-form-input>
                </b-form-group>

                <b-form-group id="input-group-2" label="Пароль" label-for="input-2">
                    <b-form-input
                    id="input-2"
                    v-model="password"
                    required
                    type="password"
                    placeholder="Пароль"
                    ></b-form-input>
                </b-form-group>
                <b-button type="submit" variant="primary">Войти</b-button>
            </b-form>
        </b-row>
    </b-container>
    
</template>

<script>
export default {
    data() {
        return {
            login: '',
            password: ''
        }
    },
    methods: {
        onSubmit() {
            this.$http.post('http://localhost:5000/api/login', {'login': this.login, 'password': this.password}).then(response => {
                if (response.body.success) {
                    localStorage.setItem('token', response.body.token)
                    this.$router.push('/')
                    this.$emit('login')
                } else {
                    console.log(response.body)
                    alert("Login error")
                }
            }), response => {
                console.log(response.body)
                alert("Login error")
            }
        }
    }
}
</script>