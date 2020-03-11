<template>
<v-container fill-height class="align-start">
    <v-row dense>
    <v-col
        v-for="(restID, i) in Object.keys($store.state.sys.merchants)"
        :key="i"
        @click = "pickRest(restID)"
        cols="12"
    >
        <v-card class="d-flex flex-no-wrap justify-left">
            <v-avatar
                class="ma-3"
                size="125"
                tile
            >
                <v-img class="" :src="$store.state.sys.merchants[restID].coverPhotoUrl"></v-img>
            </v-avatar>
            <div style="width:100%" class="d-flex flex-column">
                <p class="mt-2 mb-0 tm">{{$store.state.sys.merchants[restID].name}}</p>
                <div class = "box">
                    <p class="my-0 tsTrim">{{$store.state.sys.merchants[restID].cuisinesDes[0]}}</p>
                    <p class="my-0 ts mr-2">{{$store.state.sys.merchants[restID].priceLevel+' '+$store.state.sys.merchants[restID].distance}}</p>
                </div>
                <p class="my-0 ts">{{$store.state.sys.merchants[restID].rate + '  (' + $store.state.sys.merchants[restID].starRatingCount+')'}}</p>
                <p class="my-0 ts">{{'Sales '+$store.state.sys.merchants[restID].salesVolume30Days+'/month'}}</p>
                <div class="text-center mt-auto mb-2">
                    <v-btn x-small class="my-0 ts orange text-black lighten-3" tile text>{{'Sales '+$store.state.sys.merchants[restID].salesVolume30Days+'/month'}}</v-btn>
                </div>
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
        pageName: 'Restaurant'
    }),
    methods:{
        pickRest(restID)
        {
            this.$store.state.pickedRestID = restID;
            router.push('RestInfo');
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
        this.$store.state.pageName = this.pageName;console.log(this.$store.state.pageName);
    }
}
</script>