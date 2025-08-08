import fs from 'node:fs'

export const getPlayers = () => {
  const lines = fs.readFileSync('lib/players.csv').toString().split('\n')
  const headers = lines.shift().split(',')
  const data = []
  for(let i = 0; i < lines.length; i++) {
    const obj = {}
    const values = lines[i].split(',')
    for(let i = 0; i < values.length; i++) {
      let value = values[i]
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
  return data
}
export const getPlayer = (id) => {
  return getPlayers().find(player => player.id === Number(id))
}