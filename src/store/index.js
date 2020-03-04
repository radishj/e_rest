/* eslint-disable no-console */
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state:{
        sys:{},
        SERVER_URL:process.env.VUE_APP_SHOST+':'+process.env.VUE_APP_SPORT,
    },
    getters:{
    },
    mutations:{
    },
    actions: {
    }
})
