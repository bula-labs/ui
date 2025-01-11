<script setup lang="ts">
import type { ButtonProps } from "./model";

defineProps<ButtonProps>();
</script>

<template>
  <button class="bula-ui-btn"><slot /></button>
</template>
