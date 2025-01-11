<script setup lang="ts">
import type { ModalContext } from "./types";

import ModalOverlay from "@/components/modal/ModalOverlay.vue";
import { inject } from "vue";
import { ContextKey } from "./config";

const context = inject<ModalContext>(ContextKey);
if (!context) {
  throw new Error("`<ModalRoot>` is not wrapped");
}
</script>

<template>
  <Teleport v-if="context.isOpen.value" to="body">
    <section id="modal-wrapper" class="modal-wrapper">
      <ModalOverlay v-if="!!context.overlay" />

      <div class="modal-content">
        <header>
          <slot name="header" />
        </header>

        <slot />

        <footer>
          <slot name="footer" />
        </footer>
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
</style>
