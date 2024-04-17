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
    title: "Miles *",
    name: "miles",
    placeholder: "10000",
  },
  {
    id: 4,
    title: "City *",
    name: "city",
    placeholder: "Austin",
  },
  {
    id: 5,
    title: "Number of Seats *",
    name: "seats",
    placeholder: "5",
  },
  {
    id: 6,
    title: "Features *",
    name: "features",
    placeholder: "Leather Interior, No Accidents",
  },
];

// const inputs = [
//   {
//     id: 1,
//     title: "Model *",
//     name: "model",
//     placeholder: "Civic",
//   },
//   {
//     id: 2,
//     title: "Year *",
//     name: "year",
//     placeholder: "2024",
//   },
//   {
//     id: 3,
//     title: "KM *",
//     name: "miles",
//     placeholder: "10000",
//   },
//   {
//     id: 4,
//     title: "City *",
//     name: "city",
//     placeholder: "Berlin",
//   },
//   {
//     id: 5,
//     title: "Anzal Sitzplätze *",
//     name: "seats",
//     placeholder: "5",
//   },
//   {
//     id: 6,
//     title: "Eigenschaften *",
//     name: "features",
//     placeholder: "Leder Interior",
//   },
// ];
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
    </div>
  </div>
</template>
