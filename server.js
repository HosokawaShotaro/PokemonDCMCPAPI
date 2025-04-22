const express = require('express');
const { calculate, Generations, Pokemon, Move } = require('@smogon/calc');

const app = express();
app.use(express.json());

const gen = Generations.get(9); // 第9世代（ポケモンSV）

app.post('/calc', (req, res) => {
  const { attacker, defender, move } = req.body;

  const attackerPokemon = new Pokemon(gen, attacker.species, attacker);
  const defenderPokemon = new Pokemon(gen, defender.species, defender);
  const moveInstance = new Move(gen, move);

  const result = calculate(gen, attackerPokemon, defenderPokemon, moveInstance);
  res.json({
    damage: result.range(),
    description: result.fullDesc(),
    kochance: result.koChanceText()
  });
});

app.listen(3000, () => {
  console.log('Damage calc API server running on port 3000');
});

