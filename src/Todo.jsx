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
