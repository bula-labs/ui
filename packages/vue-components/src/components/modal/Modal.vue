<script setup lang="ts">
import type { ModalContext, ModalProps } from "./types";

import { provide, ref } from "vue";
import { ContextKey } from "./config";

const { id = "modal", overlay = true, ...props } = defineProps<ModalProps>();

const status = ref<boolean>(false);

// const modalStatus = computed({
//   get: () => status.value,
//   set: (val: boolean) => {
//     status.value = val;
//   },
// });

// const context = ref<ModalContext>({
//   overlay,
//
//   isOpen: false,
//   setOpen(value) {
//     if (typeof value === "boolean") {
//       this.isOpen = value;
//       return;
//     }
//
//     this.isOpen = !this.isOpen;
//   },
// });

const ctxVal: ModalContext = {
  isOpen: status,
  setOpen: () => status.value = !status.value,

  overlay,
};

provide(ContextKey, ctxVal);
</script>

<template>
  <div :id="id" v-bind="props">
    <slot />
  </div>
</template>
