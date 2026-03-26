<script setup lang="ts">
import { ref } from 'vue'
import { MainMenu, SnakeGame } from '@/components'

type GameMode = 'idle' | 'single' | 'coop' | 'local-1vs1' | 'online'

const gameMode = ref<GameMode>('idle')

const gameModeResolver = () => {
  const mode = gameMode.value
  if (mode === 'idle') {
    return MainMenu
  } else if (mode === 'single') {
    return SnakeGame
  }
}
const changeGameMode = (newMode: GameMode) => (gameMode.value = newMode)

</script>

<template>
  <component @changeMode="changeGameMode" :is="gameModeResolver()"></component>
</template>

<style scoped></style>
