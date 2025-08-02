import { useBoard } from '@/stores/board'
import { onMounted, onUnmounted } from 'vue'

export const useGameControlles = () => {

    const board = useBoard()

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === 'ArrowUp') {
      board.changeSnakeMovementDirection('UP')
    }
    if (e.key === 'ArrowDown') {
        board.changeSnakeMovementDirection('DOWN')
    }
    if (e.key === 'ArrowLeft') {
        board.changeSnakeMovementDirection('LEFT')
    }
    if (e.key === 'ArrowRight') {
        board.changeSnakeMovementDirection('RIGHT')
    }
  }

  onMounted(() => {
    window.addEventListener('keydown', handleKeydown)
  })

  onUnmounted(() => {
    window.removeEventListener('keydown', handleKeydown)
  })
}
