<script setup>
const city = ref("");
const cityError = ref(false);

const handleSearch = () => {
  if (!city.value) {
    return (cityError.value = true);
  }
  navigateTo(`/city/${city.value.trim().toLowerCase()}/car`);
};

const onEnter = () => {
  if (!city.value) {
    return (cityError.value = true);
  }
  navigateTo(`/city/${city.value.trim().toLowerCase()}/car`);
};
</script>

<template>
  <div
    class="font-serif w-full text-2xl rounded-full bg-white flex justify-between sm:w-[500px] md:w-[600px] lg:w-[800px] first-letter: overflow-hidden drop-shadow-2xl mx-auto"
  >
    <input
      type="text"
      class="py-3 px-5 w-full text-2xl rounded-full focus:outline-none"
      :class="cityError ? 'border-red-500 border' : ''"
      placeholder="Suche in deiner Stadt"
      v-model="city"
      @keyup.enter="onEnter"
    />
    <button class="bg-sky-500 px-10 text-white" @click="handleSearch()">
      Suchen
    </button>
  </div>
  <p v-if="cityError" class="text-lg mt-2 p-1 text-red-600">
    Du hast keine Stadt gewählt.
  </p>
</template>
