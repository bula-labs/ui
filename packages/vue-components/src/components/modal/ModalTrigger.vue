<script setup lang="ts">
import type { AsTag } from "@/components/fragment/types.ts";

import type { ModalContext } from "./types";
import { Primitive } from "@/components";
import { inject } from "vue";

const props = defineProps<{
  asChild?: boolean;
  as?: AsTag;
}>();

const context = inject<ModalContext>("ModalContext");
if (!context) {
  throw new Error("context not found!");
}
</script>

<template>
  <Primitive v-bind="props" @click="context.setOpen">
    <slot />
  </Primitive>
</template>
