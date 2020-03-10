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
            items: Array
        },
        data: () => ({
            selectedOptions: [],
            s2_max:2,
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

                if (this.s2_max) {
                const rule =
                    v => (v || '').length <= this.s2_max ||
                    `A maximum of ${this.s2_max} items is allowed`

                rules.push(rule)
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
.v-list-item--link::before { background-color: red; }
.v-chip__content{ color: red;}
</style>