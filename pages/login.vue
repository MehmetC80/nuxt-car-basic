<script setup>
definePageMeta({
  layout: "custom",
});

const supabase = useSupabaseClient();

const user = useSupabaseUser();

const login = async () => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: "github",
  });

  if (error) {
    console.log(error);
  }
};
</script>

<template>
  <div class="mt-10">
    <h1 class="font-bold text-5xl mb-7">Login</h1>
    <button class="bg-red-500 p-3 rounded text-white font-bold" @click="login">
      Login mit Github
    </button>
  </div>
</template>
