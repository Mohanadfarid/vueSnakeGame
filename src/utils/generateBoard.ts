import type { BoardBlock } from '@/types/boardBlock'

export const generateBoard = (boardSize: number) => {
  const board: Array<Array<BoardBlock>> = []

  for (let i = 0; i < boardSize; i++) {
    const row: BoardBlock[] = []
    for (let j = 0; j < boardSize; j++) {
      row.push({
        id:i+j,
        status: 'inactive',
      })
    }
    board.push(row)
  }

  return board
}
