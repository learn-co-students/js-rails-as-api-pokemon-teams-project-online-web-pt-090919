const BASE_URL = "http://localhost:3000";
const TRAINERS_URL = `${BASE_URL}/trainers`;
const POKEMONS_URL = `${BASE_URL}/pokemons`;
const main = document.querySelector("main");

document.addEventListener("DOMContentLoaded", e => {
     getTrainers();
     postPokemon();
     removePokemon();
});


// GET TRAINERS 
function getTrainers() {
     fetch(TRAINERS_URL)
          .then(res => {
               return res.json()
          })
          .then(pokemon => {
               createTrainerCards(pokemon)
               console.log("SUCCESS")
          })
          .catch(err => console.log(err.message));
}

// ADD A POKEMON
function postPokemon() {
     main.addEventListener('click', e => {
          let addButtons = document.querySelectorAll('.add-pokemon-btn')
          let pokemonHolder = e.target.nextElementSibling
          addButtons.forEach(btn => {
               if (e.target === btn) {
                    let trainerId = btn.parentElement.dataset.id;
                    let pokemonList = btn.nextElementSibling.querySelectorAll('li');

                    if (pokemonList.length >= 6) {
                         alert("You can't add any more pokemon")
                    } else {
                         createFetchPost(trainerId)
                    }
               }
          });

          // CLOSURE
          function createFetchPost(id) {

               let data = {
                    "trainer_id": id
               }

               let options = {
                    "method": "POST",
                    "headers": {
                         'Content-Type': "application/json",
                         'Accept': "application/json"
                    },
                    body: JSON.stringify(data)
               }

               fetch(POKEMONS_URL, options)
                    .then(res => res.json())
                    .then(pokemon => {
                         // debugger
                         createPokemonItem(pokemon)
                    })
                    .catch(err => console.log(err.message))

               // CLOSURE
               function createPokemonItem(pokemon) {
                    pokemonItem = document.createElement('li')
                    pokemonItem.innerHTML += `${pokemon.data.attributes.nickname} (${pokemon.data.attributes.species})
                    <button class="release" data-pokemon-id="${pokemon.id}"> Release</button>`
                    debugger
                    pokemonHolder.appendChild(pokemonItem)
               }
          }
     })
}

// DELETE A POKEMON 
function removePokemon() {
     main.addEventListener('click', e => {

          let releaseButtons = document.querySelectorAll('.release')
          releaseButtons.forEach(delPoke => {
               if (e.target === delPoke) {
                    let pokemonId = delPoke.dataset.pokemonId;
                    delPoke.parentElement.remove()
                    createFetchDeleteBy(pokemonId)
               }
          });

          // CLOSURE
          function createFetchDeleteBy(id) {
               fetch(`${POKEMONS_URL}/${id}`, {
                         "method": "DELETE"
                    })
                    .then(console.log("Deleted Successfully"))
                    .catch(err => console.log(err.message))
          }
     })
}

// CREATE TRAINERS
function createTrainerCards(trainerData) {
     trainerData.data.forEach(trainer => {
          // debugger
          let trainerCard = document.createElement("div");
          trainerCard.classList.add("card");
          trainerCard.setAttribute("data-id", `${trainer.id}`);
          trainerCard.innerHTML += `
          <p>${trainer.attributes.name}</p>
          <button data-trainer-id="${trainer.attributes.id}"
          class="add-pokemon-btn">Add Pokemon</button>
          `;
          // debugger
          let pokemonHolder = document.createElement("ul");

          trainer.attributes.pokemons.forEach(pokemon => {
               pokemonHolder.innerHTML += `
          <li>${pokemon.nickname} (${pokemon.species}) <button class="release" data-pokemon-id="${pokemon.id}">Release</button></li>
          `;
               trainerCard.append(pokemonHolder);
               main.appendChild(trainerCard);
          })
     });
};