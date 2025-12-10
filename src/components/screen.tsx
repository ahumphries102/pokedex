import { ScreenProps, Pokemon } from "../interfaces"
import Dots from "../components/dots"

export default function Screen({
  capitializeWord,
  pokemon,
  pokeStats,
  error,
  loading,
}: ScreenProps) {
  return (
    <>
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
                src={pokemon?.sprites?.other["official-artwork"]?.front_default}
                alt={pokemon?.name}
              />
              <span>Height: {pokeStats.height && pokeStats.height}</span>
              <span>Weight: {pokeStats.weight && pokeStats.weight}</span>
            </span>
            <span className="stats">
              <span><b>Stats</b></span>
              <ul className="statsAndAbilities">
                {pokeStats.stats &&
                  pokeStats.stats.map((stat: Pokemon, index: number) => (
                    <li key={index}>
                      {stat.name}: {stat.value}
                    </li>
                  ))}
              </ul>
              <hr/>
              <span><b>Abilities</b></span>

              <ul className="statsAndAbilities">
                {pokeStats.abilities &&
                  pokeStats.abilities.map((ability: string, index: number) => (
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
        <Dots top={false} bottom={true} />
      </div>
    </>
  )
}
