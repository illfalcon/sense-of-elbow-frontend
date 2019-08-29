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
    mounted() {
        this.$http.get('http://localhost:5000/api/new_events').then(response => {
          this.newEvents = response.body.events
        })
        this.$http.get('http://localhost:5000/api/past_events').then(response => {
          this.pastEvents = response.body.events
        })
        this.$http.get('http://localhost:5000/api/approved_events').then(response => {
          this.acceptedEvents = response.body.events
        })
        this.$http.get('http://localhost:5000/api/declined_events').then(response => {
          this.declinedEvents = response.body.events
        })
    },
    methods: {
      acceptEvent(e) {
        console.log(e)
        this.acceptedEvents.unshift(e)  
      },
      declineEvent(e) {
        console.log(e)
        this.declinedEvents.unshift(e)  
      }
    }
}
</script>