<template>
<v-container fill-height class="align-start">
    <v-row dense>
        <v-col cols="12">
            <v-card class="d-flex flex-no-wrap justify-left pa-3" color="#dfe9f8">
                <div style="width:100%" class="d-flex flex-column">
                    <p class="mb-0 tm tBold">{{rest.name}}</p>
                    <p class="my-0 ts">{{rest.address.street1+', '+rest.address.city+', '+rest.address.state+', '+rest.address.zip}}</p>
                    <p class="my-0 ts">{{openTime()}}</p>
                    <p class="my-0 ts">{{rest.address.phone}}</p>
                    <div>
                        <span class="a"><a class="my-0 ts" :href="rest.officialUrl">Official website</a></span>
                        <span class="a"><a class="my-0 ts" :href="rest.googleUrl">Google website</a></span>
                    </div>
                </div>           
            </v-card>
        </v-col>
        <v-col cols="12">
            <v-card  @click="alert(1111111)"  class="d-flex flex-no-wrap justify-left pa-3">
                <div style="width:100%" class="d-flex flex-column">
                    <p class="mb-0 tm text-center">Order for Delivery</p>
                    <p class="my-0 ts text-center font-weight-light">Pickup from a Tasti station near you</p>
                </div>           
            </v-card>
        </v-col>
        <v-col cols="12">
            <v-card @click="recPrint()" class="d-flex flex-no-wrap justify-left pa-3">
                <div style="width:100%" class="d-flex flex-column">
                    <p class="mb-0 tm text-center">Direct Pay</p>
                </div>           
            </v-card>
        </v-col>
    </v-row>
</v-container>
</template>
<style>
    span.a {
    display: inline; /* the default for span */
    padding: 5px;
    }
</style>
<script>
    import router from '../router';
    const axios = require('axios');
    export default {
        data: () => ({
            pageName: 'Menu',
            rest:{}
        }),

        computed: {
        
        },

        methods: {
            goNext(url){
                router.push(url);
            },     
            openTime() {
                var timeStr = 'Opens: ';
                this.rest.businessHours.forEach((item) => { timeStr += item.dayOfWeek+' '+item.openAt+'-'+item.closedAt+'; ';} );
                return timeStr;
            },
            async recPrint(){
                var data = {
                    name: 'test'
                }
                alert(this.$store.state.PRINTER_URL);
                var res = await axios.post(this.$store.state.PRINTER_URL,data);
                alert(res.toString());
            },
        },
        mounted(){
            this.rest = this.$store.state.sys.merchants[this.$store.state.pickRestID];
            this.$store.state.pageName = this.rest.name;
        }

    }
</script>
