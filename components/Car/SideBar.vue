<script setup lang="ts">
const modal = ref({
  make: false,
  location: false,
  price: false,
});

const city = ref("");
const route = useRoute();

function updateModal(key: keyof typeof modal.value) {
  modal.value[key] = !modal.value[key];
}

const onChangeLocation = () => {
  updateModal("location");
  if (!city.value) return;
  if (!isNaN(parseInt(city.value))) {
    throw createError({
      statusCode: 400,
      message: "Stadtformat ist nicht valide",
    });
  }
  navigateTo(`/city/${city.value}/car/${route.params.make}`);
  city.value = "";
};
</script>

<template>
  <div class="shadow border w-64 mr-10 z-30 h-[190px]">
    <div class="p-5 flex justify-between relative cursor-pointer border-b">
      <h3>Ort</h3>
      <h3 class="capitalize text-blue-400" @click="updateModal('location')">
        {{ route.params.city }}
      </h3>
      <div
        v-if="modal.location"
        class="absolute border shadow left-56 p-5 top-1 -m-1 bg-white"
      >
        <input class="border rounded p-1" v-model="city" />
        <button
          @click="onChangeLocation()"
          class="bg-blue-400 w-full mt-2 text-white p-1"
        >
          Anwenden
        </button>
      </div>
    </div>
    <div class="p-5 flex justify-between relative cursor-pointer border-b">
      <h3>Marke</h3>
      <h3 class="capitalize text-blue-400 ml-2">Mercedes</h3>
    </div>
    <div class="p-5 flex justify-between relative cursor-pointer border-b">
      <h3>Preis</h3>
      <h3 class="capitalize text-blue-400"></h3>
    </div>
  </div>
</template>
