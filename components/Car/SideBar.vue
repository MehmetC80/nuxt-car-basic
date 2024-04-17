<script setup lang="ts">
const modal = ref({
  make: false,
  location: false,
  price: false,
});

const { makes } = useCars();
const city = ref("");
const priceRange = ref({
  min: "",
  max: "",
});
const route = useRoute();
const router = useRouter();

const priceRangeText = computed(() => {
  const minPrice = route.query.minPrice;
  const maxPrice = route.query.maxPrice;

  if (!minPrice && !maxPrice) return "Any";
  else if (!minPrice && maxPrice) {
    return `< $${maxPrice}`;
  } else if (minPrice && !maxPrice) {
    return `> $${minPrice}`;
  } else {
    return `$${minPrice}-$${maxPrice}`;
  }
});

function updateModal(key: keyof typeof modal.value) {
  modal.value[key] = !modal.value[key];
}

const onLocationChange = () => {
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

const onEnter = () => {
  onLocationChange();
};

const onMakeChange = (make: string) => {
  updateModal("make");
  navigateTo(`/city/${route.params.city}/car/${make}`);
};

const onPriceChange = () => {
  updateModal("price");

  if (priceRange.value.max && priceRange.value.min) {
    if (priceRange.value.min > priceRange.value.max) return;
  }

  router.push({
    query: {
      minPrice: priceRange.value.min,
      maxPrice: priceRange.value.max,
    },
  });
};
</script>

<template>
  <div class="shadow border w-64 mr-10 z-30 h-[190px]">
    <!-- LOCATION STARTS -->
    <div class="p-5 flex justify-between relative cursor-pointer border-b">
      <h3>Ort</h3>
      <h3 class="capitalize text-blue-400" @click="updateModal('location')">
        {{ route.params.city }}
      </h3>
      <div
        v-if="modal.location"
        class="absolute border shadow left-56 p-5 top-1 -m-1 bg-white"
      >
        <input
          class="border rounded p-1"
          v-model="city"
          @keyup.enter="onEnter"
        />
        <button
          @click="onLocationChange()"
          class="bg-blue-400 w-full mt-2 text-white p-1"
        >
          Anwenden
        </button>
      </div>
    </div>
    <!-- LOCATION ENDS -->

    <!-- MAKE STARTS -->
    <div class="p-5 flex justify-between relative cursor-pointer border-b">
      <h3>Marke</h3>
      <h3 class="capitalize text-blue-400 ml-2" @click="updateModal('make')">
        {{ route.params.make || "Any" }}
      </h3>
      <div
        v-if="modal.make"
        class="flex justify-between flex-wrap bg-white absolute border shadow left-56 top-1 -m-1 w-[600px] p-4"
      >
        <h4
          v-for="make in makes"
          :key="make"
          class="w-1/3"
          @click="onMakeChange(make)"
        >
          {{ make }}
        </h4>
      </div>
    </div>
    <!-- MAKE ENDS -->

    <!-- PRICE STARTS -->
    <div class="p-5 flex justify-between relative cursor-pointer border-b">
      <h3>Price</h3>
      <h3 class="capitalize text-blue-400" @click="updateModal('price')">
        {{ priceRangeText }}
      </h3>
      <div
        v-if="modal.price"
        class="absolute border shadow left-56 p-5 top-1 -m-1 bg-white"
      >
        <input
          type="number"
          placeholder="Min"
          class="border rounded p-1"
          v-model="priceRange.min"
        />
        <input
          type="number"
          placeholder="Max"
          class="border rounded p-1"
          v-model="priceRange.max"
        />
        <button
          @click="onPriceChange"
          class="bg-blue-400 w-full mt-2 text-white p-1"
        >
          Anwenden
        </button>
      </div>
    </div>
    <!-- PRICE ENDS -->
  </div>
</template>
