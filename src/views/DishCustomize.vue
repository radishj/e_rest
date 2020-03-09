<template>
<v-container fill-height class="align-start">
 
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
        dish: {},
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
        //this.dish = Object.values(this.$store.state.sys.merchants[this.$store.state.pickedRestID].menus)[0].categories[this.$route.params.catID].products[this.$route.params.prodID];
        this.$store.state.pageName = this.$route.params.catID;
    }
}
</script>