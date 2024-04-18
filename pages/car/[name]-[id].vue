<script setup>
const route = useRoute();

const { data: car } = await useFetchCar(route.params.id);

useHead({
  title: `${route.params.name}`,
});

definePageMeta({
  layout: "custom",
});

// Aukommnetierter code ist wenn man aus einer json direkt die daten fetched
// const { cars } = useCars();

// const car = computed(() => {
//   return cars.find((c) => {
//     return c.id === parseInt(route.params.id);
//   });
// });

// if (!car.value) {
//   throw createError({
//     statusCode: 404,
//     message: `Auto mit der ${route.params.id} existiert nicht.`,
//   });
//}
</script>

<template>
  <div v-if="car">
    <CarDetailsHero :car="car" />
    <CarDetailsAttributes :features="car.features" />
    <CarDetailsDescription :description="car.description" />
    <CarDetailsContact />
  </div>
</template>
