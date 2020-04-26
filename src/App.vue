<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>
<script>
import Vue from 'vue';
export default {
    data() {
        return {
            eventBus: new Vue()
        };
    },
    provide: function() {
        return {
            bus: this.eventBus
        };
    }
};
</script>
<style>
@import './assets/css/main.scss';
 /*@import './assets/css/color-dark.css';深色主题*/
@import "./assets/css/theme-blue/color-blue.css"; /*  浅色主题*/
</style>