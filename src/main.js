import { createApp } from 'vue'
import App from './App.vue'
import './styles/main.css'
import { tilt } from './directives/tilt'
import { magnetic } from './directives/magnetic'

const app = createApp(App)
app.directive('tilt', tilt)
app.directive('magnetic', magnetic)
app.mount('#app')
