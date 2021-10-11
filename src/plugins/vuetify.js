import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import '@mdi/font/css/materialdesignicons.css' 

Vue.use(Vuetify);

var tme = false

if(localStorage.getItem("theme")=="true")
{
  tme = true
}else{
  tme = false
}

export default new Vuetify({
    rtl: true,
    icons: {
      iconfont: 'mdi', 
    },
    theme: { 
      dark: tme ,
      
      themes:{
        light:  {
          primary: "#0F32E5",
          secondary: "#0f7ae6",
          accent: "#34568b",
          error: "#f44336",
          warning: "#ffc107",
          info: "#009688",
          success: "#4caf50"
          },
          dark:  {
            primary: "#0F32E5",
            secondary: "#0f7ae6",
            accent: "#34568b",
            error: "#f44336",
            warning: "#ffc107",
            info: "#009688",
            success: "#4caf50"
            }
      }
    
    },
});
