import { CellValue, Player } from '../types'

export const isWinningMove = (player: Player, board: CellValue[][], row: number, col: number): boolean => {
  // Check row
  if (board[row][0] === player && board[row][1] === player && board[row][2] === player) {
    return true
  }

  // Check column
  if (board[0][col] === player && board[1][col] === player && board[2][col] === player) {
    return true
  }

  // Check main diagonal (if applicable)
  if (row === col) {
    if (board[0][0] === player && board[1][1] === player && board[2][2] === player) {
      return true
    }
  }

  // Check anti-diagonal (if applicable)
  if (row + col === 2) {
    if (board[0][2] === player && board[1][1] === player && board[2][0] === player) {
      return true
    }
  }

  return false
}
