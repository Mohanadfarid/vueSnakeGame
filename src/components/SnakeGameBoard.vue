<script setup lang="ts">
import { useBoard } from '@/stores/board'
import SnakeGameBoardTile from './SnakeGameBoardTile.vue'         
import { useSettings } from '@/stores/settings'
const board = useBoard()
const settings = useSettings()
const gridStyles = `repeat(${settings.boardSize}, minmax(0, 1fr))`

</script>
<template>

    <div class="grid grid-cols-30 gap-0" :style="{ 'grid-template-columns': gridStyles }">
      <template v-for="row in board.boardBody">
        <template v-for="tile in row" :key="tile.id">
          <SnakeGameBoardTile :tile />
        </template>
      </template>
    </div>

</template>
<style></style>
