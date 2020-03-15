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
      
      <v-toolbar-title>{{$store.state.pageName}}</v-toolbar-title>

      <v-spacer></v-spacer>

      <!--v-btn-- icon class="grey--text">
        <v-icon class="mx-0">mdi-magnify</v-icon>
      </!--v-btn-->
      <v-btn icon class="grey--text" v-if="$store.state.pageName=='Start'||$store.state.pageName=='Login'">
        <v-icon>mdi-qrcode-scan</v-icon>
      </v-btn>
      <v-btn text  @click="goNext('Checkout')" v-if="$store.state.pageName!='Start' && $store.state.pageName!='Login'">
          <v-badge left color="green">
            <span slot="badge">{{$store.state.cartDishes.length}}</span>
            <v-icon>mdi-cart-outline</v-icon> 
          </v-badge>
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
import router from './router';
export default {
  name: 'App',

  components: {
  },

  data: () => ({
    //
  }),
  methods:{
    goNext(url){
      router.push(url);
    },
  }
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
.box{
display: flex;
flex-flow: row nowrap;
justify-content: left;
align-content: left;
align-items:left;

}
.tBold {
    font-weight: bold;  
}
.tll {
    font-size: 2.5em;
    }
.tl {
    font-size: 1.5em;
    }
.tm {
    font-size: 0.9em;
    }
.ts {
    font-size: 0.8em;
}
.tsTrim{
    font-size: 0.8em;
    text-overflow: ellipsis;   /* IE, Safari (WebKit) */
    overflow:hidden;              /* don't show excess chars */
    white-space:nowrap;           /* force single line */
    width: 90px;  /*This property playing a major role*/
    flex: 1 1 auto;
}
</style>