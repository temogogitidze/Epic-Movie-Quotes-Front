<template>
  <div>
    <button
      class="text-white pt-1 pb-1 pr-7 pl-7 border rounded"
      :class="classes"
    >
      <slot></slot>
    </button>
  </div>
</template>

<script setup>
defineProps({
  classes: {
    type: String,
    required: false,
  },
});
</script>
