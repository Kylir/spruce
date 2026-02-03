import express from 'express'
import cors from 'cors'
import { saveGame, getAllGames, getStats } from './db'

const app = express()
const PORT = 3000

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.json({ message: 'Tic Tac Toe API is up and running.' })
})

app.post('/games', (req, res) => {
  const { winner, boardSize, winCondition } = req.body

  if (!winner || !boardSize || !winCondition) {
    res.status(400).json({ error: 'Missing required fields' })
    return
  }

  const result = saveGame(winner, boardSize, winCondition)
  res.status(201).json({ id: result.lastInsertRowid })
})

app.get('/games', (req, res) => {
  const games = getAllGames()
  res.json(games)
})

app.get('/stats', (req, res) => {
  const stats = getStats()
  res.json(stats)
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
