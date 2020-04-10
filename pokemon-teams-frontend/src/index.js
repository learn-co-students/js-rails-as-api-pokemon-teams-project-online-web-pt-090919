const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

onst main = document.querySelector("main");
document.addEventListener("DOMContentLoaded", e => {
    getTrainers();
    postPokemon();
    removePokemon() 
});
// GET TRAINERS 
function getTrainers() {
    setUpAllTrainersForRetrieval();
}
// POST A POKEMON
function postPokemon() {
    setUpPokemonForCreation();
}
// REMOVE A POKEMON
function removePokemon() {
    setUpPokemonForDeletion();
}
// ============================================================
// CREATE TRAINERS
function createTrainerCards(trainerData) {
    trainerData.forEach(trainer => {
        let trainerCard = document.createElement("div");
        trainerCard.classList.add("card");
        trainerCard.setAttribute("data-id", `${trainer.id}`);
        trainerCard.innerHTML += `
        <p>${trainer.name}</p>
        <button data-trainer-id="${trainer.id}" class="add-pokemon-btn">Add Pokemon</button>
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
// ============================================================
// GET ALL POKEMON 
function setUpAllTrainersForRetrieval() {
    fetch(TRAINERS_URL)
        .then(res => res.json())
        .then(trainerData => {
            createTrainerCards(trainerData);
            console.log("SUCCESS");
        })
        .catch(err => console.log(err.message));
}
// ============================================================
// ADD A POKEMON
function setUpPokemonForCreation() {
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
        })
          // =====================================================
          // ABSTRACTING AWAY POST FETCH CODE
        function createFetchPost(id) {
            data = {
                "trainer_id": id
            }
            options = {
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
                    createPokemonItem(pokemon)
                    console.log(pokemon)
                })
                .catch(err => console.log(err.message))
               // ==============================================
            function createPokemonItem(pokemon) {
                pokemonItem = document.createElement('li')
                pokemonItem.innerHTML += `${pokemon.data.nickname} (${pokemon.data.species})<button class="release" data-pokemon-id="${pokemon.data.id}">Release</button>`                    
                pokemonHolder.appendChild(pokemonItem)
            }
               // ===============================================
        }
          // =====================================================
    })
}
// ============================================================
// DELETE A POKEMON 
function setUpPokemonForDeletion() {
    main.addEventListener('click', e => {
      let releaseButtons = document.querySelectorAll('.release') // all release pokemon buttons
        releaseButtons.forEach(btn => {
            if (e.target === btn) {
                let pokemonId = btn.dataset.pokemonId;
                createFetchDelete(pokemonId)
                btn.parentElement.remove()
            }
        })
          // ====================================================
          // ABSTRACTING AWAY DELETE FETCH CODE
        function createFetchDelete(id) {
            fetch(`${POKEMONS_URL}/${id}`, {
                        "method": "DELETE"
                    })
                    .then(console.log("Deleted Successfully"))
                    .catch(err => console.log(err.message))
        }
          // =====================================================
    })
} 
