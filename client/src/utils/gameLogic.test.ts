import { isWinningMove } from './gameLogic'
import { CellValue } from '../types'

describe('isWinningMove', () => {
  it('detects a horizontal win on a 3x3 board', () => {
    const board: CellValue[][] = [
      ['X', 'X', 'X'],
      ['O', 'O', ''],
      ['', '', '']
    ]
    expect(isWinningMove('X', board, 0, 2, 3)).toBe(true)
  })

  it('detects a vertical win on a 3x3 board', () => {
    const board: CellValue[][] = [
      ['X', 'O', ''],
      ['X', 'O', ''],
      ['X', '', '']
    ]
    expect(isWinningMove('X', board, 2, 0, 3)).toBe(true)
  })

  it('detects a main diagonal win on a 3x3 board', () => {
    const board: CellValue[][] = [
      ['X', 'O', 'O'],
      ['', 'X', ''],
      ['', '', 'X']
    ]
    expect(isWinningMove('X', board, 2, 2, 3)).toBe(true)
  })

  it('detects an anti-diagonal win on a 3x3 board', () => {
    const board: CellValue[][] = [
      ['O', 'O', 'X'],
      ['', 'X', ''],
      ['X', '', '']
    ]
    expect(isWinningMove('X', board, 2, 0, 3)).toBe(true)
  })

  it('returns false when no win on a 3x3 board', () => {
    const board: CellValue[][] = [
      ['X', 'O', 'X'],
      ['', 'O', ''],
      ['', '', '']
    ]
    expect(isWinningMove('X', board, 0, 2, 3)).toBe(false)
  })

  it('detects a horizontal win on a 5x5 board with winCondition 3', () => {
    const board: CellValue[][] = [
      ['', '', '', '', ''],
      ['', 'X', 'X', 'X', ''],
      ['', 'O', 'O', '', ''],
      ['', '', '', '', ''],
      ['', '', '', '', '']
    ]
    expect(isWinningMove('X', board, 1, 3, 3)).toBe(true)
  })

  it('detects a vertical win on a 5x5 board with winCondition 4', () => {
    const board: CellValue[][] = [
      ['', 'X', '', '', ''],
      ['', 'X', 'O', '', ''],
      ['', 'X', 'O', '', ''],
      ['', 'X', 'O', '', ''],
      ['', '', '', '', '']
    ]
    expect(isWinningMove('X', board, 3, 1, 4)).toBe(true)
  })

  it('returns false when not enough in a row on a 5x5 board', () => {
    const board: CellValue[][] = [
      ['', '', '', '', ''],
      ['', 'X', 'X', '', ''],
      ['', 'O', 'O', '', ''],
      ['', '', '', '', ''],
      ['', '', '', '', '']
    ]
    expect(isWinningMove('X', board, 1, 2, 3)).toBe(false)
  })
})
