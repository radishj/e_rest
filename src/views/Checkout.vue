<template>
<v-card class="mx-auto pl-2 pt-2 back" outlined max-width="600px" height="100%">
    <v-bottom-navigation
        scroll-target="#scroll-area-1"
        fixed
        horizontal
        height="36px"
    >
        <v-btn
            color="green"
            class="mr-2 pr-2" 
            @click="goNext('menu')"
        >
            <v-icon color="yellow lighten-3" right>mdi-playlist-plus</v-icon>
            <span class="white--text">Select More</span>
        </v-btn>
        <v-btn
            color="green"
            class="mr-2 pr-2 white--text" 
            @click="submitOrder"
        >
            <v-icon color="yellow lighten-3" right>mdi-credit-card-settings-outline</v-icon>
            <span class="white--text">Submit Order</span>
        </v-btn>
    </v-bottom-navigation>
    
    <div class="ml-5 mr-5 mt-4">
        <div class="mb-4 d-flex flex-column align-self-center align-center grey--text">
            <p class="mb-0 tm font-weight-bold">{{rest.name}}</p>
            <p class="mb-0 tm">{{rest.address.street1}}, {{rest.address.city}}, {{rest.address.state}} {{rest.address.zip}}</p>
        </div>

        <div
            v-for="(dish, i) in dishes"
                :key="i"
        >  
            <div class="d-flex flex-row">
                <p style="margin-bottom:0px margin-bottom:10px">{{dish.name}}</p>
                <v-spacer></v-spacer>
                <p>{{dish.total}}</p>
                <v-icon class="ml-2 mr-1 pb-0 top--20" color="green" @click="refreshPage(i)">mdi-close</v-icon>
            </div>
            <div class="ml-6 mr-12 pr-12 top--10 grey--text">
                <div v-for="(opt, j) in dish.options" :key="j" class="grey--text"> 
                    <v-simple-table dense>
                        <template v-slot:default>
                        <tbody class="grey--text">
                            <tr v-if="j==0">
                                <td style="text-align:start; border-bottom:none" colspan="2">Main item</td>
                                <td style="text-align:end; border-bottom:none">${{dish.price.toFixed(2)}}</td>
                            </tr>
                            <tr v-for="(item, k) in opt" :key="k">
                                <td width="25%" style="border-bottom:none;" v-if="k==0">{{ dish.optionNames[j] }}</td>
                                <td width="25%" style="border-bottom:none;" v-if="k!=0"></td>
                                <td style="text-align:start; border-bottom:none" width="60%">{{ item.name }}</td>
                                <td style="text-align:end; border-bottom:none" width="5%">+${{ item.price.toFixed(2)}}</td>
                            </tr>
                            <tr v-if="j==dish.options.length-1">
                                <td style="text-align:start" colspan="2">Subtotal</td>
                                <td style="text-align:end">${{dish.total.toFixed(2)}}</td>
                            </tr>
                        </tbody>
                        </template>
                    </v-simple-table>
                </div>
            </div>
        </div>
        <div class="d-flex flex-row mr-6">
            <p style="margin-bottom:0px margin-bottom:10px">Items Price</p>
            <v-spacer></v-spacer>
            <p>{{dishes.reduce((a, b)=> ({'total':a.total+b.total})).total.toFixed(2)}}</p>
            <v-icon class="ml-2 mr-1 pb-0 top--20" color="green"></v-icon>
        </div>
        <div class="d-flex flex-row mr-6">
            <p style="margin-bottom:0px margin-bottom:10px">Server Name</p>
            <v-spacer></v-spacer>
            <p>Ashley</p>
            <v-icon class="ml-2 mr-1 pb-0 top--20" color="green"></v-icon>
        </div>
        <div class="d-flex flex-row mr-6">
            <p style="margin-bottom:0px margin-bottom:10px">Customer Name</p>
            <v-spacer></v-spacer>
            <p>{{sys.name}}</p>
            <v-icon class="ml-2 mr-1 pb-0 top--20" color="green"></v-icon>
        </div>
        <div class="d-flex flex-row mr-6">
            <p style="margin-bottom:0px margin-bottom:10px">Customer Name</p>
            <v-spacer></v-spacer>
            <p>{{sys.phone}}</p>
            <v-icon class="ml-2 mr-1 pb-0 top--20" color="green"></v-icon>
        </div>
    </div>
   
</v-card>
</template>

<style>
.top--10{
  margin-top: -10px;
}

.top--20{
  margin-top: -20px;
}

.red-first-item .v-list-item:first-child .v-list-item__title {
  color: red;
}

.font-size-26{
    font-size: 24px;
}
.font-size-15{
    font-size: 15px;
    line-height: 0.8;
}

.v-btn__content{
    font-size:18px;
}


</style>
<script>
// @ is an alias to /src
import router from '../router';
export default {
    data: () => ({
        pageName: 'Checkout',
        sys: {},
        rest: {},
        dishes: {}
    }),
    methods:{
        goNext(url){
            router.push(url);
        },
        refreshPage(dishID){
            this.$store.state.cartDishes.splice(dishID, 1);
            this.goNext('Checkout');
        },
        pickLoc(stationID)
        {
            this.$store.state.pickedStationID = stationID;
            router.push('dish');
        },
    },
    mounted(){
        this.$store.state.pageName = this.pageName;
        this.sys=this.$store.state.sys;
        this.rest = this.$store.state.sys.merchants[this.$store.state.pickedRestID];
        this.dishes = this.$store.state.cartDishes;
    }
}
</script>