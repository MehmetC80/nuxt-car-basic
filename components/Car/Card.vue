<script setup>
import heardFilled from "@/assets/images/headfill.png";
import heardOutline from "@/assets/images/heard.png";

const props = defineProps({
  car: Object,
  favored: Boolean,
});

const emit = defineEmits(["favor"]);
const config = useRuntimeConfig();
</script>

<template>
  <div
    class="relative shadow border w-full overflow-hidden mb-5 cursor-pointer h-[200px]"
  >
    <img
      :src="favored ? heardFilled : heardOutline"
      class="absolute w-7 right-5 top-2 z-20"
      @click="emit('favor', car.id)"
    />
    <div class="flex h-full" @click="navigateTo(`/car/${car.name}-${car.id}`)">
      <NuxtImg
        :src="`${config.public.supabase.url}/storage/v1/object/public/images/${car.image}`"
        alt="bmw"
        class="w-[300px] h-full object-cover"
      />
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
