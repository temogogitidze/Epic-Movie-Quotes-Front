<template>
  <div class="bg-[#181623] pb-[80px]">
    <div class="flex xl:gap-x-24 md:pt-8 h-full">
      <section class="pl-16 hidden md:flex">
        <NewsfeedSidebar />
      </section>
      <section class="mt-5 md:mt-0 h-full min-h-screen">
        <NewsfeedMiddleMenu />
        <NewsfeedContent />
      </section>
    </div>
  </div>
</template>

<script setup>
import NewsfeedSidebar from "@/components/pages/user/newsfeed/NewsfeedSidebar.vue";
import NewsfeedMiddleMenu from "@/components/pages/user/newsfeed/NewsfeedMiddleMenu.vue";
import NewsfeedContent from "@/components/pages/user/newsfeed/NewsfeedContent.vue";
import { useUserStore } from "@/stores/useUserStore";
import { useQuotesStore } from "@/stores/useQuotesStore";

const { getQuotes } = useQuotesStore();
getQuotes();

const { getUser } = useUserStore();
getUser();
</script>
