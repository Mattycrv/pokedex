import { API_POKEMON_URL } from "./constants.js";

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

  try {
    const responseBasePokemon = await fetch(
      `${API_POKEMON_URL}/${pokemonBaseName}`
    );
    const dataBasePokemon = await responseBasePokemon.json();

    if (dataEvolution.chain.evolves_to.length > 0) {
      primaryPokemonEvolutionName =
        dataEvolution.chain.evolves_to[0].species.name;
      const responsePrimaryPokemonEvolution = await fetch(
        `${API_POKEMON_URL}/${primaryPokemonEvolutionName}`
      );

      dataPrimaryPokemonEvolution =
        await responsePrimaryPokemonEvolution.json();

      if (dataEvolution.chain.evolves_to[0].evolves_to.length > 0) {
        secondPokemonEvolutionName =
          dataEvolution.chain.evolves_to[0].evolves_to[0].species.name;
        const responseSecondPokemonEvolution = await fetch(
          `${API_POKEMON_URL}/${secondPokemonEvolutionName}`
        );

        dataSecondPokemonEvolution =
          await responseSecondPokemonEvolution.json();
      }
    }

    return {
      base: dataBasePokemon,
      first: dataPrimaryPokemonEvolution,
      second: dataSecondPokemonEvolution,
    };
  } catch (error) {
    console.error("Erro ao buscar evoluções:", error);
    throw error;
  }
}
