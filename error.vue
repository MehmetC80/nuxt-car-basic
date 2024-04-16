<script setup>
const error = useError();

const handleError = () => {
  clearError({
    redirect: "/",
  });
};
</script>

<template>
  <div class="flex h-screen justify-center items-center flex-col">
    <h1 class="text-9xl text-gray-600">{{ error.statusCode }}</h1>
    <p class="mt-7 text-4xl text-gray-600">{{ error.message }}</p>
    <button
      @click="handleError()"
      class="hover:underline bg-blue-500 border rounded-lg py-4 px-4 text-white mt-4"
    >
      zurück
    </button>
  </div>
</template>
