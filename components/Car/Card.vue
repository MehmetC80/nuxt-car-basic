<script setup>
// type CarProps = {
//   car: {
//     id: number,
//     name: string,
//     price: string,
//     url: string,
//     seats: number,
//     miles: string,
//     features: string[],
//     description: string,
//   },
// };

const props = defineProps({
  car: Object,
});
</script>

<template>
  <div
    class="shadow border w-full overflow-hidden mb-5 cursor-pointer h-[200px]"
    @click="navigateTo(`/car/${car.name}-${car.id}`)"
  >
    <div class="flex h-full">
      <img :src="car.url" alt="bmw" class="w-[300px] h-full object-cover" />
      <div class="p-4 flex flex-col">
        <div>
          <h2 class="text-2xl text-blue-700">{{ car.name }}</h2>
          <p class="text-gray-700">
            {{ car.description }}
          </p>
        </div>
        <h2 class="mt-auto text-xl">{{ car.price }}</h2>
      </div>
    </div>
  </div>
</template>
