<template>
    <div>
        <v-select
          v-model="selectedOptions"
          :items="items"
          chips
          :label="label"
          multiple
          outlined
          dense
          cache-items
          item-color = "green"
          deletable-chips = true
          @change="itemChanged()"
          :rules="rules"
          :menu-props="{ contentClass: 'red-first-item' }"
        >
          <template v-slot:prepend-item>
            <v-list-item>
              <span class="red-text">Red item</span>
            </v-list-item>
          </template>
        </v-select>
    <p>{{total1}}</p>
     </div>
   
</template>

<script>
    export default {
        name: 'Button',
        props: {
            label: String,
            items: Array,
            selectedOptions: Array,
            len_max: Number,
            len_min: Number
        },
        data: () => ({
            
            total:0
        }),
        methods:{
            itemChanged () {//alert(this.total);
                var total1=0;
                this.selectedOptions.forEach(function(v){
                    total1= total1+v.price;
                })
                this.total = total1;
            },
        },
        computed: {
            ggg(){
                this.selectedOptions.forEach(function(v){
                    alert(v.price);
                    this.total1= this.total1+v.price;
                })
                return this.total1;
            },
            rules () {
                const rules = [];
                if (this.len_min) {
                const ruleLenMin =
                    v => (v || '').length >= this.len_min ||
                    `A minmum of ${this.len_min} items is required`
                rules.push(ruleLenMin)
                }
                if (this.len_max) {
                const ruleLenMax =
                    v => (v || '').length <= this.len_max ||
                    `A maximum of ${this.len_max} items is allowed`
                rules.push(ruleLenMax)
                }
                return rules;
            }
        }
    }
</script>

<style scoped>
    .red-text {
        color: red;
    }

    .red-first-item .v-list-item:first-child .v-list-item__title {
        color: red;
    }
.theme--light.v-chip:not(.v-chip--active) { background-color: green; }
.v-chip__content{ color: red;}
</style>