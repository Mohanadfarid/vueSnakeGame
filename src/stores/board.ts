import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { generateBoard } from '@/utils/generateBoard'
import type { BoardBlock } from '@/types/boardBlock'
import type { Direction } from '@/types/direction'
import Directions from '@/constants/Directions'
import { generateRandomApplePosition } from '@/utils/generateRandomApplePosition'
import DirectionsOpposites from '@/constants/DirectionsOpposites'
import { useSettings } from './settings'

export const useBoard = defineStore('board', () => {
const settings = useSettings()

  const boardBody = ref<Array<Array<BoardBlock>>>([])

  const boardIntervalId = ref()
  const isGameActive = computed(()=>boardIntervalId.value)




  const snakeTilesPosition = ref<[number, number][]>([])
  const snakeMovementDirection = ref<Direction>('RIGHT')
  const lastSnakeMovmentDirection = ref<Direction>('RIGHT')

  const changeSnakeMovementDirection = (direction: Direction) => {
    // deny movment in the opposite direction
    if (direction === DirectionsOpposites[lastSnakeMovmentDirection.value]) return
    snakeMovementDirection.value = direction
  }

  const inilizeBoard = () => {
    snakeTilesPosition.value = [
      [0, 0],
      [0, 1],
      [0, 2],
    ]
    boardBody.value = generateBoard(settings.boardSize)
    snakeMovementDirection.value = 'RIGHT'

    insertApple()
    drawSnake()
  }

  const operateGame = () => {
    if (boardIntervalId.value) return
    boardIntervalId.value = setInterval(() => {
      moveSnake(snakeMovementDirection.value)
    }, 80)
  }

  const pauseGame = () => {
    clearInterval(boardIntervalId.value)
    boardIntervalId.value = null
  }

  const insertApple = () => {
    const [x, y] = generateRandomApplePosition(boardBody.value)
    boardBody.value[x][y].status = 'apple'
  }

  const drawSnake = () => {
    snakeTilesPosition.value.map((tilePosition) => {
      boardBody.value[tilePosition[0]][tilePosition[1]].status = 'active'
    })
  }

  const calculateSnakeHeadNewXandY = (direction: Direction) => {
    const snakeHeadPosition = snakeTilesPosition.value[snakeTilesPosition.value.length - 1]
    let newX = (snakeHeadPosition[0] + Directions[direction][0]) % settings.boardSize
    let newY = (snakeHeadPosition[1] + Directions[direction][1]) % settings.boardSize

    if (newX < 0) newX += settings.boardSize
    if (newY < 0) newY += settings.boardSize

    const newTilePosition: [number, number] = [newX, newY]
    return newTilePosition
  }

  const moveSnake = (direction: Direction) => {
    lastSnakeMovmentDirection.value = direction

    // first we move the head of the sanke
    const [newX, newY] = calculateSnakeHeadNewXandY(direction)
    snakeTilesPosition.value.push([newX, newY])

    switch (boardBody.value[newX][newY].status) {
      case 'active':
        {
          //  end the game as the snake hit itself
          alert('you lost')
          inilizeBoard()
          clearInterval(boardIntervalId.value)
          boardIntervalId.value = false
        }
        break
      case 'apple':
        // incase of apple just don't remove the tail +  generate another apple
        insertApple()
        break
      case 'inactive':
        {
          // remove the tail if the snake didn't eat or hit it self
          const lastTileX = snakeTilesPosition.value[0][0]
          const lastTileY = snakeTilesPosition.value[0][1]
          boardBody.value[lastTileX][lastTileY].status = 'inactive'
          snakeTilesPosition.value.shift()
        }
        break
    }

    drawSnake()
  }

  return {
    boardBody,
    snakeMovementDirection,
    snakeTilesPosition,
    isGameActive,

    inilizeBoard,
    moveSnake,
    operateGame,
    pauseGame,
    changeSnakeMovementDirection,
  }
})
