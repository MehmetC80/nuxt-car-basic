<script setup>
definePageMeta({
  layout: "custom",
});

const { listings } = useCars();
</script>

<template>
  <div>
    <div class="flex justify-between mt-24 items-center">
      <h1 class="text-6xl">Meine Favoriten</h1>
      <NuxtLink
        to="/profile/listings/create"
        class="size-9 bg-blue-400 rounded-full text-white flex justify-center items-center font-bold cursor-pointer"
        >+</NuxtLink
      >
    </div>
    <div class="shadow rounded p-3 mt-5">
      <CarListingCard v-for="listing in listings" key:="listing.id"
      :listing="listing"/>
    </div>
  </div>
</template>
