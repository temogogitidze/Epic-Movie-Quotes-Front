<template>
  <div
    class="relative z-50"
    aria-labelledby="modal-title"
    role="dialog"
    aria-modal="true"
    @click="props.onClick"
  >
    <div
      :class="
        props.showModal
          ? 'fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity'
          : ''
      "
    ></div>
    <div :class="props.showModal ? 'fixed inset-0 z-10 overflow-y-auto' : ''">
      <div class="flex min-h-full items-end justify-center text-center">
        <div
          @click.stop
          :class="props.showModal ? 'absolute top-14' : 'hidden'"
          class="transform max-w-3xl overflow-hidden rounded-lg bg-[#11101A] text-left shadow-xl transition-all sm:my-8 sm:w-full md:w-2/3"
        >
          <section class="">
            <div
              class="flex justify-center items-center border-b border-[#656464] py-5"
            >
              <slot name="header"></slot>
            </div>
            <div class="px-7 py-3">
              <slot name="body"> </slot>
            </div>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  onClick: { required: false, type: Function },
  showModal: { type: Boolean, required: false },
});
</script>
