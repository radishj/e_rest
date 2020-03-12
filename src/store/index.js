/* eslint-disable no-console */
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state:{
        pageName:"Easy Eat",
        pickedRestID:"",
        pickedStationID:"",
        sys:{},
        SERVER_URL:process.env.VUE_APP_SERVER_HOST+':'+process.env.VUE_APP_SERVER_PORT,
        PRINTER_URL:process.env.VUE_APP_PRINTER_HOST+':'+process.env.VUE_APP_PRINTER_PORT+'/printer',
        cartItemCount:0
    },
    getters:{
    },
    mutations:{
    },
    actions: {
    }
})
