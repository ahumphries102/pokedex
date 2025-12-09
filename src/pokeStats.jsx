import { useState, useEffect } from "react"
import "./pokedex.css"
export default function ToDo() {
  const [pokeName, setPokeName] = useState("")
  const [pokemon, setPokemon] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const [pokeStats, setPokeStats] = useState({})
  const handleInput = (e) => {
    setPokeName(e.target.value)
  }
  const locatePokemon = async (pokemon) => {
    setPokemon(null)
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
        abilities: data.abilities.map((e) => capitializeWord(e.ability.name)),
        height: data.height,
        type: data.types[0].type.name,
        weight: data.weight,
        stats: data.stats.map((e) => ({
          name: capitializeWord(e.stat.name),
          value: e.base_stat,
        })),
      })
    } catch (error) {
      setError(error)
    } finally {
      setLoading(false)

      setPokeName("")
    }
  }
  const capitializeWord = (word) => {
    return word.charAt(0).toUpperCase() + word.slice(1)
  }

  useEffect(() => {
    locatePokemon("pikachu")
    console.log("pokeStats updated:", pokeStats)
    locatePokemon("pikachu")
  }, [])

  useEffect(() => {
    console.log("pokeStats has been set:", pokeStats)
  }, [pokeStats])
  return (
    <>
      <div className="pokedexContainer">
        <div className="largeTopButton" />
        <div className="dotContainer">
          <div className="redTopDot" />
          <div className="yellowTopDot" />
          <div className="blueTopDot" />
        </div>
        <div className="screenContainer">
          <div className="topDots-container">
            <div className="topDots" />
            <div className="topDots" />
          </div>
          <div className="screen">
            <div
              className="innerScreen"
              style={{ display: pokemon?.name ? "grid" : "none" }}
            >
              <h1>{pokemon?.name && capitializeWord(pokemon?.name)}</h1>
              <span className="pokemon">
                <img
                  className="pokemonImage"
                  style={{ display: pokemon ? "block" : "none" }}
                  src={
                    pokemon?.sprites?.other["official-artwork"].front_default
                  }
                  alt={pokemon?.name}
                />
                <span>Height: {pokeStats.height && pokeStats.height}</span>
                <span>Weight: {pokeStats.weight && pokeStats.weight}</span>
              </span>
              <span className="stats">
                <span>Stats</span>
                <ul className="statsAndAbilities">
                  {pokeStats.stats &&
                    pokeStats.stats.map((stat, index) => (
                      <li key={index}>
                        {stat.name}: {stat.value}
                      </li>
                    ))}
                </ul>
                <span>Abilities</span>

                <ul className="statsAndAbilities">
                  {pokeStats.abilities &&
                    pokeStats.abilities.map((ability, index) => (
                      <li key={index}>{ability}</li>
                    ))}
                </ul>
              </span>
            </div>
            <span className="loadingAndErrorDisplay">
              {loading && <span>Loading...</span>}
              {error && <span style={{ color: "red" }}>{error.message}</span>}
            </span>
          </div>
          <div className="screen-button"></div>
          <div className="bottomDots-container">
            <div className="bottomDots" />
            <div className="bottomDots" />
            <div className="bottomDots" />
          </div>
        </div>
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
        <div className="d-pad"></div>
      </div>
    </>
  )
}
