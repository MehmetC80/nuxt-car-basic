<script setup>
const message = ref({
  name: "",
  email: "",
  phone: "",
  message: "",
});

const route = useRoute();

const errorMessage = ref("");
const successMessage = ref("");

const disabledButton = computed(() => {
  for (let key in message.value) {
    if (!message.value[key]) {
      return true;
    }
  }
  return false;
});

const onSubmit = async () => {
  try {
    const response = await $fetch(
      `/api/car/listings/${route.params.id}/message`,
      {
        method: "POST",
        body: message.value,
      }
    );
    message.value = ref({
      name: "",
      email: "",
      phone: "",
      message: "",
    });
    successMessage.value = "Nachricht wurde erfolgreich verschickt.";
    errorMessage.value = "";
  } catch (error) {
    errorMessage.value = error.statusMessage;
    successMessage.value = "";
  }
};
</script>

<template>
  <div class="mt-10">
    <div
      class="flex flex-col w-full gap-2 sm:justify-between sm:flex-row sm:flex-wrap sm:mx-auto lg:max-w-[600px]"
    >
      <input
        v-model="message.name"
        type="text"
        class="border p-1"
        placeholder="Name"
      />
      <input
        v-model="message.email"
        type="text"
        class="border p-1"
        placeholder="Email"
      />
      <input
        v-model="message.phone"
        type="text"
        class="border p-1"
        placeholder="Mobil"
      />
    </div>
    <div class="flex mt-4 max-w-[600px] mx-auto">
      <textarea
        v-model="message.message"
        class="border p-1 w-full"
        placeholder="Nachricht"
      ></textarea>
    </div>
    <button
      class="bg-blue-400 text-white px-10 py-3 rounded mt-4"
      @click="onSubmit"
      :disabled="disabledButton"
    >
      Senden
    </button>
    <p v-if="errorMessage" class="text-xl text-red-600 mt-4 p-1">
      {{ errorMessage }}
    </p>
    <p v-if="successMessage" class="text-xl text-green-700 mt-4 p-1">
      {{ successMessage }}
    </p>
  </div>
</template>
