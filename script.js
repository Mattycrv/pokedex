let offset = 0;
let limit = 10;

const typeColors = {
    normal: '#A8A878',
    fire: '#F08030',
    water: '#6890F0',
    grass: '#78C850',
    electric: '#F8D030',
    ice: '#98D8D8',
    fighting: '#C03028',
    poison: '#A040A0',
    ground: '#E0C068',
    flying: '#A890F0',
    psychic: '#F85888',
    bug: '#A8B820',
    rock: '#B8A038',
    ghost: '#705898',
    dragon: '#7038F8',
    dark: '#705848',
    steel: '#B8B8D0',
    fairy: '#EE99AC'
};

async function getPokemons() {
    let pokemons = document.querySelector(".pokemons__table");

    for (i = offset + 1; i <= offset + limit; i++) {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}/`);  
        const data = await response.json();
        console.log(data);
        console.log(data.stats);

        const primaryType = data.types[0].type.name;
        const color = typeColors[primaryType];

        const cards = document.createElement("div");
        cards.classList.add("pokemons__card");
        cards.style.backgroundColor = color;

        cards.innerHTML = `<div class="pokemons__information">
                                <div class="pokemons__information--text">
                                    <div class="pokemons__information--container">
                                        <p class="pokemons__name">${data.name}</p>
                                        ${data.types.map(t => `<p class="pokemons__type">${t.type.name}</p>`).join('')}
                                    </div>
                                    <div class="pokemons__number--container">
                                        <p class="pokemons__number">#${String(data.id).padStart(3, '0')}</p>
                                    </div>
                                    <div class="pokemons__img--container">
                                        <img class="pokemons__img" src=${data.sprites.other["official-artwork"].front_default} alt="pokemon"/>
                                    </div>
                                </div>
                            </div>`;

        pokemons.appendChild(cards);

        let modalBody = document.querySelector(".modal__body");

        cards.addEventListener('click', async () => {
            document.getElementById("pokemonModal").showModal();

            const responseSpecies = await fetch(data.species.url);
            const dataSpecies = await responseSpecies.json();
            console.log(dataSpecies);

            const modal = document.querySelector(".modal");
            modal.style.backgroundColor = color;

            modalBody.innerHTML = "";

            const modalStatus = document.createElement("div");
            modalStatus.classList.add("modal__status");

            modalStatus.innerHTML = `<div class="modal__informations">
                                        <div>
                                            <h1 class="modal__name">${data.name}</h1>
                                            ${data.types.map(t => `<p class="pokemon__type--modal">${t.type.name}</p>`).join("")}
                                        </div>
                                        <div class="modal__id--container">
                                            <p class="modal__id">#${String(data.id).padStart(3, '0')}</p>
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
                                        <div class="modal__tab" data-content="sobre">
                                            <p class="about__info--text species">Espécie</p>
                                            <p class="about__info--reponse speciesResponse">${data.species.name}</p>

                                            <p class="about__info--text height">Altura</p>
                                            <p class="about__info--reponse heightResponse">${data.height * 10}cm</p>
                                           
                                            <p class="about__info--text weight_text">Peso</p>
                                            <p class="about__info--reponse weightResponse">${data.weight / 10}kg</p>

                                            <p class="about__info--text abilities">Habilidades</p>
                                            <p class="about__info--reponse abilitiesResponse">${data.abilities.map(a => a.ability.name.charAt(0).toUpperCase() + a.ability.name.slice(1)).join(", ")}</p>

                                            <p class="about__info breeding">Criação</p>
                                            
                                            <p class="about__info--text gender">Gênero</p>
                                            <p class="about__info--reponse genderResponse male"><span>♂ </span>${100 - ((dataSpecies.gender_rate / 8) * 100)}%</p>
                                            <p class="about__info--reponse genderResponse famale"><span>♀ </span>${((dataSpecies.gender_rate / 8) * 100)}%</p>
                                            
                                            <p class="about__info--text eggGroups">Grupo de Ovos</p>
                                            <p class="about__info--reponse eggGroupsResponse">${dataSpecies.egg_groups.map(e => e.name.charAt(0).toUpperCase() + e.name.slice(1)).join(", ")}</p>
                                                
                                            <p class="about__info--text eggCycle">Ciclo do Ovo</p>
                                            <p class="about__info--reponse eggCycleResponse">${dataSpecies.hatch_counter}</p>
                                        </div>
                                        <div class="modal__tab" data-content="status" style="display: none;">
                        
                                        </div>

                                        <div class="modal__tab" data-content="evolucoes" style="display: none;">
                                            
                                        </div>

                                        <div class="modal__tab" data-content="movimentos" style="display: none;">
                                            
                                        </div>
                                    </div>`;
            
            modalBody.appendChild(modalStatus);

        });
    }

    offset += limit;
}

getPokemons();
document.getElementById("loadMore").addEventListener('click', getPokemons);

const modalClose =  document.querySelector('.modal__close');

modalClose.addEventListener('click', () => {
    document.getElementById("pokemonModal").close();
});



