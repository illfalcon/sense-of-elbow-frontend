<template>
    <b-container>
        <b-row>
            <b-col name="fade" is="transition-group" @before-leave="beforeLeave">
                <EventsItem v-for="event in events" :key="event.id" :event='event' :accepted='accepted' :declined='declined' @accept-event="acceptEvent" @decline-event="declineEvent" class="fade-item"></EventsItem>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
import EventsItem from '@/components/EventsItem.vue'

export default {
    components: {
        EventsItem
    },
    props: ['events', 'accepted', 'declined'],
    methods: {
        acceptEvent(e) {
            console.log(e)
            this.events.splice(this.events.indexOf(e), 1)
            this.$emit('accept', e)
        },
        declineEvent(e) {
            console.log(e)
            this.events.splice(this.events.indexOf(e), 1)
            this.$emit('decline', e)
        },
        beforeLeave(el) {
            const {marginLeft, marginTop, width, height} = window.getComputedStyle(el)
            el.style.left = `${el.offsetLeft - parseFloat(marginLeft, 10)}px`
            el.style.top = `${el.offsetTop - parseFloat(marginTop, 10)}px`
            el.style.width = width
            el.style.height = height
        }
    }
}
</script>

<style scoped>
    .fade-item {
        transition: all .5s;
    }
    /* .fade-enter-active {
        transition: opacity .5s;
    } */
    /* .fade-leave {
        position: absolute;
    } */
    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
        opacity: 0;
    }
    .fade-leave-active {
        position: absolute;
    }
</style>