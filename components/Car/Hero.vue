<template>
  <div
    class="relative h-[calc(100vh-48px)] w-100 bg-no-repeat bg-cover bg-[10%] bg-[url('@/assets/porsche.jpg')]"
  >
    <div class="z-10 absolute w-full h-full flex justify-center items-center">
      <div class="text-center w-5/6">
        <h1 class="text-8xl font-serif mb-10 text-white">
          Finde dein Traumauto
        </h1>
        <CarSearchBar />
      </div>
    </div>
    <!-- Gibt dem Content einen dunkeln Schleier -->
    <div class="z-1 absolute w-full h-full bg-black opacity-50" />
  </div>
</template>
