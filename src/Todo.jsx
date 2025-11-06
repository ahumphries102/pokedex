import { useState } from "react"
import "./pokedex.css"
export default function ToDo() {
  const [pokeName, setPokeName] = useState("")
  const [pokemon, setPokemon] = useState([])
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
      <div>
        <h1>Pokedex</h1>
        <h5>Which pokemon are you looking for?</h5>
        <h6>{pokemon.name}</h6>
        <img
          src={pokemon?.sprites?.other["official-artwork"].front_default}
          alt="{pokemon.name}"
        />
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
