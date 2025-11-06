import express from 'express';
const app = express();
const port = 5000;
import cors from 'cors';
app.use(cors());
import Pokedex from 'pokedex-promise-v2';
const pokedex = new Pokedex();

app.get('/:id', async (req, res) => {
  console.log(req.params.id);
  const pokemonName = req.params.id.toLocaleLowerCase()
  try {

    const pokemon = await pokedex.getPokemonByName(pokemonName)
    res.send(pokemon);
  } catch (error) {
    res.status(404).send({ error: "Pokemon not found" });
    res.send(error)
    return;
  }
});

app.listen(port, async () => {
  console.log(`Example app listening on port ${port}`); 
}); 