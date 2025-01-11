<script setup lang="ts">
import type { ModalContext } from "./types";
import { inject } from "vue";

const context = inject<ModalContext>("ModalContext");
if (!context) {
  throw new Error("context not found!");
}
</script>

<template>
  <button @click="() => context.setOpen()" class="">
    <slot />
  </button>
</template>
