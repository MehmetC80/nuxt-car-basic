<template>
  <div class="mt-10">
    <div
      class="flex flex-col w-full gap-2 sm:justify-between sm:flex-row sm:flex-wrap sm:mx-auto lg:max-w-[600px]"
    >
      <input type="text" class="border p-1" placeholder="Name" />
      <input type="text" class="border p-1" placeholder="Email" />
      <input type="text" class="border p-1" placeholder="Mobil" />
    </div>
    <div class="flex mt-4 max-w-[600px] mx-auto">
      <textarea class="border p-1 w-full" placeholder="Nachricht"></textarea>
    </div>
    <button class="bg-blue-400 text-white px-10 py-3 rounded mt-4">
      Senden
    </button>
  </div>
</template>
