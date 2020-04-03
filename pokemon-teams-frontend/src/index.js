const BASE_URL = "http://localhost:3000";
const TRAINERS_URL = `${BASE_URL}/trainers`;
const POKEMONS_URL = `${BASE_URL}/pokemons`;
const main = document.querySelector("main");

document.addEventListener("DOMContentLoaded", e => {
     // debugger;
     getTrainers();
});

const getTrainers = () => {
     return fetch(TRAINERS_URL)
          .then(resp => resp.json())
          .then(trainerData => {
               createCards(trainerData);
               debugger;
               console.log("SUCCESS");
          })
          .catch(err => console.log(err.message));
}

const createCards = trainerData => {
     trainerData.forEach(trainer => {
          let trainerCard = document.createElement("div");
          trainerCard.classList.add("card");
          trainerCard.setAttribute("data-id", `${trainer.id}`);
          trainerCard.innerHTML += `
          <p>${trainer.name}</p>
          <button data-trainer-id="${trainer.id}">Add Pokemon</button>
       `;

          let pokemonHolder = document.createElement("ul");

          trainer.pokemons.forEach(pokemon => {
               pokemonHolder.innerHTML += `
          <li>${pokemon.nickname} (${pokemon.species}) <button class="release" data-pokemon-id="${pokemon.id}">Release</button></li>
          `;
               trainerCard.append(pokemonHolder);
               main.appendChild(trainerCard);
          });
     });
};