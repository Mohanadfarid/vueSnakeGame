<script setup lang="ts">
import { useBoard } from '@/stores/board';
import AppButton from './AppButton.vue'
const board = useBoard()
</script>
<template>
  <div class="flex justify-center py-2">
    <AppButton
      v-if="!board.isGameActive"
      class="mx-1 py-1 px-3 rounded-4xl"
      @click="board.operateGame"
    >
      Start
    </AppButton>
    <AppButton v-else class="mx-1 py-1 px-3 rounded-4xl" @click="board.pauseGame()">
      Stop</AppButton
    >
  </div>
</template>
