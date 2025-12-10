interface Pokemon {
  attack: number
  ability: Abilities
  base_stat: number
  defense: number
  hp: number
  name: string
  sprites: {
    other: {
      "official-artwork": {
        front_default: string
      }
    }
  }
  speed: number
  stat: {
    name: string
  }
  value: string
}

interface Ability {
  name: string
}

interface Abilities {
  ability: Ability
}

interface Pokemon {
  pokemon: string
}

interface ScreenProps {
  capitializeWord: (word: string) => string
  pokemon: Pokemon | null
  pokeStats: any
  error: Error | null
  loading: boolean
}

export { Abilities, Pokemon, ScreenProps }
