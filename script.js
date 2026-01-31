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

        const primaryType = data.types[0].type.name;
        const color = typeColors[primaryType];

        const cards = document.createElement("div");
        cards.classList.add("pokemons__card");
        cards.style.backgroundColor = color;

        cards.innerHTML = `<div class="pokemons__information">
                                <div class="pokemons__information--text">
                                    <div>
                                        <p class="pokemons__name">${data.name}</p>
                                        ${data.types.map(t => `<p class="pokemons__type">${t.type.name}</p>`).join('')}
                                    </div>
                                    <div class="pokemons__number--container">
                                        <p class="pokemons__number">#${String(data.id).padStart(3, '0')}</p>
                                    </div>
                                </div>
                                <div class="pokemons__information--pic">
                                    <img class="pokemons__img" src=${data.sprites.other["official-artwork"].front_default} alt="pokemon"/>
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
                                            <p class="modal__section">Sobre</p>
                                            <p class="modal__section">Status</p>
                                            <p class="modal__section">Evoluções</p>
                                            <p class="modal__section">Movimentos</p>
                                        </div>
                                        <div class="about__section">
                                            <p class="about__info species">Espécie</p>
                                            <p class="about__info speciesResponse">${data.species.name}</p>

                                            <p class="about__info height">Altura</p>
                                            <p class="about__info heightResponse">${data.height * 10}cm</p>
                                           
                                            <p class="about__info weight">Peso</p>
                                            <p class="about__info weightResponse">${data.weight / 10}kg</p>

                                            <p class="about__info abilities">Habilidades</p>
                                            <p class="about__info abilitiesResponse">${data.abilities.map(a => a.ability.name.charAt(0).toUpperCase() + a.ability.name.slice(1)).join(", ")}</p>

                                            <p class="about__info breeding">Criação</p>

                                            <p class="about__info gender">Gênero</p>
                                            <p class="about__info genderResponse">♂${100 - ((dataSpecies.gender_rate / 8) * 100)}%</p>
                                            <p class="about__info genderResponse">♀${((dataSpecies.gender_rate / 8) * 100)}%</p>
                                            
                                            <p class="about__info eggGroups">Grupo de Ovos</p>
                                            <p class="about__info eggGroupsResponse">${dataSpecies.egg_groups.map(e => e.name.charAt(0).toUpperCase() + e.name.slice(1)).join(", ")}</p>
                                                
                                            <p class="about__info eggCycle">Ciclo do Ovo</p>
                                            <p class="about__info eggCycleResponse">${dataSpecies.hatch_counter}</p>
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



