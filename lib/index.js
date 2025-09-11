import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
export const getPlayers = () => {
  const lines = fs.readFileSync(path.join(__dirname, "players.csv")).toString().split("\n")
  const headers = lines.shift().split(",")
  const data = []
  for(let i = 0; i < lines.length; i++) {
    const obj = {}
    const values = lines[i].split(",")
    for(let i = 0; i < values.length; i++) {
      let value = values[i]
      if(!isNaN(Number(value))) {
        value = Number(values[i])
      }
      if(value === "true") {
        value = true
      }
      if(value === "false") {
        value = false
      }
      obj[headers[i]] = value
    }
    data.push(obj)
  }
  return data
}
export const getPlayer = (id) => {
  return getPlayers().find(player => player.id === Number(id))
}
export const calcPlayerPrice = (player, devalue) => {
  const overall = (player.aim + player.HS + player.movement + player.aggression + player.ACS + player.gamesense) / 6
  let price = Math.pow(1.06, overall) * 10000
  if(devalue) price *= 0.1
  return Math.floor(price)
}
export const calcPlayerOvr = (player) => {
  return (player.aim + player.HS + player.movement + player.aggression + player.ACS + player.gamesense) / 6
}