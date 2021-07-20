// import devtools from '@vue/devtools'

// devtools.connect()
;(window as any).global = window
import { createApp } from 'vue'
import App from './App.vue'
import Router from './router'
import Store from './store'

import '/Utils/prototypes/Object'
import '/Assets/scss/common.scss'
import '/Assets/scss/transitions.scss'
import '/Assets/scss/sweetalerts.scss'
import '/Assets/scss/components.scss'
import 'vue-slider-component/theme/default.css'

createApp(App).use(Router).use(Store.original).mount('#app')
