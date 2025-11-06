import Pokedex from 'pokedex-promise-v2';
const pokedex = new Pokedex();

(async () => { // with Async/Await
    const pokemon = await pokedex.getPokemonByName(['pikachu', 'dragonite', 'gyarados']);
    console.log(pokemon)
})()