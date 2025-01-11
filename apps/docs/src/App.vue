<script setup lang="ts">
import { BulaButton, Modal, ModalContent, ModalTrigger } from "@bula-ui/vue";
</script>

<template>
  <Modal id="base-modal" overlay>
    <ModalTrigger as-child as="as">
      <BulaButton>Toggle</BulaButton>
    </ModalTrigger>

    <ModalContent>
      <ul>
        <li>A</li>
        <li>B</li>
        <li>C</li>
        <li>D</li>
      </ul>
    </ModalContent>
  </Modal>
</template>

<style scoped>

</style>
