<template>
  <button
    class="flex justify-center h-[38px] transition hover:bg-indigo-600 ease-in-out duration-300 hover:scale-110 border border-white rounded mt-4 align-middle items-center"
  >
    <img src="@/assets/google-signup.png" class="w-4 color-red" />
    <p class="text-white text-base font-normal ml-2">
      {{ $t("sign_in_google") }}
    </p>
  </button>
</template>
