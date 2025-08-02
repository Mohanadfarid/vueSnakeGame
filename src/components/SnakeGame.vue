<script setup lang="ts">
import { SnakeGameBoard } from '@/components'
import { useBoard } from '@/stores/board'
import { onMounted } from 'vue'

const board = useBoard()

onMounted(() => {
  board.inilizeBoard()
})
</script>
<template>
  <div class="text-center text-xl mt-3 font-bold">
    <h1>Snake Game</h1>
    <p>snake length: {{ board.snakeTilesPosition.length  }} / {{ board.boardSize * board.boardSize  }}</p>
  </div>

  <SnakeGameBoard class="max-w-[300px] mx-auto shadow" />
</template>
<style></style>
