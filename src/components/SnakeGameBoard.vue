<script setup lang="ts">
import { useBoard } from '@/stores/board'
import SnakeGameBoardTile from './SnakeGameBoardTile.vue'
import { useGameControlles } from '@/composables/useGameControlles'
import AppButton from './AppButton.vue'
import { useSettings } from '@/stores/settings'
const board = useBoard()
const settings = useSettings()
const gridStyles = `repeat(${settings.boardSize}, minmax(0, 1fr))`
useGameControlles()
</script>
<template>
  <div>
    <div class="flex justify-center my-2">
      {{ board.snakeMovementDirection }}
      {{ board.movmentQueue }}
      <AppButton v-if="!board.isGameActive" class="mx-1 py-1 px-3" @click="board.operateGame">
        Start</AppButton
      >
      <AppButton v-else class="mx-1 py-1 px-3" @click="board.pauseGame()"> Stop</AppButton>
    </div>

    <div class="grid grid-cols-30 gap-0" :style="{ 'grid-template-columns': gridStyles }">
      <template v-for="row in board.boardBody">
        <template v-for="tile in row" :key="tile.id">
          <SnakeGameBoardTile :tile />
        </template>
      </template>
    </div>

    <div class="flex flex-col items-center gap-1 mt-3">
      <AppButton class="py-1 px-6 border" @click="board.changeSnakeMovementDirection('UP')"> up</AppButton>
      <div class="flex gap-1">
        <AppButton class="py-1 px-6 me-3 border" @click="board.changeSnakeMovementDirection('LEFT')"> left</AppButton>
        <AppButton class="py-1 px-6 ms-3 border" @click="board.changeSnakeMovementDirection('RIGHT')"> right</AppButton>
      </div>
      <AppButton class="py-1 px-6 border" @click="board.changeSnakeMovementDirection('DOWN')"> down</AppButton>
    </div>
  </div>
</template>
<style></style>
