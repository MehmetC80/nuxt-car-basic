<script setup>
const route = useRoute();
const { cars } = useCars();

useHead({
  title: `${route.params.name}`,
});

definePageMeta({
  layout: "custom",
});

const car = computed(() => {
  return cars.find((c) => {
    return c.id === parseInt(route.params.id);
  });
});

if (!car.value) {
  throw createError({
    statusCode: 404,
    message: `Auto mit der ${route.params.id} existiert nicht.`,
  });
}
</script>

<template>
  <div v-if="car">
    <CarDetailsHero :car="car" />
    <CarDetailsAttributes :features="car.features" />
    <CarDetailsDescription :description="car.description" />
    <CarDetailsContact />
  </div>
</template>
