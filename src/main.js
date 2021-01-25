import { createApp } from 'vue'


import App from './App.vue'
import router from './router'
import store from './store'
import BaseCard from './components/ui/BaseCard.vue'
import BaseButton from './components/ui/BaseButton.vue'
import BaseBadge from './components/ui/BaseBadge.vue'
import BaseSpiner from "./components/ui/BaseSpiner.vue";
import BaseDialog from "./components/ui/BaseDialog.vue";



createApp(App)
    .use(store)
    .use(router)
    .component("base-card", BaseCard)
    .component("base-button", BaseButton)
    .component("base-badge", BaseBadge)
    .component("base-spiner", BaseSpiner)
    .component("base-dialog", BaseDialog)
    .mount("#app");