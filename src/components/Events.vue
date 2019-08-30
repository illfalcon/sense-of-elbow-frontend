<template>
<div>
  <b-card no-body>
    <b-tabs pills card>
      <b-tab title="Новые события" active>
        <EventsList v-if="newEvents" :events='newEvents' @accept="acceptEvent" @decline='declineEvent'></EventsList>
      </b-tab>
      <b-tab title="Прошедшие события">
        <EventsList v-if="pastEvents" :events='pastEvents' @accept="acceptEvent" @decline='declineEvent'></EventsList>
      </b-tab>
      <b-tab title="Принятые события">
        <EventsList v-if="acceptedEvents" :events='acceptedEvents' :accepted='true' @decline='declineEvent'></EventsList>
      </b-tab>
      <b-tab title="Отклонённые события">
        <EventsList v-if="declinedEvents" :events='declinedEvents' :declined='true' @accept="acceptEvent"></EventsList>
      </b-tab>
    </b-tabs>
  </b-card>
</div>
</template>

<script>
import EventsList from '@/components/EventsList.vue'
export default {
    components: {
        EventsList
    },
    data() {
        return {
            newEvents: null,
            pastEvents: null,
            acceptedEvents: null,
            declinedEvents: null
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
        this.$http.get('http://localhost:5000/api/new_events', {headers: {Authentication: localStorage.getItem('token')}}).then(response => {
          this.newEvents = response.body.events
        }), response => {
      if (response.body.error) {
        alert(response.body.error)
      } else {
        alert(response.body.message)
      }
    }
        this.$http.get('http://localhost:5000/api/past_events', {headers: {Authentication: localStorage.getItem('token')}}).then(response => {
          this.pastEvents = response.body.events
        }), response => {
      if (response.body.error) {
        alert(response.body.error)
      } else {
        alert(response.body.message)
      }
    }
        this.$http.get('http://localhost:5000/api/approved_events', {headers: {Authentication: localStorage.getItem('token')}}).then(response => {
          this.acceptedEvents = response.body.events
        }), response => {
      if (response.body.error) {
        alert(response.body.error)
      } else {
        alert(response.body.message)
      }
    }
        this.$http.get('http://localhost:5000/api/declined_events', {headers: {Authentication: localStorage.getItem('token')}}).then(response => {
          this.declinedEvents = response.body.events
        }), response => {
      if (response.body.error) {
        alert(response.body.error)
      } else {
        alert(response.body.message)
      }
    }
      } else {
        this.$router.push('/login')
      }
    },
    methods: {
      acceptEvent(e) {
        console.log(e)
        this.acceptedEvents.unshift(e)  
      },
      declineEvent(e) {
        console.log(e)
        this.declinedEvents.unshift(e)  
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
      }
    },
}
</script>