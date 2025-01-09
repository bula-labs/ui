/// <reference types="vite/client" />
/// <reference types="./declaration" />

import VButton from '@/components/HelloWorld.vue';

declare module 'vue' {
    interface GlobalComponents {
        VButton: typeof VButton;
    }
}
