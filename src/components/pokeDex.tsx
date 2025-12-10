import { useState, useEffect } from "react"
import Dots from "./dots"
import Screen from "./screen"
import { Abilities, Pokemon } from "../interfaces"
import "../styles/pokedex.css"
import "../styles/screen.css"
import "../styles/dots.css"
export default function ToDo() {
  const [pokeName, setPokeName] = useState("")
  const [pokemon, setPokemon] = useState<Pokemon | null>(null)
  const [error, setError] = useState<Error | null>(null)
  const [loading, setLoading] = useState(false)
  const [pokeStats, setPokeStats] = useState({})
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPokeName(e.target.value)
  }
  const locatePokemon = async (pokemon: string) => {
    setPokemon({} as Pokemon)
    setError(null)
    setLoading(true)
    try {
      const response = await fetch("http://localhost:5000/" + pokemon)
      if (!response.ok) {
        throw new Error("Pokemon not found!")
      }
      const data = await response.json()
      setPokemon(data)
      setPokeStats({
        abilities: data.abilities.map((e: Abilities) =>
          capitializeWord(e.ability.name)
        ),
        height: data.height,
        type: data.types[0].type.name,
        weight: data.weight,
        stats: data.stats.map((e: Pokemon) => ({
          name: capitializeWord(e.stat.name),
          value: e.base_stat,
        })),
      })
    } catch (error) {
      setError(error instanceof Error ? error : new Error(String(error)))
    } finally {
      setLoading(false)

      setPokeName("")
    }
  }
  const capitializeWord = (word: string) => {
    return word.charAt(0).toUpperCase() + word.slice(1)
  }

  useEffect(() => {
    locatePokemon("pikachu")
  }, [])

  return (
    <>
      <div className="pokedexContainer">
        <div className="largeTopButton" />
        <Dots top={true} bottom={false} />
        <Screen
          capitializeWord={capitializeWord}
          pokemon={pokemon}
          pokeStats={pokeStats}
          loading={loading}
          error={error}
        />
        <form
          className="search"
          onSubmit={(e) => {
            e.preventDefault()
            locatePokemon(pokeName)
          }}
        >
          <input
            type="text"
            onInput={handleInput}
            value={pokeName}
            placeholder="Search"
            style={{ marginBottom: "10px" }}
          />
          <button type="submit">Search</button>
        </form>
        <div className="d-pad" />
      </div>
    </>
  )
}
