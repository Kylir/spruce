import Database from 'better-sqlite3'

const db = new Database('database/tictactoe.db')

// Initialize the database schema
db.exec(`
  CREATE TABLE IF NOT EXISTS games (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    winner TEXT NOT NULL,
    board_size INTEGER NOT NULL,
    win_condition INTEGER NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`)

export const saveGame = (winner: string, boardSize: number, winCondition: number) => {
  const stmt = db.prepare('INSERT INTO games (winner, board_size, win_condition) VALUES (?, ?, ?)')
  return stmt.run(winner, boardSize, winCondition)
}

export const getStats = () => {
  const stmt = db.prepare(`
    SELECT winner, COUNT(*) as count
    FROM games
    GROUP BY winner
  `)
  const rows = stmt.all() as { winner: string, count: number }[]

  return {
    xWins: rows.find(r => r.winner === 'X')?.count || 0,
    oWins: rows.find(r => r.winner === 'O')?.count || 0,
    draws: rows.find(r => r.winner === 'draw')?.count || 0
  }
}

export const getAllGames = () => {
  const stmt = db.prepare('SELECT * FROM games ORDER BY created_at DESC')
  return stmt.all()
}

export default db
