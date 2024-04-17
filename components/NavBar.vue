<script setup>
const user = useSupabaseUser();
const supabase = useSupabaseClient();
const logout = async () => {
  /*
  //1.Möglichkeit aber dies funktioniert nicht richtig
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.log(error);
  }
  */

  const { error } = await supabase.auth.signOut();
  try {
    await $fetch("/api/_supabase/session", {
      method: "POST",
      body: { event: "SIGN_OUT", session: null },
    });
  } catch (error) {
    return console.log(error);
  }

  user.value = null;
  navigateTo("/");
};

const login = () => {
  navigateTo("/login");
};
</script>

<template>
  <header
    class="sticky top-0 z-50 justify-between item-center space-x-1 border-b bg-white p-4 shadow-md h-12 flex items-center"
  >
    <NuxtLink to="/" class="text-3xl font0mono">carzone</NuxtLink>
    <div class="flex">
      <button
        v-if="!user"
        class="rounded bg-blue-500 text-white text-bild py-2 px-4"
        @click="login"
      >
        Login
      </button>
      <div v-if="user" class="flex gap-4 items-center">
        <NuxtLink
          to="/profile/listings"
          class="cursor-pointer hover:underline text-gray-600 font-semibold hover:text-gray-500"
          >profile</NuxtLink
        >
        <button
          class="rounded bg-red-500 text-white text-bild py-2 px-4 cursor-pointer"
          @click="logout"
        >
          Logout
        </button>
      </div>
    </div>
  </header>
</template>
