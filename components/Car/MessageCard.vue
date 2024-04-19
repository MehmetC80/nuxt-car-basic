<script setup>
definePageMeta({
  layout: "custom",
});

const props = defineProps({
  message: Object,
});
</script>

<template>
  <div class="even:bg-gray-400 p-4">
    <h1 class="font-bold text-2xl">{{ message.name }}</h1>
    <p class="text-gray-800">
      {{ message.message }}
    </p>
    <div class="flex items-center mt-4">
      <p class="text-green-700 mr-10">{{ message.email }}</p>
      <p class="text-blue-00">{{ message.phone }}</p>
    </div>
  </div>
</template>
