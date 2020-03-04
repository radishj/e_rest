<template>
 <div id="app"  class="back">
  <v-app id="inspire">
    <v-app-bar
      app
      light
      tile

    >
      <v-btn icon>
        <v-icon>mdi-silverware-fork-knife</v-icon>
      </v-btn>
      
      <v-toolbar-title>Easy Eat</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn  tile outlined class="green--text text--lighten-3"
      >
        <span class="mr-2 text--disabled">Latest Release</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>
    <v-content>
      <router-view>

      </router-view>
    </v-content>
  </v-app>
  </div>
</template>

<script>
export default {
  name: 'App',

  components: {
  },

  data: () => ({
    //
  }),
};
</script>
<style>
.back {
  background-image: url(./imgs/background_light.jpg);
  background-repeat: repeat;
}
#inspire {
  background: none;
}
</style>