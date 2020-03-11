<template>
<v-container fill-height class="align-start">
    <div  class="white">
    <Option
        :label="'my button1'"
        :items= "items"
        :selectedOptions= "defaultItems"
        :len_min= 1
        :len_max= 2
    />
    <Option
        :type="'success'"
        :label="'my button2'"
        :items= "items"
    />
    <v-row dense class="pl-2 pt-2">
        <v-col cols="12" class="py-0">
            <Option
                :label="dish.name"
                :items= "dish.options"
                :selectedOptions= "defaultItems"
                :len_min= 1
                :len_max= 2
            />  
            <v-card class="d-flex flex-no-wrap justify-left green lighten-3">
                <div style="width:100%" class="ma-2 d-flex flex-column">
                    <p class="mb-0 tm green--lighten--2 font-weight-bold">{{dish.name}}</p>
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
            <v-card class="d-flex flex-no-wrap justify-left green lighten-4" tile>
                <div style="width:100%" class="mx-2 mt-1 d-flex flex-column">
                    <p class="mb-0 tm green--lighten--2 font-weight-bold">{{opt.name}}</p>
                    <p class="mb-0 tm green--lighten--2">{{opt.description}}</p>
                </div>
            </v-card>
        </v-col>
        <v-col
            v-for="(item, j) in opt.items"
            :key="j"
            cols="12"
            class = "py-0"
        >
        <v-card class="d-flex flex-no-wrap justify-left" tile>
            <div style="width:100%" class="ma-3 d-flex flex-column">
                <div class = "box">
                    <p class="my-0 tsTrim  font-weight-bold">{{item.name}}</p>
                    <p class="my-0 ts mr-2  font-weight-bold">${{item.price}}</p>
                </div>
                <p class="my-0 ts text--secondary"></p>
            </div>
        </v-card>
        </v-col>
    </v-row>
    </div>
</v-container>
</template>

<style scoped>
 .red-text {
  color: red;
}

.red-first-item .v-list-item:first-child .v-list-item__title {
  color: red;
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
        options: [],
        total1:0,
        items: [{text:'Item A',value:{id:0,price:10}},{text:'Item B',value:{id:1,price:20}},{text:'Item C',value:{id:2,price:30}}],
        defaultItems:[{text:'Item A',value:{id:0,price:10}}]
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
    },
    mounted(){
        this.dish = Object.values(this.$store.state.sys.merchants[this.$store.state.pickedRestID].menus)[0].categories[this.$route.params.catID].products[this.$route.params.prodID];
        this.dish.options.forEach(function (opt, index){
            this.options.push({})
        });

        //this.dish = Object.values(this.$store.state.sys.merchants[this.$store.state.pickedRestID].menus)[0].categories;
        this.$store.state.pageName = this.pageName;
    }
}
</script>