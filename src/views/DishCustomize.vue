<template>
<div>
<v-bottom-navigation
    scroll-target="#scroll-area-1"
    fixed
    horizontal
>
    <div class = "box" style="">
        <v-icon @click="plusOne" class="my-3 mx-3 text--darken-6">mdi-plus-circle</v-icon>
        <p class="mt-2 mx-1 font-size-26">{{dishCount}}</p>
        <v-icon @click="minusOne" class="text--darken-6 mx-3">mdi-minus-circle</v-icon>
    </div>
    <v-spacer></v-spacer>
    <p class="mt-4 ml-2 font-size-22">        Total: ${{allTotal}}</p>

    <v-spacer></v-spacer>

    <v-btn
      color="green"
      class="mr-2 pr-2 lighten-1"
      @click="addDish"
    >
      Add to Cart
    </v-btn>
</v-bottom-navigation>

    <v-row dense class="pl-2 pt-2">
        <v-col cols="12" class="py-0">
            <v-card class="d-flex flex-no-wrap mr-2 mb-2" outlined>
                <div style="width:100%" class="ma-2 d-flex flex-column">
                    <p class="mb-0 tm green--text text--darken-4 font-weight-bold">{{dish.name}} - ${{dish.price}}</p>
                </div>
            </v-card>
        </v-col>
        <v-col cols="12" class="px-2 py-1">
            <div>
                <p class="mb-0 tm grey--text text--darken-2">{{dish.description}}</p>
            </div>
        </v-col>
    </v-row>
    <v-form
        ref="form"
        v-model="valid"
        lazy-validation
    >
    <v-row dense class="px-2 pt-2" 
        v-for="(opt, i) in dish.options"
        :key="i"
     >
        <v-col cols="12" class="py-0">
                <Option  class="mt-3"
                    :id = i
                    :label="opt.name + ' -- ' + opt.description"
                    :hint="opt.description"
                    :items= "options[i]"
                    :selectedItems= "selectedOptions[i]"
                    :len_min= "opt.minCount"
                    :len_max= "opt.maxCount"
                    v-on:total-changed = "onTotalChanged"
                />
        </v-col>
    </v-row>

  </v-form>
</div>
</template>

<style>
 .red-text {
  color: red;
}

.red-first-item .v-list-item:first-child .v-list-item__title {
  color: red;
}

.font-size-26{
    font-size: 24px;
}
.font-size-22{
    font-size: 18px;
}

.v-btn__content{
    font-size:18px;
}


</style>
<script>
// @ is an alias to /src
import router from '../router';
import Option from '../components/option';
export default {
    components: {
        Option
    },
    data: () => ({
        pageName: 'Customize',
        dish: {},
        dishInfo: '',
        options: [],
        defaultOptions:[],
        selectedOptions:[],
        dishTotal:0,
        dishCount:1,
        allTotal:0
    }),
    methods:{
        goNext(url){
            router.push(url);
        },
        pickLoc(stationID)
        {
            this.$store.state.pickedStationID = stationID;
            router.push('dish');
        },
        onTotalChanged: function(data){
            this.selectedOptions[data.id] = data.items;
           // console.log(JSON.stringify(this.selectedOptions));
            this.getDishTotal();
        },
        getDishTotal()
        {
            var theTotal = this.dish.price;
            this.selectedOptions.forEach(function (opt){
                console.log('jjjjjjjjjjjj:'+JSON.stringify(opt))
                if(opt)
                    opt.forEach(item => theTotal += item.price);
            })
            this.dishTotal = theTotal;
            this.allTotal = this.dishTotal * this.dishCount;
        },
        addDish(){
            if(this.$refs.form.validate()){
                this.$store.state.cartItemCount++;
            }
        },
        plusOne(){
            this.dishCount++;
            this.allTotal = this.dishTotal * this.dishCount;
        },
        minusOne(){
            if(this.dishCount>1){
                this.dishCount--;
                this.allTotal = this.dishTotal * this.dishCount;
            }
        }
    },
    mounted(){
        this.dish = Object.values(this.$store.state.sys.merchants[this.$store.state.pickedRestID].menus)[0].categories[this.$route.params.catID].products[this.$route.params.prodID];
        var ref = this;
        this.dish.options.forEach(function (opt){
            var newItems = [];
            var newDefaultItems = [];
            var newSelectedItems = [];
            ref.options.push(newItems);
            ref.defaultOptions.push(newDefaultItems);
            ref.selectedOptions.push(newSelectedItems);
            var defaultLen = opt.minCount;
            var i = 0;
            opt.items.forEach(function (item){
                var priceStr = ' - Free';
                if(item.price > 0){
                    priceStr = ' - $'+item.price.toString();
                }
                var newDefaultItem = {text:item.name+priceStr,value:{id:i,name:item.name,price:item.price}};
                newItems.push(newDefaultItem);
                if(defaultLen>0){
                    newDefaultItems.push(newDefaultItem);
                    newSelectedItems.push({id:i,name:item.name,price:item.price});
                    defaultLen--;
                }
                i++;
            })
        });
        //this.dish = Object.values(this.$store.state.sys.merchants[this.$store.state.pickedRestID].menus)[0].categories;
        //console.dir('items0:'+JSON.stringify(this.items[0])); 
        //console.dir('totals:'+JSON.stringify(this.totals)); 
        this.getDishTotal();
        this.$store.state.pageName = this.dish.name;
    }
}
</script>