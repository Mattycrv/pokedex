import { typeColors, state, LIMIT, API_POKEMON_URL } from "./constants.js";
import { fetchData, getPokemonEvolutions } from "./api.js";
import {
  fillAboutTab,
  fillEvolutionsTab,
  fillMovesTab,
  fillStatusTab,
  configureEventsTabs,
} from "./modal.js";

async function getPokemons() {
  let pokemons = document.querySelector(".pokemons__table");

  function creatCard(data) {
    const primaryType = data.types[0].type.name;
    const color = typeColors[primaryType];

    const cards = document.createElement("div");
    cards.classList.add("pokemons__card");
    cards.style.backgroundColor = color;

    cards.innerHTML = `<div class="pokemons__information">
                                <p class="pokemons__name">${data.name}</p>
                                    <div>
                                        ${data.types
                                          .map(
                                            (t) =>
                                              `<p class="pokemons__type">${t.type.name}</p>`
                                          )
                                          .join("")}
                                    </div>
                                <p class="pokemons__number">#${String(data.id).padStart(3, "0")}</p>
                            </div>
                            <div class="pokemons__img--container">
                                <img class="pokemons__img" src=${data.sprites.other["official-artwork"].front_default} alt="pokemon"/>
                            </div>`;

    return { cards: cards, color: color };
  }

  for (let i = state.offset + 1; i <= state.offset + LIMIT; i++) {
    try {
      const response = await fetch(`${API_POKEMON_URL}/${i}`);
      const data = await response.json();
      console.log(data);

      const { cards, color } = creatCard(data);
      pokemons.appendChild(cards);

      cards.addEventListener("click", () => openModal(data, color));
    } catch (error) {
      console.error(`Erro ao buscar pokémon ${i}:`, error);
      continue;
    }
  }

  state.offset += LIMIT;
}

async function openModal(data, color) {
  document.getElementById("pokemonModal").showModal();
  const modalBody = document.querySelector(".modal__body");

  try {
    const dataSpecies = await fetchData(data.species.url);
    const dataEvolution = await fetchData(dataSpecies.evolution_chain.url);
    const evolutions = await getPokemonEvolutions(dataEvolution);

    const statsTotal = data.stats.reduce(
      (soma, stat) => soma + stat.base_stat,
      0
    );

    const modal = document.querySelector(".modal");
    modal.style.backgroundColor = color;

    modalBody.innerHTML = "";

    const modalStatus = document.createElement("div");
    modalStatus.classList.add("modal__status");

    modalStatus.innerHTML = `<div class="modal__informations">
                                            <div>
                                                <h1 class="modal__name">${data.name}</h1>
                                                ${data.types
                                                  .map(
                                                    (t) =>
                                                      `<p class="pokemon__type--modal">${t.type.name}</p>`
                                                  )
                                                  .join("")}
                                            </div>
                                            <div class="modal__id--container">
                                              <p class="modal__id">#${String(data.id).padStart(3, "0")}</p>
                                            </div>
                                        </div>
                                        <div class="modal__pic--container">
                                          <img class="modal__img" src=${data.sprites.other["official-artwork"].front_default} alt="pokemon"/>
                                        </div>
                                        <div class="modal__infos--container">
                                          <div class="modal__section--container">
                                            <p class="modal__section" data-tab="sobre">Sobre</p>
                                            <p class="modal__section" data-tab="status">Status</p>
                                            <p class="modal__section" data-tab="evolucoes">Evoluções</p>
                                            <p class="modal__section" data-tab="movimentos">Movimentos</p>
                                          </div>
                                          ${fillAboutTab(data, dataSpecies)}
                                          ${fillStatusTab(data)}
                                          ${fillEvolutionsTab(evolutions, dataEvolution)}
                                          ${fillMovesTab(data)}
                                        </div>`;

    modalBody.appendChild(modalStatus);

    configureEventsTabs();
  } catch (error) {
    console.error("Não foi possível abrir o modal do pokémon:", error);
    modalBody.innerHTML =
      '<p style="color: white; padding: 2rem;">Erro ao carregar informações. Tente novamente.</p>';
  }
}

getPokemons();
document.getElementById("loadMore").addEventListener("click", getPokemons);

const modalClose = document.querySelector(".modal__close");

modalClose.addEventListener("click", () => {
  document.getElementById("pokemonModal").close();
});
