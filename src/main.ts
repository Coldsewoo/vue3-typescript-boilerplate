// import devtools from '@vue/devtools'

// devtools.connect()
;(window as any).global = window
import { createApp } from 'vue'
import App from './App.vue'
import Router from './router'
import Store from './store'

import '/Utils/prototypes/Object'
import '/Assets/scss/common.scss'

createApp(App).use(Router).use(Store.original).mount('#app')
