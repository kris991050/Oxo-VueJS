import { createApp } from 'vue';

import router from './router.js';
import store from './store/index.js';
import App from './App.vue';
import BaseCard from './components/ui/BaseCard.vue';
import BaseButton from './components/ui/BaseButton.vue';
import BaseBox from './components/ui/BaseBox.vue';
import BaseBadge from './components/ui/BaseBadge.vue';
import BaseContainer from './components/ui/BaseContainer.vue';
import BaseDialog from './components/ui/BaseDialog.vue';
import BaseSpinner from './components/ui/BaseSpinner.vue';

const app = createApp(App)

app.use(router);
app.use(store);

app.component('base-card', BaseCard);
app.component('base-button', BaseButton);
app.component('base-box', BaseBox);
app.component('base-badge', BaseBadge);
app.component('base-container', BaseContainer);
app.component('base-dialog', BaseDialog);
app.component('base-spinner', BaseSpinner);

app.mount('#app');
