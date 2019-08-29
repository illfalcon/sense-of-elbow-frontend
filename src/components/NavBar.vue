<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="info">
    <b-navbar-brand to="/">Чувство локтя</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item to="/events">События</b-nav-item>
        <b-nav-item to="/landings">Сайты</b-nav-item>
        <b-button variant="outline-light" v-if="!isRefreshing" @click="refresh">Обновить</b-button>
        <b-button variant="outline-light" v-else disabled>Обновляется</b-button>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
  </div>
</template>

<script>
import { log } from 'util';
export default {
  name: 'NavBar',
  data() {
    return {
      isRefreshing: false
    }
  },
  methods: {
    refresh() {
      this.$http.post('http://localhost:5000/api/renew').then(response => {
        if (response.body.success) {
            this.isRefreshing = true;
        } else {
          this.showAlert()
        }
      console.log(response.body)
    })
    }
  },
  mounted () {
    this.$http.get('http://localhost:5000/api/renew').then(response => {
      this.isRefreshing = response.body.isRefreshing;
      console.log(response.body)
    })
  }
}
</script>
