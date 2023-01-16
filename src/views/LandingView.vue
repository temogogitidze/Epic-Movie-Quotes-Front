<template>
  <div>
    <div class="h-[400px] md:h-screen bg-black md:px-16 px-10 pt-7">
      <RegisterModal />
      <LoginModal />
      <nav>
        <TheNavbar />
      </nav>
      <div class="flex flex-col h-1/2 items-center justify-center">
        <h3 class="text-color-gold text-center">{{ $t("find_any_quote") }}</h3>
        <the-button
          @click="modalStore.toggleLoginModal(true)"
          classes="bg-red-600 border-red-600 mt-5 text-xl  hover:scale-110 duration-300"
          >{{ $t("get_started") }}
        </the-button>
      </div>
    </div>
    <img src="@/assets/landing-1.png" class="-z-10" />
    <img src="@/assets/landing-2.png" class="-z-10" />
    <img src="@/assets/landing-3.png" class="-z-10 w-full" />
    <div class="bg-[#181623] py-5 px-10 md:px-20">
      <p class="text-[#DDCCAA] text-sm md:text-md">
        © {{ $t("all_rights_reserved") }}.
      </p>
    </div>
  </div>
</template>

<script setup>
import TheNavbar from "@/components/navbars/TheNavbar.vue";
import RegisterModal from "@/components/modals/RegisterModal.vue";
import LoginModal from "@/components/modals/LoginModal.vue";
import { useModalStore } from "@/stores/useModalStore.js";

const modalStore = useModalStore();
</script>
