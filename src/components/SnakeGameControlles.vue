<script setup lang="ts">
import { useBoard } from '@/stores/board';
import AppButton from './AppButton.vue';

const board = useBoard()
</script>
<template>
      <div class="grid gird-cols-2 gap-2 pt-3">
      <AppButton
        class="col-span-2 border"
        @click="board.changeSnakeMovementDirection('UP')"
      >
        up</AppButton
      >
      <AppButton
        class="col-span-1 border"
        @click="board.changeSnakeMovementDirection('LEFT')"
      >
        left</AppButton
      >
      <AppButton
        class="col-span-1 border"
        @click="board.changeSnakeMovementDirection('RIGHT')"
      >
        right</AppButton
      >
      <AppButton
        class="col-span-2 border"
        @click="board.changeSnakeMovementDirection('DOWN')"
      >
        down</AppButton
      >
    </div>
</template>
