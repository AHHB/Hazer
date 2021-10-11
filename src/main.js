import Vue from 'vue'
import VueHtmlToPaper from 'vue-html-to-paper'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import vuetify from './plugins/vuetify'
import '../src/assets/style/css/style.css'

Vue.config.productionTip = false


const options = {
  name: '_blank',
  specs: [
    'fullscreen=yes',
    'titlebar=yes',
    'scrollbars=yes'
  ],
  styles: [
    'public/style.css',
    "https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css",
    "./assets/style/css/landscape.css"    
  ],
  timeout: 1000, // default timeout before the print window appears
  autoClose: true, // if false, the window will not close after printing
  windowTitle: window.document.title, // override the window title
}

Vue.use(VueHtmlToPaper, options);

new Vue({
  router,
  vuetify,
  render: function (h) { return h(App) }
}).$mount('#app')

