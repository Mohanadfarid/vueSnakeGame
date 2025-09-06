import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { generateBoard } from '@/utils/generateBoard'

import type { BoardBlock, Direction, MovmentQueueType } from '@/types'
import Directions from '@/constants/Directions'
import { generateRandomApplePosition } from '@/utils/generateRandomApplePosition'
import DirectionsOpposites from '@/constants/DirectionsOpposites'
import { useSettings } from './settings'

export const useBoard = defineStore('board', () => {
  const settings = useSettings()

  const boardBody = ref<Array<Array<BoardBlock>>>([])

  const boardIntervalId = ref()
  const isGameActive = computed(() => boardIntervalId.value)

  const snakeTilesPosition = ref<[number, number][]>([])
  const snakeMovementDirection = ref<Direction>('RIGHT')
  const movmentQueue = ref<MovmentQueueType>([])

  const changeSnakeMovementDirection = (direction: Direction) => {

    // deny movment in the opposite direction 
    if (movmentQueue.value.length===0 && DirectionsOpposites[snakeMovementDirection.value] === direction) return

    // deny movement if in the same direction
    if (movmentQueue.value.length===0 && snakeMovementDirection.value === direction) return

    const lastMovementInput = movmentQueue.value[movmentQueue.value.length - 1]
    // deny movment in the opposite direction
    if (DirectionsOpposites[lastMovementInput] === direction) return

    // deny movement if in the same direction
    if (lastMovementInput === direction) return

    // remove the oldest movment if the queue is already 2 in lenght
    if (movmentQueue.value.length === 2) movmentQueue.value.shift()

    // finally push the new movement direction
    movmentQueue.value = [...movmentQueue.value, direction] as MovmentQueueType
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
      // if movement stack have values we use them else keep the direction as its
      const newMovement = movmentQueue.value.shift()
      snakeMovementDirection.value = newMovement || snakeMovementDirection.value
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
    movmentQueue,
    inilizeBoard,
    moveSnake,
    operateGame,
    pauseGame,
    changeSnakeMovementDirection,
  }
})
