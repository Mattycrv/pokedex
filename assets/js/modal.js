export function fillAboutTab(data, dataSpecies) {
  return `<div class="modal__tab about" data-content="sobre">
                                            <p class="about__info--text species">Espécie</p>
                                            <p class="about__info--reponse speciesResponse">
                                              ${data.species.name}
                                            </p>

                                            <p class="about__info--text height">Altura</p>
                                            <p class="about__info--reponse heightResponse">
                                              ${data.height * 10}cm
                                            </p>
                                           
                                            <p class="about__info--text weight_text">Peso</p>
                                            <p class="about__info--reponse weightResponse">
                                              ${data.weight / 10}kg
                                            </p>

                                            <p class="about__info--text abilities">Habilidades</p>
                                            <p class="about__info--reponse abilitiesResponse">
                                              ${data.abilities
                                                .map(
                                                  (a) =>
                                                    a.ability.name
                                                      .charAt(0)
                                                      .toUpperCase() +
                                                    a.ability.name.slice(1)
                                                )
                                                .join(", ")}
                                            </p>

                                            <p class="about__info breeding">Criação</p>
                                            
                                            <p class="about__info--text gender">Gênero</p>
                                            <p class="about__info--reponse genderResponse male"><span>♂ </span>${100 - (dataSpecies.gender_rate / 8) * 100}%</p>
                                            <p class="about__info--reponse genderResponse famale"><span>♀ </span>${(dataSpecies.gender_rate / 8) * 100}%</p>
                                            
                                            <p class="about__info--text eggGroups">Grupo de Ovos</p>
                                            <p class="about__info--reponse eggGroupsResponse">
                                            ${dataSpecies.egg_groups
                                              .map(
                                                (e) =>
                                                  e.name
                                                    .charAt(0)
                                                    .toUpperCase() +
                                                  e.name.slice(1)
                                              )
                                              .join(", ")}
                                            </p>
                                                
                                            <p class="about__info--text eggCycle">Ciclo do Ovo</p>
                                            <p class="about__info--reponse eggCycleResponse">${dataSpecies.hatch_counter}</p>
                                        </div>`;
}

export function fillStatusTab(data) {
  const statsTotal = data.stats.reduce(
    (soma, stat) => soma + stat.base_stat,
    0
  );

  return `<div class="modal__tab stats" data-content="status" style="display: none;">
                                            <p>HP</p>
                                            <p class="stats__response">${data.stats[0].base_stat}</p>
                                            <div class="stats__bar">
                                                <div class="stats__bar--value" style="width:${(data.stats[0].base_stat / 200) * 100}%; background-color:${data.stats[0].base_stat > 50 ? "green" : "red"};"></div>
                                            </div>

                                            <p>Attack</p>
                                            <p class="stats__response">${data.stats[1].base_stat}</p>
                                            <div class="stats__bar">
                                                <div class="stats__bar--value" style="width:${(data.stats[1].base_stat / 200) * 100}%; background-color:${data.stats[1].base_stat > 50 ? "green" : "red"};"></div>
                                            </div>

                                            <p>Defense</p>
                                            <p class="stats__response">${data.stats[2].base_stat}</p>
                                            <div class="stats__bar">
                                                <div class="stats__bar--value" style="width:${(data.stats[2].base_stat / 200) * 100}%; background-color:${data.stats[2].base_stat > 50 ? "green" : "red"};"></div>
                                            </div>

                                            <p>Sp. Attack</p>
                                            <p class="stats__response">${data.stats[3].base_stat}</p>
                                            <div class="stats__bar">
                                                <div class="stats__bar--value" style="width:${(data.stats[3].base_stat / 200) * 100}%; background-color:${data.stats[3].base_stat > 50 ? "green" : "red"};"></div>
                                            </div>

                                            <p>Sp. Defense</p>
                                            <p class="stats__response">${data.stats[4].base_stat}</p>
                                            <div class="stats__bar">
                                                <div class="stats__bar--value" style="width:${(data.stats[4].base_stat / 200) * 100}%; background-color:${data.stats[4].base_stat > 50 ? "green" : "red"};"></div>
                                            </div>

                                            <p>Speed</p>
                                            <p class="stats__response">${data.stats[5].base_stat}</p>
                                            <div class="stats__bar">
                                                <div class="stats__bar--value" style="width:${(data.stats[5].base_stat / 200) * 100}%; background-color:${data.stats[5].base_stat > 50 ? "green" : "red"};"></div>
                                            </div>

                                            <p>Total</p>
                                            <p class="stats__response">${statsTotal}</p>
                                            <div class="stats__bar">
                                                <div class="stats__bar--value" style="width:${(statsTotal / 200) * 100}%; background-color:${statsTotal > 50 ? "green" : "red"};"></div>
                                            </div>
                                        </div>`;
}

export function fillEvolutionsTab(evolutions, dataEvolution) {
  return `<div class="modal__tab evolutions" data-content="evolucoes" style="display: none;">
                                            <h1>Evolution Chain</h1>
                                            <div class="evolution-container">
                                                <div>
                                                    <img class="pokemon__image" src=${evolutions.base.sprites.other["official-artwork"].front_default} alt="pokemon"/>
                                                    <p>${evolutions.base.name}</p>
                                                </div>

                                                ${
                                                  dataEvolution.chain.evolves_to
                                                    .length > 0
                                                    ? `<div>
                                                        <p class="symbol">→</p>
                                                        <p><span>Lvl ${dataEvolution.chain.evolves_to[0].evolution_details[0].min_level}</span></p>
                                                    </div>
                                                    <div>
                                                        <img class="pokemon__image" src=${evolutions.first.sprites.other["official-artwork"].front_default} alt="pokemon"/>
                                                        <p>${evolutions.first.name}</p>`
                                                    : ""
                                                }
                                                    </div>

                                                ${
                                                  dataEvolution.chain.evolves_to
                                                    .length > 0
                                                    ? `<div>
                                                        <img class="pokemon__image" src=${evolutions.first.sprites.other["official-artwork"].front_default} alt="pokemon"/>
                                                        <p>${evolutions.first.name}</p>`
                                                    : ""
                                                }
                                                    </div>
                                                
                                                ${
                                                  dataEvolution.chain
                                                    .evolves_to[0].evolves_to
                                                    .length > 0
                                                    ? `<div>
                                                        <p class="symbol">→</p>
                                                        <p><span>Lvl ${dataEvolution.chain.evolves_to[0].evolves_to[0].evolution_details[0].min_level}</span></p>
                                                    </div>
                                                    <div>
                                                        <img class="pokemon__image" src=${evolutions.second.sprites.other["official-artwork"].front_default} alt="pokemon"/>
                                                        <p>${evolutions.second.name}</p>
                                                    </div>`
                                                    : ""
                                                }
                                            </div>
                                        </div>`;
}

export function fillMovesTab(data) {
  return `<div class="modal__tab moves" data-content="movimentos" style="display: none;">
            ${data.moves
              .slice(0, 20)
              .map(
                (m) =>
                  `<p>• ${m.move.name.charAt(0).toUpperCase() + m.move.name.slice(1)}</p>`
              )
              .join("")}
        </div>`;
}

export function configureEventsTabs() {
  const allButtons = document.querySelectorAll(".modal__section");

  allButtons.forEach((botao) => {
    botao.addEventListener("click", () => {
      const attributeButtons = botao.getAttribute("data-tab");
      const modalTab = document.querySelectorAll(".modal__tab");

      modalTab.forEach((aba) => {
        aba.style.display = "none";
      });

      const dataContent = document.querySelector(
        `[data-content="${attributeButtons}"]`
      );

      dataContent.style.display = "grid";
    });
  });
}
