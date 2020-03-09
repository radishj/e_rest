<template>
<v-container fill-height class="align-start">
    <v-row dense class="pl-2 pt-2" 
        v-for="(catID, i) in Object.keys(menu.categories)"
        :key="i"
    >
        <v-col cols="12" class="py-0">
            <v-card class="d-flex flex-no-wrap justify-left green lighten-4" tile>
                <div style="width:100%" class="mt-2 mb-1 d-flex flex-column">
                    <p class="mb-0 tm green--lighten--2 text-center font-weight-bold">{{menu.categories[catID].name}}</p>
                    <p class="mb-0 tm green--lighten--2 text-center">{{menu.categories[catID].description}}</p>
                </div>
            </v-card>
        </v-col>
        <v-col
            v-for="(prodID, j) in Object.keys(menu.categories[catID].products)"
            :key="j"
            @click = "pickProd(catID, prodID)"
            cols="12"
            class = "py-0"
        >
        <v-card class="d-flex flex-no-wrap justify-left" tile>
            <v-avatar
                    class="ma-3"
                    size="90"
                    tile
                >
                    <v-img class="" :src="menu.categories[catID].products[prodID].photoUrl"></v-img>
            </v-avatar>
            <div style="width:100%" class="ma-3 d-flex flex-column">
                <div class = "box">
                    <p class="my-0 tsTrim  font-weight-bold">{{menu.categories[catID].products[prodID].name}}</p>
                    <p class="my-0 ts mr-2  font-weight-bold">${{menu.categories[catID].products[prodID].price}}</p>
                </div>
                <p class="my-0 ts text--secondary">{{menu.categories[catID].products[prodID].description}}</p>
            </div>
        </v-card>
        </v-col>
    </v-row>


        <v-btn class="mx-2" fab dark small color="primary" @click="selected2=[]">
      <v-icon dark>mdi-minus</v-icon>
    </v-btn>
        <v-select
          v-model="selected2"
          :items="items"
          chips
          label="Some Items"
          multiple
          outlined
          cache-items
          :menu-props="{ contentClass: 'red-first-item' }"
        >
        </v-select>
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

export default {
    data: () => ({
        pageName: 'Dish Customize',
        menu: {},
        items: ['Item A', 'Item B', 'Item C'],
      selected1: [],
      selected2: []
    }),
    methods:{
        goNext(url){
            router.push(url);
        },
        pickLoc(stationID)
        {
            this.$store.state.pickedStationID = stationID;
            router.push('Menu');
        }
    },
    mounted(){
        this.$store.state.pageName = 'Customize';
        this.menu = Object.values(this.$store.state.sys.merchants[this.$store.state.pickedRestID].menus)[0];
    }
}
</script>