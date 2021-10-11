<template>
  <v-container>
     <div class="welcome grey darken-3 pa-5" v-if="welcome == 1">
       <v-row justify="center" align="center" class="welcome-t grey darken-4 elevation-10 mx-1 rounded">
          <v-col cols="12" class="text-center" v-if="wel == 1">
            <h1 class="pb-0 mb-1 blue--text text--darken-4">حاضر</h1>
            <h5 class="blue--text text--accent-4">نرم افزار تحت وب حضور و غیاب دانش آموزان</h5>
            <v-btn outlined large color="secondary" class="mt-4 pa-1" @click="wel=2">تایید</v-btn>
          </v-col>

          <v-col cols="12" class="text-center" v-if="wel == 2">
            <h5 class="blue--text text--accent-4 mb-4">لطفا نام خود را وارد کنید</h5>
            <v-row justify="center">
            <v-col cols="10" lg="4" md="4" sm="6">  
              <v-text-field outlined label="نام" color="secondary" dark v-model="name"></v-text-field>
            </v-col>
            </v-row>
            <v-btn outlined large color="secondary" class="mt-4 pa-1" @click="setName">تایید</v-btn>
          </v-col>

          <v-col cols="12" class="text-center" v-if="wel == 3">
            <h5 class="blue--text text--accent-4 mb-4">آیا مایل به نصب حاضر برای استفاده آسانتر هستید؟</h5>
            <v-btn outlined large color="success" class="mt-4 pa-1 ml-3" @click="install">بله</v-btn>
            <v-btn outlined large color="error" class="mt-4 pa-1" @click="end">خیر</v-btn>
          </v-col>

       </v-row>
    </div>

    <v-row justify="center" align="center" v-if="da.length == 0"> <v-chip class="px-7 py-4 mt-10">هیچ کلاسی موجود نیست.</v-chip> </v-row>

    <v-row>
      <v-col lg="3" md="4" sm="6" cols="12" v-for="d in da" :key="d">
        <v-hover v-slot="{ hover }">
          <v-item v-slot="{toggle }">
             <v-card elevation="3" class="d-flex align-center" @click="toggle" :elevation="hover ? 12 : 2">
              <v-btn icon large top class="mr-1" @click="goToEditClass(d.id)"> <v-icon>mdi-pencil</v-icon> </v-btn>
              <v-divider vertical class="mx-1"></v-divider>
                <v-responsive :aspect-ratio="16/8" @click="goToClass(d.id)">
                  <v-card-title class="centered"> <h3 class="font-yekan"> {{d.name}} </h3> </v-card-title>
                  <v-card-text> <v-icon>mdi-account-supervisor</v-icon> {{d.count}}</v-card-text>
                </v-responsive>
            </v-card>
          </v-item>
        </v-hover>
      </v-col>
    </v-row>
    
    
    <router-link to="add-class">
      <v-btn elevation="15" fab large class="btn-add-class" color="primary" >
        <v-icon>mdi-book-plus</v-icon>
      </v-btn>
    </router-link>

  </v-container>
</template>

<script>
import {data_config,data_readAll} from '../data'
data_config()
console.log(data_readAll('class'));
export default {
  name: "Home",
  data(){
    return{
      da: data_readAll('class'),
      wel: 1,
      welcome: null,
      name: null,
      deferredPrompt: null,
    }
  },

  methods:{
    goToClass(id){
      sessionStorage.setItem('class',id)
      this.$router.push('/class')
    },

    goToEditClass(id){
      sessionStorage.setItem('editClass',id)
      this.$router.push('/edit-class')
    },

    setName(){
      localStorage.setItem('teachName',this.name)
      this.wel = 3
    },

    install(){
      this.deferredPrompt.prompt();
      localStorage.setItem('wel',1)
      this.welcome = 0
    },

    end(){
      this.deferredPrompt = null;
      localStorage.setItem('wel',1)
      this.welcome = 0
    }

  },

  created() {
    window.addEventListener("beforeinstallprompt", e => {
      e.preventDefault();
      // Stash the event so it can be triggered later.
      this.deferredPrompt = e;
    });
    window.addEventListener("appinstalled", () => {
      this.deferredPrompt = null;
    });
  },

  beforeMount(){
    if(!localStorage.getItem('wel')){
      this.welcome = 1
    }else{
      this.welcome = 0
    }
  }

};
</script>
