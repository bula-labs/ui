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
  <Teleport to="body" v-if="context.isOpen">
    <section id="modal-wrapper" class="modal-wrapper">
      <div
        id="modal-overlay"
        class="modal-overlay"
        v-if="!!context.overlay && context.isOpen"
      ></div>

      <div class="modal-content">
        <slot />
      </div>
    </section>
  </Teleport>
</template>

<style scoped>
.modal-wrapper {
  position: fixed;
  inset: 0;
  display: grid;
  place-content: center;
}

.modal-content {
  position: relative;
  z-index: 40;
  max-width: 720px;
  margin-left: auto;
  margin-right: auto;
}

.modal-overlay {
  position: absolute;
  inset: 0;
  background: rgba(10, 10, 10, 0.75);
  backdrop-filter: blur(4px);
  z-index: 30;
}
</style>
