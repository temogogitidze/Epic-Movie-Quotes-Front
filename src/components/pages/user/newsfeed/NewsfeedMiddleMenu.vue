<template>
  <div class="flex">
    <section class="flex text-white pl-6 md:pl-10">
      <button class="flex md:bg-[#24222F] p-2 rounded-md">
        <AddQuoteModal />
        <div @click="toggleAddQuotesModal()" class="flex">
          <AddQuoteIcon />
          <p class="ml-2 text-base font-normal">{{ $t("write_new_quote") }}</p>
        </div>
      </button>
    </section>
    <section class="ml-5 text-[#a1a5a8] hidden md:block">
      <section class="flex p-2 border-b border-[#a1a5a8]">
        <Form @submit="searchSubmit" class="flex">
          <button><FindIcon /></button>
          <SearchInput
            :placeholder="placeholderText"
            name="search"
            classes="ml-2 text-base bg-transparent lg:w-[400px]"
          />
        </Form>
      </section>
    </section>
  </div>
</template>

<script setup>
import { Form } from "vee-validate";
import AddQuoteIcon from "@/components/ui/icons/AddQuoteIcon.vue";
import FindIcon from "@/components/ui/icons/FindIcon.vue";
import AddQuoteModal from "@/components/modals/AddQuoteModal.vue";
import SearchInput from "@/components/forms/SearchInput.vue";
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import { useModalStore } from "@/stores/useModalStore";
import { useQuotesStore } from "@/stores/useQuotesStore.js";

const { t } = useI18n({ useScope: "global" });

const store = useModalStore();

function toggleAddQuotesModal() {
  store.toggleAddQuotesModal();
}

const placeholderText = computed(() => {
  return (
    t("placeholders.enter_to_search") +
    " @ " +
    t("placeholders.enter_to_search_two") +
    " , " +
    " # - " +
    t("placeholders.enter_to_search_three")
  );
});

function searchSubmit(values) {
  const quotesStore = useQuotesStore();
  quotesStore.searchQuery = values.search;
}
</script>
