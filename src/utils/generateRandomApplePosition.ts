import type { BoardBlock } from '@/types/boardBlock'

export const generateRandomApplePosition = (board: Array<Array<BoardBlock>>) => {
  const possiblePositions: [number, number][] = []
  board.map((row, x) => {
    row.map((tile, y) => {
      if (tile.status === 'inactive') {
        possiblePositions.push([x, y])
      }
    })
  })

  const randomPostionIndex = Math.floor(Math.random() * (possiblePositions.length - 1 - 0 + 1)) + 0
  return possiblePositions[randomPostionIndex]
}
