<script setup lang="ts">
import { SnakeGameBoard } from '@/components'
import { useBoard } from '@/stores/board'
import { useSettings } from '@/stores/settings'
import { onMounted } from 'vue'

const board = useBoard()
const settings = useSettings()

onMounted(() => {
  board.inilizeBoard()
})
</script>
<template>
  <div class="text-center text-xl mt-3 font-bold">
    <h1>Snake Game</h1>
    <p>snake length: {{ board.snakeTilesPosition.length  }} / {{ settings.boardSize * settings.boardSize  }}</p>
  </div>

  <SnakeGameBoard class="max-w-[500px] pt-1 mx-auto shadow pb-2" />
</template>
<style></style>
