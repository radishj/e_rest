<template>
<v-container fill-height class="align-start">
    <div class="mx-auto" max-width="500">
        <div class="d-flex">
            <p class="mx-auto mt-3 tl">${{$store.state.sys.payment.total}} will be charged</p>
        </div>
        <v-row dense>
        <v-col
            v-for="(card, i) in cards"
            :key="i"
            @click = "pickCard(i)"
            cols="12"
        >
            <v-card class="d-flex">
                <v-avatar
                    class="ma-3 ml-6"
                    color="white"
                    size="80"
                    tile
                >
                    <v-img src="../imgs/card.png"></v-img>
                </v-avatar>
                <v-spacer></v-spacer>
                <p class="my-0 tll align-self-center">***{{card.number}}</p>
                <v-spacer></v-spacer>
                <v-icon class="mr-6" color="green">mdi-chevron-right</v-icon>
            </v-card>
        </v-col>
        </v-row>
    </div>
</v-container>
</template>

<style scoped>
 
</style>
<script>
// @ is an alias to /src
import router from '../router';
const axios = require('axios');
export default {
    data: () => ({
        pageName: 'Credit Card Charging',
        cards:[],
        sys:{},
        rest:{},
        dishes:[]
    }),
    methods:{
        goNext(url){
            router.push(url);
        },
        async pickCard(index){
            this.$store.state.sys.payment.cardNumber = this.cards[index].number;
            var data = [
                {type:'set font big'},
                {type:'align center'},
                {type:'println', text:this.rest.name},
                {type:'set font small'},
                {type:'println', text:this.rest.address.street1+', '+this.rest.address.city+', '+this.rest.address.state+' '+this.rest.address.zip},
                {type:'set font big'},
                {type:'draw line'}];
            this.dishes.forEach(dish => {
                data.push({type:'set font big'});
                data.push({type:'printlr', left:dish.name, right:'$'+dish.total});
                data.push({type:'set font small'});
                var tData = [];
                tData.push(["Main item","",'$'+dish.price.toFixed(2)]);
                for(var i=0; i<dish.options.length; i++){
                    var first=true;
                    dish.options[i].forEach(item => {
                        //alert(i.toString()+':'+JSON.stringify(item));
                        var row=[];
                        if(first){
                            row.push(dish.optionNames[i]);
                            first=false;
                        }
                        else
                            row.push("");
                        row.push(item.name);
                        row.push("+$"+item.price.toFixed(2));
                        tData.push(row);
                    })
                }
                tData.push(["Subtotal","",'$'+dish.total.toFixed(2)]);
                data.push({type:'c table',length:3,aligns:['LEFT','LEFT','RIGHT'],widths:[0.3,0.5,0.2],data:tData});
            });
            data.push({type:'set font big'});
            data.push({type:'printlr', left:'Items Price', right:'$'+this.$store.state.sys.payment.total});
            data.push({type:'printlr', left:'Server Name', right:'Ashley'});
            data.push({type:'printlr', left:'Customer Name', right:this.sys.name});
            data.push({type:'printlr', left:'Customer Cell', right:this.sys.phone});
            const config = {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }
            alert(data);
            var res = await axios.post(this.$store.state.PRINTER_URL,data,config);
            alert('Page sent. '+res);
            this.goNext('checkout');
        },
        setTotal(){
            var total = this.dishes.reduce((a, b)=> ({'total':a.total+b.total})).total.toFixed(2);
            this.$store.state.sys.payment = {'total': total};
            return total;
        },
    },
    mounted(){
        this.$store.state.pageName = this.pageName;
        this.cards = this.$store.state.sys.cards;
        this.sys=this.$store.state.sys;
        this.rest = this.$store.state.sys.merchants[this.$store.state.pickedRestID];
        this.dishes = this.$store.state.cartDishes;
    }
}
</script>