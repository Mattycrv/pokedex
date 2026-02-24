export async function fetchData(url) {
  const response = await fetch(url);
  return await response.json();
}

export async function getPokemonEvolutions(dataEvolution) {
  const pokemonBaseName = dataEvolution.chain.species.name;
  let dataPrimaryPokemonEvolution = null;
  let dataSecondPokemonEvolution = null;
  let primaryPokemonEvolutionName;
  let secondPokemonEvolutionName;

  if (dataEvolution.chain.evolves_to.length > 0) {
    primaryPokemonEvolutionName =
      dataEvolution.chain.evolves_to[0].species.name;
    const responsePrimaryPokemonEvolution = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${primaryPokemonEvolutionName}`,
    );

    dataPrimaryPokemonEvolution = await responsePrimaryPokemonEvolution.json();

    if (dataEvolution.chain.evolves_to[0].evolves_to.length > 0) {
      secondPokemonEvolutionName =
        dataEvolution.chain.evolves_to[0].evolves_to[0].species.name;
      const responseSecondPokemonEvolution = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${secondPokemonEvolutionName}`,
      );

      dataSecondPokemonEvolution = await responseSecondPokemonEvolution.json();
    }
  }

  const responseBasePokemon = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${pokemonBaseName}`,
  );
  const dataBasePokemon = await responseBasePokemon.json();

  return {
    base: dataBasePokemon,
    first: dataPrimaryPokemonEvolution,
    second: dataSecondPokemonEvolution,
  };
}
