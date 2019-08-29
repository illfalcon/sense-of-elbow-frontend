<template>
    <b-card>
        <b-card-title>{{event.event_date}}</b-card-title>
        <b-card-sub-title><a :href="event.url">{{event.url}}</a></b-card-sub-title>
        <b-card-text>
            <read-more more-str="Раскрыть +" :text="event.article" less-str="Скрыть -" :max-chars="300"></read-more>
        </b-card-text>
        <b-button variant="outline-success" v-on:click="acceptEvent" :disabled="accepted">Принять</b-button>
        <b-button variant="outline-danger" :disabled="declined" @click="declineEvent">Отклонить</b-button>
        <b-alert
            :show="dismissCountDown"
            dismissible
            variant="danger"
            @dismissed="dismissCountDown=0"
            @dismiss-count-down="countDownChanged"
            fade>
            This alert will dismiss after {{ dismissCountDown }} seconds...
        </b-alert>
    </b-card>
</template>

<script>
export default {
    props: ['event', 'accepted', 'declined'],
    data() {
        return {
            dismissSecs: 5,
            dismissCountDown: 0
        }
    },
    methods: {
        acceptEvent() {
            console.log(this.event.id)
            this.$http.post('http://localhost:5000/api/set_approved', {id: this.event.id}).then(response => {
                if (response.body.success) {
                    this.$emit('accept-event', this.event)
                } else {
                    this.showAlert()
                }
            },
            response => {this.showAlert()})
        },
        declineEvent(){
            console.log(this.event.id)
            this.$http.post('http://localhost:5000/api/set_declined', {id: this.event.id}).then(response => {
                if (response.body.success) {
                    this.$emit('decline-event', this.event)
                } else {
                    this.showAlert()
                }
            },
            response => {this.showAlert()})
        },
        countDownChanged(dismissCountDown) {
            this.dismissCountDown = dismissCountDown
        },
        showAlert() {
            this.dismissCountDown = this.dismissSecs
        }
    }
}
</script>

<style scoped >
    .card-text {
        text-align: justify;
    }
</style>