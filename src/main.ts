import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'

import './assets/css/main.css'

import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import {createPinia} from 'pinia'

const app = createApp(App)

const pinia = createPinia()

app.use(pinia)

app.use(router)

app.mount('#app')

app.config.errorHandler = (err, instance, info) => {
    if (err === "Unauthorized") {
        console.log("Unauthorized catched. Push user to login page")
        router.push({name: 'login'})
    }
}
