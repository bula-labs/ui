<script setup lang="ts">
import type { ModalContext } from "./types";

import { inject } from "vue";
import { ContextKey } from "./config";

const context = inject<ModalContext>(ContextKey);
if (!context) {
  throw new Error("`<ModalRoot>` is not wrapped");
}
</script>

<template>
  <div
    v-if="context.isOpen"
    id="modal-overlay"
    class="modal-overlay"
  />
</template>

<style scoped>
.modal-overlay {
  position: absolute;
  inset: 0;
  background: rgba(10, 10, 10, 0.75);
  backdrop-filter: blur(4px);
  z-index: 30;
}
</style>
