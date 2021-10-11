<template>
  <v-app-bar
      app
      prominent
      shrink-on-scroll
      src="../assets/img/Blue-Wave-Background-1.svg"
      fade-img-on-scroll
      class="ltr"
      color="#232f44"
    >
      <template v-slot:img="{ props }">
        <v-img
          v-bind="props"
          gradient="to top right, rgba(100,115,201,.7), rgba(25,32,72,.7)"
        ></v-img>
      </template>

      <v-menu bottom left min-width="250">
        <template v-slot:activator="{ on, attrs }">
          <v-app-bar-nav-icon v-bind="attrs" v-on="on">
            <v-icon color="white">mdi-dots-vertical</v-icon>
          </v-app-bar-nav-icon>
        </template>

        <v-list class="">
          <router-link to="/setting" class="v-btn w-100"> 
            <v-list-item link>
              <v-list-item-icon> <v-icon>mdi-cog</v-icon> </v-list-item-icon>
              <v-list-item-title>تنظیمات</v-list-item-title> 
            </v-list-item>
          </router-link>

          <router-link to="/backup" class="v-btn w-100"> 
            <v-list-item link>
              <v-list-item-icon> <v-icon>mdi-backup-restore</v-icon> </v-list-item-icon>
              <v-list-item-title> پشتیبان گیری </v-list-item-title>
            </v-list-item>
          </router-link>

          <router-link to="/education" class="v-btn w-100"> 
            <v-list-item link>
              <v-list-item-icon> <v-icon>mdi-help</v-icon> </v-list-item-icon>
              <v-list-item-title> آموزش </v-list-item-title>
            </v-list-item>
          </router-link>
          
        </v-list>
      </v-menu>

      <v-spacer></v-spacer>
      <v-app-bar-title>
        <h3
          class="font-weight-bold font-yekan purple--text text--lighten-5 pr-16"
        >
          حاضر
        </h3>
      </v-app-bar-title>
      <v-spacer></v-spacer>

      <v-btn icon color="white" @click="themeChange" v-if="themeNavBtn == 'true'"> <v-icon>mdi-theme-light-dark</v-icon> </v-btn>

      <router-link to="/" class="v-btn"> <v-btn icon color="white"> <v-icon class="white--text">mdi-home-variant</v-icon> </v-btn> </router-link>
      <v-btn icon color="white" @click="back" v-if="backStatus == 'true'"> <v-icon class="white--text">mdi-keyboard-backspace</v-icon> </v-btn> 
      
    </v-app-bar>
</template>

<script>
export default {
  name: "app-bar",
  data(){
    return{
      themeNavBtn: localStorage.getItem("themeBtn"),
      backStatus: localStorage.getItem("backBtn"),
    }
  },

  methods: {
    themeChange() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
      localStorage.setItem("theme", this.$vuetify.theme.dark);
    },

    back(){
      this.$router.go(-1)
    }

  },

  beforeMount(){
    if(!localStorage.getItem("themeBtn")){
      localStorage.setItem('themeBtn',true)
    }

    if(!localStorage.getItem("backBtn")){
      localStorage.setItem('backBtn',false)
    }
  }
};
</script>
