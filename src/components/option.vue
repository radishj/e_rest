<template>
    <v-select
        v-model="selectedItems"
        :items="items"
        append-icon = "mdi-plus"
        width="100%"
        :label="label"
        :hint="hint"
        multiple
        dense
        cache-items
        color = "green"
        item-color = "green"
        @change="itemChanged()"
        @input="limiter"
        :rules="rules"
    >
        <template v-slot:selection="{ item, index }">
            <span v-if="index === selectedItems.length-1">{{ item.text }}</span>
            <span style="margin-right:0.5em;" v-if="index !== selectedItems.length-1">{{item.text}}, </span>
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
            limiter(e) {
                if(e.length > this.len_max) {
                    alert(`A maximum of ${this.len_max} items alread selected`);
                    e.pop()
                }
            },
            itemChanged () {//alert(this.total);
                //console.log(JSON.stringify(this.selectedItems));
                this.$emit('total-changed', {id:this.id,'items':this.selectedItems});
            },
            fff(){return false;}
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
                    `A maximum of ${this.len_max} items alread selected`
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
    .v-input {
        font-size:14px;
    }
</style>