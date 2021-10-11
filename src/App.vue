<template>
  <v-app>
    <app-bar />

    <v-container class="mt-16 pt-16"> 
      <router-view class="mt-6"></router-view>
    </v-container>
  </v-app>
</template>

<script>
import appBar from "../src/components/app-bar.vue";

export default {
  name: "app",
  components: {
    appBar,
  },
};
</script>
