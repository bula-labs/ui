import { createApp } from 'vue';
import router from './router';
import App from './App.vue';

import './style.css';

const app = createApp(App).use(router);

router.isReady().then(() => {
    app.mount('#app');
});

// createApp(App).mount('#app')
