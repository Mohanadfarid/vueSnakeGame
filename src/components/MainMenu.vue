<script setup lang="ts">
import AppButton from './AppButton.vue'
import {defineEmits} from 'vue'
const emit = defineEmits(['changeMode'])
</script>
<template>
  <div class="flex justify-center items-center flex-col h-dvh w-dvw">
    <h1 class="text-center font-bold text-2xl mb-3">welcome to snake game by mohanad !</h1>
    <AppButton class="py-2 my-2 w-full max-w-[500px]" @click="emit('changeMode','single')">single player</AppButton>
    <AppButton class="py-2 my-2 w-full max-w-[500px]" @click="emit('changeMode','local-1vs1')">local 1 vs 1</AppButton>
    <AppButton class="py-2 my-2 w-full max-w-[500px]" @click="emit('changeMode','coop')">coop</AppButton>
    <AppButton class="py-2 my-2 w-full max-w-[500px]" @click="emit('changeMode','online')">online 1 vs 1</AppButton>
  </div>
</template>
