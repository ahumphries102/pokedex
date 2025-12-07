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
      setPokeName("")
      setPokeStats({
        abilities: data.abilities.map(e => capitializeWord(e.ability.name)),
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
          <div
            className="screen"
            style={{ textAlign: "left", listStyle: "none", padding: 0 }}
          >
            <div>
              {pokemon?.name}
              </div>
              <div>
              Ability
              </div>
            <div className="screen-pokemonImageContainer">
              <img
                className="pokemonImage"
                style={{ display: pokemon ? "block" : "none" }}
                src={pokemon?.sprites?.other["official-artwork"].front_default}
                alt={pokemon?.name}
              />
              <ul style={{ textAlign: "left", listStyle: "none", padding: 0 }}>
                <li>Height: {pokeStats.stats && pokeStats.height}ft</li>
                <li>Weight: {pokeStats.stats && pokeStats.weight}lbs</li>
              </ul>
            </div>
            {loading && <p>Loading...</p>}
            {error && <p style={{ color: "red" }}>{error.message}</p>}
            <div>
              <ul style={{ textAlign: "left", listStyle: "none", padding: 0 }}>
                {pokeStats.abilities &&
                  pokeStats.abilities.map((ability, index) => (
                    <li key={index}>{ability}</li>
                  ))}
              </ul>
              <ul>
                {pokeStats.forms &&
                  pokeStats.forms.map((forms, index) => (
                    <li key={index}>{forms.name}</li>
                  ))}
              </ul>
            </div>
            <div>
              <p>Stats</p>
              <ul style={{ textAlign: "left", listStyle: "none", padding: 0 }}>
                {pokeStats.stats &&
                  pokeStats.stats.map((stat, index) => (
                    <li key={index}>
                      {stat.name}: {stat.value}
                    </li>
                  ))}
              </ul>
            </div>
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
