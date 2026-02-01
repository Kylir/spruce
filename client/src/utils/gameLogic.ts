import { CellValue, Player } from '../types'

export const isWinningMove = (
  player: Player,
  board: CellValue[][],
  row: number,
  col: number,
  winCondition: number
): boolean => {
  const size = board.length

  // Count consecutive pieces in a given direction
  const countInDirection = (rowDir: number, colDir: number): number => {
    let count = 0
    let r = row + rowDir
    let c = col + colDir
    while (r >= 0 && r < size && c >= 0 && c < size && board[r][c] === player) {
      count++
      r += rowDir
      c += colDir
    }
    return count
  }

  const horizontal = countInDirection(0, -1) + countInDirection(0, 1) + 1
  if (horizontal >= winCondition) {
    return true
  }

  const vertical = countInDirection(-1, 0) + countInDirection(1, 0) + 1
  if (vertical >= winCondition) {
    return true
  }

  const mainDiagonal = countInDirection(-1, -1) + countInDirection(1, 1) + 1
  if (mainDiagonal >= winCondition) {
    return true
  }

  const antiDiagonal = countInDirection(-1, 1) + countInDirection(1, -1) + 1
  if (antiDiagonal >= winCondition) {
    return true
  }

  return false
}
