<script setup lang="ts">
import type { ModalContext, ModalProps } from "./types";

import { provide, ref } from "vue";
import { ContextKey } from "./config";

const { id = "modal", overlay = true, ...props } = defineProps<ModalProps>();

const context = ref<ModalContext>({
  overlay,

  isOpen: false,
  setOpen(value) {
    this.isOpen = value ?? !this.isOpen;
  },
});

/**
 *
 * ```typescript
 * const h1Props = { ariaDisabled: true, ariaDesc: 'asd' }
 * return <h1 {...h1Props}></h1>
 * ```
 *
 * ```typescript
 * return <h1 ariaDisabled='true', ariaDesc='asd'></h1>
 * ```
 *
 */

provide(ContextKey, context);
</script>

<template>
  <div v-bind="props">
    <slot />
  </div>
</template>
