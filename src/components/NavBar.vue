<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="info">
    <b-navbar-brand to="/">Чувство локтя</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item to="/events">События</b-nav-item>
        <b-nav-item to="/landings">Сайты</b-nav-item>
        <b-button variant="outline-light" v-if="!isRefreshing" @click="refresh" :disabled="!login">Обновить</b-button>
        <b-button variant="outline-light" v-else disabled>Обновляется</b-button>
        <b-nav-item v-if="login" right @click="logout">Выйти</b-nav-item>
        <b-nav-item v-if="!login" to="/login" right>Войти</b-nav-item>
        <!-- <b-nav-item v-if="!loggedIn" to="/register">Зарегистрироваться</b-nav-item> -->
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
  </div>
</template>

<script>
import { log } from 'util';
export default {
  props: ['login'],
  name: 'NavBar',
  data() {
    return {
      isRefreshing: false,
    }
  },
  methods: {
    refresh() {
      this.$http.post('http://localhost:5000/api/renew', null, {headers: {Authentication: localStorage.getItem('token')}}).then(response => {
        if (response.body.success) {
            this.isRefreshing = true;
        }
      console.log(response.body)
    })
    },
  logout() {
    this.$http.post('http://localhost:5000/api/logout', null, {headers: {Authentication: localStorage.getItem('token')}}).then(response => {
      if (response.body.success) {
        localStorage.removeItem('token')
        this.$emit('logout')
        this.$router.push('/login')
      } else {
        if (response.body.error) {
          alert(response.body.error)
        } else {
          alert(response.body.message)
        }
      }
    }, response => {
      alert('Logout unsuccessful')
    })
  }
  },
  mounted () {
    this.$http.get('http://localhost:5000/api/renew').then(response => {
      this.isRefreshing = response.body.isRefreshing;
      console.log(response.body)
    }, response => {
      if (response.body.error) {
        alert(response.body.error)
      } else {
        alert(response.body.message)
      }
    })
  }
}
</script>
