<template>
<v-container fill-height>
    <v-row justify="center" class="">
        <v-col cols="12" sm="8">
  <v-card
    class="mx-auto success white--text"
    max-width="700"
  >
    <v-card-title  class="justify-center white--text pb-0">
      Welcome to Tasti
    </v-card-title>

    <v-card-title  class="justify-center subtitle-1 white--text py-0">
      Earn reward every time!
    </v-card-title>

    <v-card-actions class="justify-center py-6" >
      <v-btn  outlined class="white--text"
        @click = "goNext('Login')"
      >
        <span class="mr-2 white--text">Hop In</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
          </v-col>
    </v-row>
</v-container>
</template>

<script>
// @ is an alias to /src
import router from '../router';

export default {
  data: () => ({
    pageName: 'Start'
  }),
  methods:{
    goNext(url){
      router.push(url);
    },
  },
  mounted(){
     this.$store.state.pageName = this.pageName;
  }
}
</script>
