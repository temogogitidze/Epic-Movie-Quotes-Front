<template>
  <div class="flex justify-center text-white z-10">
    <div class="md:relative z-30">
      <button @click="toggleDropdown">
        <DotsIcon :dropdownState="dropdownState" />
      </button>
      <div
        v-if="dropdownState"
        class="origin-top-right px-10 pb-4 pt-2 absolute right-0 bg-[#24222F] w-[250px] rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
      >
        <div class="flex-col mt-3">
          <div
            class="items-center flex cursor-pointer"
            @click="showViewQuotesModal()"
          >
            <ViewIcon />
            <p class="ml-7">{{ $t("view_quote") }}</p>
          </div>
          <div
            class="items-center flex my-5 cursor-pointer"
            @click="showEditQuoteModal()"
          >
            <EditIcon />
            <p class="ml-7">{{ $t("edit") }}</p>
          </div>
          <div
            class="items-center flex cursor-pointer"
            @click="deleteQuoteById()"
          >
            <DeleteIcon />
            <p class="ml-7">{{ $t("delete") }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { storeToRefs } from "pinia";

import DotsIcon from "@/components/ui/icons/DotsIcon.vue";
import ViewIcon from "@/components/ui/icons/ViewIcon.vue";
import EditIcon from "@/components/ui/icons/EditIcon.vue";
import DeleteIcon from "@/components/ui/icons/DeleteIcon.vue";
import { useModalStore } from "@/stores/useModalStore.js";
import { useQuotesStore } from "@/stores/useQuotesStore.js";

const store = useModalStore();

const dropdownState = ref(false);

function showViewQuotesModal() {
  store.toggleViewQuoteModal();
  dropdownState.value = false;
}

function showEditQuoteModal() {
  store.toggleEditQuoteModal();
  dropdownState.value = false;
}

function toggleDropdown() {
  dropdownState.value = !dropdownState.value;
}

const { deleteQuote } = useQuotesStore();

const { quote } = storeToRefs(useQuotesStore());

function deleteQuoteById() {
  const quoteId = ref(quote.value.id);
  deleteQuote(quoteId.value);
  store.toggleQuoteDeletedModal();
}
</script>
