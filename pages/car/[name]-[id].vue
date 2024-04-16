<script setup>
const route = useRoute();

useHead({
  title: `${route.params.name}`,
});

definePageMeta({
  layout: "custom",
});
</script>

<template>
  <div>
    <CarDetailsHero />
    <CarDetailsAttributes />
    <CarDetailsDescription />
    <CarDetailsContact />
  </div>
</template>
