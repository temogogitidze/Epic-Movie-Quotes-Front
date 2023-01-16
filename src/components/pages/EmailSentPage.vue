<template>
  <div class="bg-landing-bg h-screen md:px-16 px-10 pt-7">
    <the-modal :showModal="true">
      <template v-slot:header>
        <img src="@/assets/email-sent.png" alt="email-sent" class="mt-8" />
      </template>
      <template v-slot:body>
        <h1 class="text-center py-4 text-white text-3xl">
          {{ $t("thank_you") }}!
        </h1>
      </template>
      <template v-slot:footer>
        <section class="flex flex-col items-center mb-4">
          <p class="text-center text-white py-8 text-lg">
            {{ $t("check_the_email") }}
          </p>
          <div class="w-full text-center">
            <a
              href="https://mail.google.com/mail"
              target="_blank"
              class="bg-red-600 border-none w-full p-4 px-5 rounded text-white hover:scale-110 duration-300"
              >{{ $t("go_to_email") }}
            </a>
          </div>
        </section>
      </template>
    </the-modal>
  </div>
</template>

<script setup>
import TheModal from "@/components/ui/TheModal.vue";
</script>
