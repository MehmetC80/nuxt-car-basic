<script setup>
const props = defineProps({
  title: String,
  name: String,
  options: Array,
});

const emits = defineEmits(["changeInput"]);
const state = ref("");
const onChange = () => {
  emits("changeInput", state.value, props.name);
};
</script>

<template>
  <div class="flex flex-col w-[48%] mt-2">
    <label for="" class="text-cyan-500 mb-1 text-sm">{{ title }}</label>
    <select
      name=""
      id=""
      class="p-2 border w-full rounded"
      @change="onChange"
      v-model="state"
    >
      <option :value="option" v-for="option in options" :key="option.id">
        {{ option }}
      </option>
    </select>
  </div>
</template>
