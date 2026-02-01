import { isWinningMove } from './gameLogic'
import { CellValue } from '../types'

describe('isWinningMove', () => {
  it('detects a row win', () => {
    const board: CellValue[][] = [
      ['X', 'X', 'X'],
      ['O', 'O', ''],
      ['', '', '']
    ]
    expect(isWinningMove('X', board, 0, 2)).toBe(true)
  })

  it('detects a column win', () => {
    const board: CellValue[][] = [
      ['X', 'O', ''],
      ['X', 'O', ''],
      ['X', '', '']
    ]
    expect(isWinningMove('X', board, 2, 0)).toBe(true)
  })

  it('detects a main diagonal win', () => {
    const board: CellValue[][] = [
      ['X', 'O', 'O'],
      ['', 'X', ''],
      ['', '', 'X']
    ]
    expect(isWinningMove('X', board, 2, 2)).toBe(true)
  })

  it('detects an anti-diagonal win', () => {
    const board: CellValue[][] = [
      ['O', 'O', 'X'],
      ['', 'X', ''],
      ['X', '', '']
    ]
    expect(isWinningMove('X', board, 2, 0)).toBe(true)
  })

  it('returns false when no win', () => {
    const board: CellValue[][] = [
      ['X', 'O', 'X'],
      ['', 'O', ''],
      ['', '', '']
    ]
    expect(isWinningMove('X', board, 0, 2)).toBe(false)
  })
})
