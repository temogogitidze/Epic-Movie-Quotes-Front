<template>
  <div
    class="relative z-10"
    aria-labelledby="modal-title"
    role="dialog"
    aria-modal="true"
    @click="props.onClick"
  >
    <!--
    Background backdrop, show/hide based on modal state.

    Entering: "ease-out duration-300"
      From: "opacity-0"
      To: "opacity-100"
    Leaving: "ease-in duration-200"
      From: "opacity-100"
      To: "opacity-0"
  -->
    <div
      :class="
        props.showModal
          ? 'fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity'
          : ''
      "
    ></div>

    <div :class="props.showModal ? 'fixed inset-0 z-10 overflow-y-auto' : ''">
      <div class="flex min-h-full items-end justify-center text-center">
        <!--
        Modal panel, show/hide based on modal state.

        Entering: "ease-out duration-300"
          From: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          To: "opacity-100 translate-y-0 sm:scale-100"
        Leaving: "ease-in duration-200"
          From: "opacity-100 translate-y-0 sm:scale-100"
          To: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
      -->
        <div
          @click.stop
          :class="props.showModal ? 'absolute top-14' : 'hidden'"
          class="px-5 py-3 md:px-20 md:py-10 transform overflow-hidden rounded-lg bg-modal-bg text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg"
        >
          <section class="flex flex-col items-center">
            <slot name="header"></slot>
          </section>
          <section>
            <div class="mt-2 flex flex-col">
              <slot name="body"></slot>
            </div>
          </section>
          <section class="flex justify-center">
            <slot name="footer"></slot>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps(["onClick", "showModal"]);
</script>
