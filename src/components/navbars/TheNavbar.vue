<template>
  <div class="">
    <nav class="mx-auto md:flex md:justify-between md:items-center">
      <div class="flex items-center justify-between">
        <h3 class="text-color-gold sm:text-xl md:text-2xl">MOVIE QUOTES</h3>
        <div class="flex md:hidden">
          <LanguageDropdown />
          <button
            @click="toggleNav"
            type="button"
            class="text-gray-100 hover:text-gray-400 focus:outline-none focus:text-gray-400"
          >
            <svg viewBox="0 0 24 24" class="w-6 h-6 fill-current">
              <path
                fill-rule="evenodd"
                d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
              ></path>
            </svg>
          </button>
        </div>
      </div>
      <ul
        :class="showMenu ? 'flex ' : 'hidden'"
        class="flex-col mt-8 bg-gray-900 md:bg-transparent md:border-none border py-4 border-white border-opacity-30 rounded-md space-y-2 md:flex md:space-y-0 md:flex-row items-center md:space-x-8 md:mt-0"
      >
        <LanguageDropdown class="hidden md:block" />
        <the-button
          classes="bg-red-600 border-red-600"
          @click="toggleRegisterModal"
          >{{ $t("sign_up") }}</the-button
        >
        <h1 class="text-white md:hidden">OR</h1>
        <the-button classes="bg-transparent" @click="toggleLoginModal">{{
          $t("log_in")
        }}</the-button>
      </ul>
    </nav>
  </div>
</template>

<script setup>
import LanguageDropdown from "@/components/ui/dropdowns/LanguageDropdown.vue";
import { useModalStore } from "@/stores/useModalStore.js";
import { ref } from "vue";

let showMenu = ref(false);

function toggleNav() {
  return (showMenu.value = !showMenu.value);
}

const store = useModalStore();

function toggleRegisterModal() {
  store.toggleRegisterModal();
}

function toggleLoginModal() {
  store.toggleLoginModal();
}
</script>
