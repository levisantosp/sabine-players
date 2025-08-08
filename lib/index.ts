import fs from 'node:fs'

export type Player = {
  id: number
  name: string
  collection: string
  team: string
  country: string
  role: string
  aim: number
  HS: number
  movement: number
  aggression: number
  ACS: number
  gamesense: number
  purchaseable: boolean
  ovr?: number
  price?: number
}
export const getPlayers = <T extends Player[]>() => {
  const lines = fs.readFileSync('lib/players.csv').toString().split('\n')
  const headers = lines.shift()!.split(',')
  const data: unknown[] = []
  for(let i = 0; i < lines.length; i++) {
    const obj: Record<string, string | number | boolean> = {}
    const values = lines[i].split(',')
    for(let i = 0; i < values.length; i++) {
      let value: string | number | boolean = values[i]
      if(!isNaN(Number(value))) {
        value = Number(values[i])
      }
      if(value === 'true') {
        value = true
      }
      if(value === 'false') {
        value = false
      }
      obj[headers[i]] = value
    }
    data.push(obj)
  }
  return data as T
}
export const getPlayer = (id: string | number) => {
  return getPlayers().find(player => player.id === Number(id))
}