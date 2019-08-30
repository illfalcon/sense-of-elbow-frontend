<template>
    <b-container>
        <b-row>
            <b-col cols=12>
                    <b-form @submit.prevent="onSubmit">
                    <table class="table">
                        <thead>
                            <tr>
                                <th style="width: 80%" scope="col">Ссылка</th>
                                <th style="width: 20%" scope="col"></th>
                            </tr>
                        </thead>
                        <tbody v-for="landing in landings" :key="landing.id">
                            <tr>
                                <td><a :href="landing.url">{{landing.url}}</a></td>
                                <td>
                                    <b-button size="sm" variant="danger" @click="deleteLanding(landing)">Удалить</b-button>
                                </td>
                            </tr>
                        </tbody>
                        <tbody>
                            <tr>    
                                <td>
                                    <b-form-input
                                        id="url"
                                        v-model="url"
                                        type="text"
                                        required
                                        placeholder="Введите сайт"
                                        ></b-form-input>
                                </td>
                                <td>
                                    <b-button type="submit" variant="primary">Добавить</b-button>
                                </td>
                            </tr>                    
                        </tbody>
                    </table>
                </b-form>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
export default {
    name: 'Landings',
    data() {
        return {
            url: '',
            landings: null
        }
    },
    computed: {
      loggedIn: () => {
        return localStorage.getItem('token')
      }
    },
    mounted() {
        this.checkToken()
        if (this.loggedIn) {
            this.$http.get('http://localhost:5000/api/landings', {headers: {Authentication: localStorage.getItem('token')}}).then(response => {
            this.landings = response.body.landings
            })
        } else {
            this.$router.push('/login')
        }
        
    },
    methods: {
        onSubmit() {
            this.$http.post('http://localhost:5000/api/landings', {'url': this.url}, {headers: {Authentication: localStorage.getItem('token')}}).then(response => {
                if (response.body.success)
                    this.landings.push(response.body.landing)
                    this.url = ''
            })
        },
        deleteLanding(landing) {
            this.$http.delete('http://localhost:5000/api/landings', {body: {'id': landing.id}, headers: {Authentication: localStorage.getItem('token')}}).then(response => {
                if (response.body.success)
                    this.landings.splice(this.landings.indexOf(landing), 1)
            })
        },
        checkToken() {
            const token = localStorage.getItem('token')
            if (token) {
                this.$http.post('http://localhost:5000/api/login_token', null, {headers: {Authentication: token}}).then(response => {
                    if (response.body.success) {
                        return true
                    }
                    localStorage.removeItem('token')
                    return false
                }), response => {
                    return false
                }
            }
            return false
        }
    }
}
</script>
