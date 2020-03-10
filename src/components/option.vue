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
            total1:0
        }),
        methods:{
            itemChanged () {//alert(this.total);
                var total=0;
                this.selectedOptions.forEach(function(v){
                    total= total+v.price;
                })
                this.total1 = total;
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

</style>