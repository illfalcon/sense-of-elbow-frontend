<template>
  <div id="app">
    <NavBar @logout='logoutMethod' :login=this.login></NavBar>
    <router-view @login='loginMethod()'/>
  </div>
</template>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>

<script>
// @ is an alias to /src
import NavBar from '@/components/NavBar.vue'

export default {
  components: {
    NavBar
  },
  data() {
    return {login: localStorage.getItem('token') ? true : false}
  },
  methods: {
    loginMethod() {
      this.login = true
    },
    logoutMethod() {
      this.login = false
    }
  }
}
</script>

