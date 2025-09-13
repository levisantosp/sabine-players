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
  price?: bigint
}
export declare const getPlayers: <T extends Player[]>() => T
export declare const getPlayer: (id: string | number) => Player | undefined
export declare const calcPlayerPrice: (player: Player, devalue?: boolean) => number
export declare const calcPlayerOvr: (player: Player) => number