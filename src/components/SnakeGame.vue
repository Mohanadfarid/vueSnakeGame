<script setup lang="ts">
import { SnakeGameBoard } from '@/components'
import { useGameControlles } from '@/composables/useGameControlles'
import { useBoard } from '@/stores/board'
import { useSettings } from '@/stores/settings'
import { onMounted } from 'vue'
import SnakeGameToggleButton from './SnakeGameToggleButton.vue'
import SnakeGameControlles from './SnakeGameControlles.vue'

const board = useBoard()
const settings = useSettings()
useGameControlles()
onMounted(() => {
  board.inilizeBoard()
})
</script>
<template>
  <div class="h-[100dvh] flex flex-col items-center border-2">
    <div class="text-center text-xl mt-3 font-bold">
      <h1>Snake Game</h1>
      <p>
        snake length: {{ board.snakeTilesPosition.length }} /
        {{ settings.boardSize * settings.boardSize }}
      </p>
    </div>
    <SnakeGameToggleButton />
    <SnakeGameBoard class="w-full max-w-[500px]" />
    <SnakeGameControlles class="w-full max-w-[500px]" />
  </div>
</template>
<style></style>
