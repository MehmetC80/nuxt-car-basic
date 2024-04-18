<script setup>
const route = useRoute();
const { data: cars, refresh } = await useFetchCars(route.params.city, {
  minPrice: route.query.minPrice,
  maxPrice: route.query.maxPrice,
  make: route.params.make,
});

// functioniert momantan nicht wegen eines bugs
// watch(
//   () => route.query,
//   () => refresh()
// );

watch(
  () => route.query,
  () => {
    window.location.reload(true);
  }
);
</script>

<template>
  <div>
    <CarCards v-if="cars.length" :cars="cars" />

    <h1 class="text-xl text-red-600" v-else>
      Leider wurden keine Auto's mit ihren Kriterien gefunden.
    </h1>
  </div>
</template>
