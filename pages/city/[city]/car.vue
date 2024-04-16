<script setup>
const route = useRoute();

useHead({
  title: `${route.params.make ? route.params.make : "Cars"} in ${
    route.params.city
  }`,
});

definePageMeta({
  layout: "custom",
});
</script>

<template>
  <div>
    <div class="mt-32 flex">
      <NuxtErrorBoundary>
        <CarSideBar />
        <NuxtPage />
        <template #error="{ error }">
          <div class="mx-auto text-center flex flex-col">
            <h1 class="text-4xl text-gray-600">
              Opps! Etwas ist schiefgelaufen
            </h1>
            <code class="text-xl text-red-600 mt-2">{{ error }}</code>
            <button
              @click="error.value = null"
              class="rounded-lg bg-blue-400 px-10 py-3 mt-4 hover:underline text-white"
            >
              Zurück
            </button>
          </div>
        </template>
      </NuxtErrorBoundary>
    </div>
  </div>
</template>
