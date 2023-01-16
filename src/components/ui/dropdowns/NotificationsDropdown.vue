<template>
  <div class="flex justify-center text-white z-10">
    <div class="md:relative">
      <button @click="toggleDropdown" class="mr-8 inline-flex relative">
        <NotificationIcon />
        <div
          v-if="unreadNotifications"
          class="inline-flex absolute -top-2 -right-2 justify-center items-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full"
        >
          {{ unreadNotifications }}
        </div>
      </button>
      <div
        v-if="dropdownState"
        class="overflow-y-auto max-h-[600px] origin-top-right px-10 py-3 md:p-6 absolute mt-2 right-0 md:right-5 bg-black w-screen md:w-[620px] rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
      >
        <div class="flex justify-between mt-3 mb-5">
          <p class="md:text-xl text-sm">{{ $t("notifications") }}</p>
          <p
            @click="markAllAsReadHandler()"
            class="md:text-sm text-xs pt-1 underline underline-offset-1 cursor-pointer hover:text-red-500"
          >
            {{ $t("mark_as_read") }}
          </p>
        </div>
        <div
          v-for="notification in notifications"
          :key="notification.id"
          class="py-2"
        >
          <div class="flex justify-between p-5 border border-gray-600 rounded">
            <section class="flex">
              <img
                :src="
                  notification.sender.thumbnail
                    ? backendUrl + notification.sender.thumbnail
                    : 'https://cdn-icons-png.flaticon.com/512/149/149071.png'
                "
                class="md:h-[80px] h-[50px] rounded-full border max-w-[80px]"
                :class="!notification.read ? 'border-green-500' : ''"
              />
              <section class="flex flex-col">
                <p class="ml-4 md:mt-2 md:text-base">
                  {{ notification.sender.username }}
                </p>
                <p
                  v-if="notification.type === 'comment'"
                  class="ml-4 md:mt-3 mt-1 md:text-base text-center flex"
                >
                  <span class="mr-2 mt-0.5"> <CommentedIcon /></span>
                  {{ $t("commented_to_your_movie_quote") }}
                </p>
                <p
                  v-else
                  class="ml-4 md:mt-3 mt-1 md:text-base text-center flex"
                >
                  <span class="mr-2 mt-0.5"> <LikedQuoteIcon /></span>
                  {{ $t("reacted_to_your_quote") }}
                </p>
              </section>
            </section>
            <section class="flex flex-col">
              <p class="ml-4 md:mt-2 md:text-base">
                {{
                  Math.ceil(
                    (Date.now() - new Date(notification.created_at)) / 60000
                  )
                }}
                {{ $t("min_ago") }}
              </p>
              <p
                v-if="!notification.read"
                class="ml-4 md:mt-3 mt-1 md:text-base text-end text-[#198754]"
              >
                {{ $t("new") }}
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from "vue";
import CommentedIcon from "@/components/ui/icons/CommentedIcon.vue";
import NotificationIcon from "@/components/ui/icons/NotificationIcon.vue";
import LikedQuoteIcon from "@/components/ui/icons/LikedQuoteIcon.vue";
import { storeToRefs } from "pinia";
import { useUserStore } from "@/stores/useUserStore.js";
import { useQuotesStore } from "@/stores/useQuotesStore.js";
import axios from "@/config/axios/index.js";

const { getQuotesRefresh } = useQuotesStore();

const dropdownState = ref(false);

function toggleDropdown() {
  dropdownState.value = !dropdownState.value;
}

const { user } = storeToRefs(useUserStore());

const backendUrl = import.meta.env.VITE_API_THUMBNAIL_URL;

const notifications = ref([]);

watch(
  () => user.value.id,
  (state) => {
    user.value.id = state;
    window.Echo.private(`comments.${state}`).listen(
      "QuoteCommented",
      ({ notification }) => {
        notifications.value.unshift(notification);
        unreadNotifications.value++;
        getQuotesRefresh();
      }
    );
    window.Echo.private(`likes.${state}`).listen(
      "QuoteLiked",
      ({ notification }) => {
        notifications.value.unshift(notification);
        unreadNotifications.value++;
        getQuotesRefresh();
      }
    );
  }
);

const unreadNotifications = ref(0);

onMounted(() => {
  axios.get("get-notifications").then((response) => {
    notifications.value = response.data;
  });
  axios.get("get-unread-notifications").then((response) => {
    unreadNotifications.value = response.data;
  });
});

function markAllAsReadHandler() {
  unreadNotifications.value = 0;
  axios.post("mark-read").then((response) => {
    notifications.value = response.data;
  });
}
</script>
