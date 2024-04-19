<script setup>
const props = defineProps({
  car: Object,
});

const config = useRuntimeConfig();
</script>

<template>
  <div>
    <div class="mt-10">
      <NuxtImg
        :src="`${config.public.supabase.url}/storage/v1/object/public/images/${car.image}`"
        alt=""
        class="w-full object-cover"
      />
      <h1 class="text-4xl mt-10">{{ car.name }}</h1>
      <div
        class="flex justify-between text-lg text-slate-500 mt-3 border-b pb-5"
      >
        <div class="flex">
          <p class="mr-2">{{ car.numberOfSeats }} Sitze</p>
          <p class="mr-2">|</p>
          <p class="mr-2">{{ car.miles }} KM</p>
        </div>
        <div class="font-bold text-2xl">{{ car.price }}€</div>
      </div>
    </div>
  </div>
</template>
