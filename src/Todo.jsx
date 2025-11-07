import { useState } from "react"
import "./pokedex.css"
export default function ToDo() {
  const [pokeName, setPokeName] = useState("")
  const [pokemon, setPokemon] = useState(null)
  const handleInput = (e) => {
    setPokeName(e.target.value)
  }
  const locatePokemon = async (pokemon) => {
    const response = await fetch("http://localhost:5000/" + pokemon)
    const data = await response.json()
    setPokemon(data)
    setPokeName("")
  }
  return (
    <>
      <h1>Pokedex</h1>
      <h5>Which pokemon are you looking for?</h5>
      <div className="pokedexContainer">
        <div className="screenContainer">
          <div className="topDots-container">
            <div className="topDots"></div>
            <div className="topDots"></div>
          </div>
          <div className="screen">
            {pokemon?.name}
            <div className="screen-pokemonImageContainer">
              <img
                className="pokemonImage"
                style={{ display: pokemon ? "block" : "none" }}
                src={pokemon?.sprites?.other["official-artwork"].front_default}
                alt={pokemon?.name}
              />
            </div>
          </div>
          <div className="screen-button"></div>
        </div>

        <form
          style={{ display: "flex", flexDirection: "column" }}
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
      </div>
    </>
  )
}
