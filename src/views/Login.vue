<template>
    <v-card  color="rgb(0, 0, 0, 0.01)"
        class="mx-auto mt-6 py-3"
        max-width="500"
    >
        <form>
            <v-text-field
                v-model="phone"
                prepend-icon="mdi-phone-forward-outline"
                :rules="[rules.required, rules.phone]"
                label="Phone: 123-456-7890"
                class="px-2 black--text"
            ></v-text-field>
            <v-text-field
                v-model="password"
                prepend-icon="mdi-textbox-password"
                label="Password"
                :append-icon="passStr ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="() => (passStr = !passStr)"
                :type="passStr ? 'password' : 'text'"
                class="px-2"
            ></v-text-field>
            <div class="text-center">
                <v-btn
                    color="success"
                    class="ma-2 white--text"
                    @click="login"
                    width = "160px"
                >
                    Login 
                    <v-icon right dark>mdi-login </v-icon>
                </v-btn>
                <p class="mb-0 mx-auto" style="text-align:center"> - or - </p>
                <v-btn
                    color="success"
                    class="ma-2 white--text"
                    @click="register"
                    width = "160px"
                >
                    Register
                    <v-icon right dark>mdi-account-plus </v-icon>
                </v-btn>
            </div>
        </form>
    </v-card>
</template>

<script>
    const axios = require('axios');
    export default {
        data: () => ({
        name: 'Login',
        phone: '',
        passStr: String,
        rules: {
                required: value => !!value || 'Please Input',
                counter: value => value.length <= 10 || 'Max 10 letters',
                phone: value => {
                    const pattern = /^[(]{0,1}[0-9]{3}[)]{0,1}[-\s]{0,1}[0-9]{3}[-\s]{0,1}[0-9]{4}$/
                    return pattern.test(value) || 'Not complete or wrong format'
                }
            },
        password: '',
        }),

        computed: {
        
        },

        methods: {
            async login() {
                var user = {
                    phone : this.phone,
                    password : this.password,
                };
                //alert(this.$store.state.SERVER_URL+'/customer/login');
                var res = await axios.post(this.$store.state.SERVER_URL+'/customer/login',user);
                console.log(res.data);
            },         
            clear () {
                this.phone = ''
                this.password = ''
            }
        } 
    }
</script>
