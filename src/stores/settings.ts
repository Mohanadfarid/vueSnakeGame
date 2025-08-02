import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useSettings = defineStore('settings', () => {
  // colors
  const boardColor = ref('#f4f4f4')
  const appleColor = ref('#16a34a')
  const snakeColor = ref('#065f46')

  const gameSpeed = ref(80) // max 80 / min 30 (for performance)
  const boardSize = ref(30)

  // const wallCollision = ref(false)
  return { appleColor, snakeColor, boardColor, gameSpeed, boardSize }
})
