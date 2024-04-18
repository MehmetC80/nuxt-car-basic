<script setup>
/*
das war um die cars von der json direkt zu fetchen
const { cars } = useCars();
*/

// Ab hier werden die Daten von der api gefetcht

const props = defineProps({
  cars: Array,
});
const favorite = useLocalStorage("favorite", {});

const handleFavorite = (id) => {
  if (id in favorite.value) {
    delete favorite.value[id];
  } else {
    favorite.value = {
      ...favorite.value,
      [id]: true,
    };
  }
};
</script>

<template>
  <div class="w-full">
    <ClientOnly>
      <CarCard
        v-for="car in cars"
        :key="car.id"
        :car="car"
        @favor="handleFavorite"
        :favored="car.id in favorite"
    /></ClientOnly>
  </div>
</template>
