<template>
<v-app>

<v-bottom-navigation
    scroll-target="#scroll-area-1"
    fixed
    horizontal
>
    <v-btn class="" @click="plusOne">
    <v-icon  class="green lighten-3 text--darken-6">mdi-plus</v-icon>
    </v-btn>

    <p class="mt-2 mr-2 font-size-26">{{dishCount}}</p>

    <v-btn class="mx-0" @click="minusOne">
    <v-icon  class="green lighten-3 text--darken-6">mdi-minus</v-icon>
    </v-btn>

    <p class="mt-4 ml-2 font-size-22">Total: ${{allTotal}}</p>

<v-spacer></v-spacer>

    <v-btn
      color="green"
      class="mr-2 pr-2 lighten-1"
      @click="validate"
    >
      Add to Cart
    </v-btn>
</v-bottom-navigation>

<v-sheet
    id="scroll-area-1"
    class="overflow-y-auto"
    max-height="600"
>
<v-container>
    <div>
    <v-form
        ref="form"
        v-model="valid"
        lazy-validation
    >
    <v-row dense class="pl-2 pt-2">
        <v-col cols="12" class="py-0">
            <v-card class="d-flex flex-no-wrap justify-left green lighten-3">
                <div style="width:100%" class="ma-2 d-flex flex-column">
                    <p class="mb-0 tm green--lighten--2 font-weight-bold">{{dish.name}} - ${{dish.price}}</p>
                    <p class="mb-0 tm green--lighten--2">{{dish.description}}</p>
                </div>
            </v-card>
        </v-col>
    </v-row>
    <v-row dense class="pl-2 pt-2" 
        v-for="(opt, i) in dish.options"
        :key="i"
     >
        <v-col cols="12" class="py-0">
            <v-card class="d-flex flex-no-wrap px-1" tile>
                <Option  class="mt-3"
                    :id = i
                    :label="opt.name"
                    :hint="opt.description"
                    :items= "items[i]"
                    :selectedItems= "defaultItems[i]"
                    :len_min= "opt.minCount"
                    :len_max= "opt.maxCount"
                    v-on:total-changed = "onTotalChanged"
                />
            </v-card>
        </v-col>
    </v-row>

  </v-form>
    </div>
</v-container>
</v-sheet>

</v-app>
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
.v-btn:not(.v-btn--round).v-size--default {
    padding-left: 6px;
    padding-right: 0px;
}
.v-item-group.v-bottom-navigation--horizontal .v-btn > .v-btn__content > .v-icon {
    margin-bottom: 0;
    margin-right: 4px;
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
        items: [],
        defaultItems:[],
        totals:[],
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
            this.totals[data[0]] = data[1];
            this.getDishTotal();
        },
        getDishTotal()
        {
            var theTotal = this.dish.price;
            if(this.totals.length>0)
                theTotal += this.totals.reduce((a, b) => a + b);
            this.dishTotal = theTotal;
            this.allTotal = this.dishTotal * this.dishCount;
        },
        validate () {
            alert(this.$refs.form.validate());
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
            var total = 0;
            ref.items.push(newItems);
            ref.defaultItems.push(newDefaultItems);
            var defaultLen = opt.minCount;
            var i = 0;
            opt.items.forEach(function (item){
                var priceStr = ' - Free';
                if(item.price > 0){
                    priceStr = ' - $'+item.price.toString();
                }
                var newItem = {text:item.name+priceStr,value:{id:i,price:item.price}};
                newItems.push(newItem);
                if(defaultLen>0){
                    newDefaultItems.push(newItem);
                    total += newItem.value.price;
                    defaultLen--;
                }
                i++;
            })
            ref.totals.push(total);
        });
        //this.dish = Object.values(this.$store.state.sys.merchants[this.$store.state.pickedRestID].menus)[0].categories;
        //console.dir('items0:'+JSON.stringify(this.items[0])); 
        //console.dir('totals:'+JSON.stringify(this.totals)); 
        this.getDishTotal();
        this.allTotal = this.dishTotal * this.dishCount;
        this.$store.state.pageName = this.dish.name;
    }
}
</script>