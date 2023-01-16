<template>
  <div class="relative inline-block text-left">
    <div>
      <button
        type="button"
        class="inline-flex md:w-[108px] justify-center rounded-md mr-5 md:mr-0 font-medium text-white shadow-sm hover:text-red-500 focus:outline-none focus:ring-2 focus:ring-black"
        id="menu-button"
        aria-expanded="true"
        aria-haspopup="true"
        @click="showDropdown"
      >
        {{ locale }}
        <svg
          class="-mr-1 ml-2 h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fill-rule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
            clip-rule="evenodd"
          />
        </svg>
      </button>
    </div>

    <!--
    Dropdown menu, show/hide based on menu state.

    Entering: "transition ease-out duration-100"
      From: "transform opacity-0 scale-95"
      To: "transform opacity-100 scale-100"
    Leaving: "transition ease-in duration-75"<svg width="20" height="14" viewBox="0 0 20 14" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M20 7C20 7 16.25 0.125 10 0.125C3.75 0.125 0 7 0 7C0 7 3.75 13.875 10 13.875C16.25 13.875 20 7 20 7ZM1.46625 7C2.07064 6.0814 2.7658 5.22586 3.54125 4.44625C5.15 2.835 7.35 1.375 10 1.375C12.65 1.375 14.8487 2.835 16.46 4.44625C17.2354 5.22586 17.9306 6.0814 18.535 7C18.4625 7.10875 18.3825 7.22875 18.2913 7.36C17.8725 7.96 17.2537 8.76 16.46 9.55375C14.8487 11.165 12.6487 12.625 10 12.625C7.35 12.625 5.15125 11.165 3.54 9.55375C2.76456 8.77414 2.07065 7.91859 1.46625 7Z" fill="white"/>
<path d="M10 3.875C9.1712 3.875 8.37634 4.20424 7.79029 4.79029C7.20424 5.37634 6.875 6.1712 6.875 7C6.875 7.8288 7.20424 8.62366 7.79029 9.20971C8.37634 9.79576 9.1712 10.125 10 10.125C10.8288 10.125 11.6237 9.79576 12.2097 9.20971C12.7958 8.62366 13.125 7.8288 13.125 7C13.125 6.1712 12.7958 5.37634 12.2097 4.79029C11.6237 4.20424 10.8288 3.875 10 3.875ZM5.625 7C5.625 5.83968 6.08594 4.72688 6.90641 3.90641C7.72688 3.08594 8.83968 2.625 10 2.625C11.1603 2.625 12.2731 3.08594 13.0936 3.90641C13.9141 4.72688 14.375 5.83968 14.375 7C14.375 8.16032 13.9141 9.27312 13.0936 10.0936C12.2731 10.9141 11.1603 11.375 10 11.375C8.83968 11.375 7.72688 10.9141 6.90641 10.0936C6.08594 9.27312 5.625 8.16032 5.625 7Z" fill="white"/>
</svg>

      From: "transform opacity-100 scale-100"
      To: "transform opacity-0 scale-95"
  -->
    <div
      class="absolute right-0 z-10 mt-2 w-[109px] origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
      role="menu"
      aria-orientation="vertical"
      aria-labelledby="menu-button"
      tabindex="-1"
      v-if="dropdownState"
    >
      <div class="py-1" role="none">
        <button
          href="#"
          role="menuitem"
          tabindex="-1"
          id="menu-item-0"
          class="block px-4 py-2 text-sm"
          :class="
            locale === 'en' ? 'bg-gray-100 text-red-500' : 'text-gray-700'
          "
          @click="switchLocaleKa"
        >
          Eng (English)
        </button>
        <button
          href="#"
          role="menuitem"
          tabindex="-1"
          id="menu-item-0"
          class="block px-4 py-2 text-sm"
          :class="
            locale === 'ka' ? 'bg-gray-100 text-red-500' : 'text-gray-700'
          "
          @click="switchLocaleEn"
        >
          Ka (ქართული)
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import { setLocale } from "@vee-validate/i18n";

const { locale } = useI18n();

let dropdownState = ref(false);

function switchLocaleKa() {
  setLocale("en");
  return (locale.value = "en"), (dropdownState.value = !dropdownState.value);
}
function switchLocaleEn() {
  setLocale("ka");
  return (locale.value = "ka"), (dropdownState.value = !dropdownState.value);
}

function showDropdown() {
  return (dropdownState.value = !dropdownState.value);
}
</script>
