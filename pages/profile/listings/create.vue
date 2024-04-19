<script setup>
definePageMeta({
  layout: "custom",
  middleware: [
    function (to, from) {
      const user = useSupabaseUser();
      if (user.value) {
        return;
      }
      return navigateTo("/login");
    },
  ],
});

const { makes } = useCars();
const user = useSupabaseUser();
const supabase = useSupabaseClient();

const info = useState("addInfo", () => {
  return {
    make: "",
    model: "",
    year: "",
    miles: "",
    price: "",
    city: "",
    seats: "",
    features: "",
    description: "",
    image: null,
  };
});

const onInputChange = (data, name) => {
  info.value[name] = data;
};

const inputs = [
  {
    id: 1,
    title: "Model *",
    name: "model",
    placeholder: "Civic",
  },
  {
    id: 2,
    title: "Year *",
    name: "year",
    placeholder: "2019",
  },
  {
    id: 3,
    title: "Price *",
    name: "price",
    placeholder: "1000",
  },
  {
    id: 4,
    title: "Miles *",
    name: "miles",
    placeholder: "10000",
  },
  {
    id: 5,
    title: "City *",
    name: "city",
    placeholder: "Berlin",
  },
  {
    id: 6,
    title: "Number of Seats *",
    name: "seats",
    placeholder: "5",
  },
  {
    id: 7,
    title: "Features *",
    name: "features",
    placeholder: "Leder, Automatik",
  },
];

const errorMessage = ref("");

const isButtonDisabled = computed(() => {
  for (let key in info.value) {
    if (!info.value[key]) return true;
  }
  return false;
});

const handleSubmit = async () => {
  const fileName = Math.floor(Math.random() * 1000000000);
  const { data, error } = await supabase.storage
    .from("images")
    .upload("public/" + fileName, info.value.image);

  if (error) {
    errorMessage.value = "Bild konnte nicht hochgeladen werden.";
  }
  const body = {
    ...info.value,
    city: info.value.city.toLowerCase(),
    features: info.value.features.split(", "),
    numberOfSeats: parseInt(info.value.seats),
    price: parseInt(info.value.price),
    year: parseInt(info.value.year),
    miles: parseInt(info.value.miles),
    name: `${info.value.make}  ${info.value.model}`,
    listerId: user.value.id,
    image: data.path,
  };

  delete body.seats;

  try {
    const response = await $fetch("/api/car/listings", {
      method: "POST",
      body,
    });
    navigateTo("/profile/listings");
  } catch (error) {
    errorMessage.value = error.statusMessage;
    await supabase.storage.from("images").remove(data.path);
  }
};
</script>

<template>
  <div>
    <div class="mt-24">
      <h1 class="text-6x">Erstelle neue Favoriten</h1>
    </div>
    <div class="shadow rounded p-3 mt-5 flex flex-wrap justify-between">
      <CarAddSelect
        title="Make *"
        :options="makes"
        name="make"
        @change-input="onInputChange"
      />
      <CarAddInput
        v-for="input in inputs"
        :key="input.id"
        :title="input.title"
        :name="input.name"
        :placeholder="input.placeholder"
        @change-input="onInputChange"
      />
      <CarAddTextarea
        title="Description *"
        name="description"
        placeholder=""
        @change-input="onInputChange"
      />
      <CarAddImage @change-input="onInputChange" />
      <div>
        <button
          :disabled="isButtonDisabled"
          @click="handleSubmit"
          class="bg-blue-400 text-white rounded py-2 px-7 mt-3"
        >
          Speichern
        </button>
        <p v-if="errorMessage" class="mt-4 text-red-600">{{ errorMessage }}</p>
      </div>
    </div>
  </div>
</template>
