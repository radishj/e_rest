<template>
<v-container fill-height class="align-start">
    <v-row dense>
    <v-col
        v-for="(stationID, i) in Object.keys(locations)"
        :key="i"
        @click = "pickLoc(stationID)"
        cols="12"
    >
        <v-card class="d-flex flex-no-wrap justify-left">
            <div style="width:100%" class="ma-3 d-flex flex-column">
                <p class="mb-0 tm green--text">Station #{{i}}: {{locations[stationID].name}}</p>
                <p class="my-0 ts text--secondary">{{locations[stationID].address.street1+', '+locations[stationID].address.city+', '+locations[stationID].address.state+', '+locations[stationID].address.zip}}</p>
                <p class="my-0 ts text--secondary">{{getOrderTimeStr(stationID)}}</p>
                <p class="my-0 ts text--secondary">{{getDeliveryTimeStr(stationID)}}</p>
            </div>
        </v-card>
    </v-col>
    </v-row>
</v-container>
</template>

<style scoped>
 
</style>
<script>
// @ is an alias to /src
import router from '../router';

export default {
    data: () => ({
        pageName: 'Order for Delivery',
        locations: '',
        todayStr: '',
        tomorrowStr: '',
    }),
    methods:{
        goNext(url){
            router.push(url);
        },
        pickLoc(stationID)
        {
            this.$store.state.pickedStationID = stationID;
            router.push('Menu');
        },
        getOrderTimeStr(stationID) {
            return 'Order from '+this.todayStr+' '+this.locations[stationID].orderStartTime+'-'+this.locations[stationID].orderEndTime+' '+this.tomorrowStr;
        },
        getDeliveryTimeStr(stationID) {
            var d = new Date();
            return 'Deliver at '+this.locations[stationID].deliveryStartTime+'-'+this.locations[stationID].deliveryEndTime+' '+this.tomorrowStr+' '+d.toLocaleDateString('en-US');
        },
        /*trimStr(maxLength, str){
            if(str.length > maxLength){
                //trim the string to the maximum length
                var trimmedString = str.substr(0, maxLength);

                //re-trim if we are in the middle of a word and 
                trimmedString = trimmedString.substr(0, Math.min(trimmedString.length, trimmedString.lastIndexOf(" ")));
                return trimmedString;
            }
            return str;
        }*/
    },
    mounted(){
        this.$store.state.pageName = this.pageName;
        this.locations = this.$store.state.sys.stations;
        console.log(this.locations);
        var d = new Date();
        var weekday = new Array(7);
        weekday[0] = "Sunday";
        weekday[1] = "Monday";
        weekday[2] = "Tuesday";
        weekday[3] = "Wednesday";
        weekday[4] = "Thursday";
        weekday[5] = "Friday";
        weekday[6] = "Saturday";
        this.todayStr = weekday[d.getDay()];
        this.tomorrowStr = weekday[(d.getDay()+1)%7];
    }
}
</script>