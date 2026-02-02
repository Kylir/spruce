const API_URL = 'http://localhost:3000'

export const saveGameResult = async (
  winner: string,
  boardSize: number,
  winCondition: number
): Promise<{ id: number }> => {
  const response = await fetch(`${API_URL}/games`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ winner, boardSize, winCondition })
  })
  return response.json()
}

export interface Stats {
  xWins: number
  oWins: number
  draws: number
}

export const getStats = async (): Promise<Stats> => {
  const response = await fetch(`${API_URL}/stats`)
  return response.json()
}
