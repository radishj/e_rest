<template>
    <v-select
        v-model="selectedItems"
        :items="items"
        chips
        append-icon = "mdi-plus"
        width="100%"
        :label="label"
        :hint="hint"
        persistent-hint
        multiple
        outlined
        dense
        cache-items
        color = "green"
        item-color = "green"
        deletable-chips
        @change="itemChanged()"
        :rules="rules"
        :menu-props="{ contentClass: 'red-first-item' }"
    >
        <template v-slot:prepend-item>
        <v-list-item>
            <span class="green-text">{{label}}</span>
        </v-list-item>
        </template>
    </v-select>
</template>

<script>
    export default {
        name: 'Button',
        props: {
            id: Number,
            label: String,
            hint: String,
            items: Array,
            selectedItems: Array,
            len_max: Number,
            len_min: Number
        },
        data: () => ({          
        }),
        methods:{
            itemChanged () {//alert(this.total);
                //console.log(JSON.stringify(this.selectedItems));
                this.$emit('total-changed', {id:this.id,'items':this.selectedItems});
            },
        },
        computed: {
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
        },
        mounted(){
        }
    }
</script>

<style scoped>
    .green-text {
        color: green;
    }

    .red-first-item .v-list-item:first-child .v-list-item__title {
        color: red;
    }
</style>