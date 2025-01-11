<script setup lang="ts">
import { Modal, ModalContent, ModalTrigger } from "@bula-ui/vue";
</script>

<template>
  <modal id="base-modal-1" overlay>
    <modal-trigger>Toggle</modal-trigger>

    <modal-content>
      <ul>
        <li>A</li>
        <li>B</li>
        <li>C</li>
        <li>D</li>
      </ul>
    </modal-content>
  </modal>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
