const BASE_URL = "http://localhost:3000";
const TRAINERS_URL = `${BASE_URL}/trainers`;
const POKEMONS_URL = `${BASE_URL}/pokemons`;
const main = document.querySelector('main');


document.addEventListener("DOMContentLoaded", e => {
  getTrainers();
  main.addEventListener('click', e => {
    const releaseBtns = document.querySelectorAll('button.release'); // all release btns
    releaseBtns.forEach(btn => {
      if (e.target == btn) {
        releasePokemon(btn)
      }
    });
  });
});

// GET all trainers
function getTrainers() {
  fetch(TRAINERS_URL)
  .then(resp => resp.json())
  .then(trainersData => {
    renderTrainerCards(trainersData);
    console.log('all trainers fetched');
    }) //object
  .catch(err => alert(err.message));
}

// Create trainers 
function renderTrainerCards(trainersData) {
  trainersData.forEach(trainer => {
    let trainerCard = document.createElement("div");
    trainerCard.classList.add("card");
    trainerCard.setAttribute("data-id", trainer.id);

    // p ele: trainer name
    let p = document.createElement('p');
    p.innerText = trainer.name;

    // button ele: add pokemon
    let btn = document.createElement('button');
    btn.setAttribute("data-trainer-id", trainer.id);
    btn.innerText = "Add Pokemon";
    btn.addEventListener('click', e => {addPokemonHandler(e.target)});
    
    // ul: List of pokemons
    let ul = document.createElement('ul');
    trainer.pokemons.forEach(pokemon => {
      ul.innerHTML += `
        <li>${pokemon.nickname} (${pokemon.species})
        <button class="release" data-pokemon-id=${pokemon.id}>Release</button></li>
      `;
    });
    
    // ParentNode.append() can append several nodes and strings
    trainerCard.append(p, btn, ul);
    main.appendChild(trainerCard);
  });
}  
// Adding a pokemon
function addPokemonHandler(btn){
  let trainerId = btn.dataset.trainerId;
  let pokemonList = btn.nextElementSibling.querySelectorAll('li'); //NodeList
  if (pokemonList.length >= 6) {
    alert("Your team is already full.");
  } else {
    createPokemon(trainerId);
  };
};

// POST /pokemons - POST fetch 
function createPokemon(trainerId) {
  console.log(`Creating pokemon for trainer #${trainerId}`);
  let trainerData = {trainer_id: trainerId};
  let configObj = {
    'method': "POST",
    'headers': {
      'Content-Type': "application/json",
      'Accept': "application/json",
    },
    // when data exchanged bwn client & client - data is sent ass text
    //JSON.stringify to convert obj to JSON giant str - preseves k/v pairs
    body: JSON.stringify(trainerData)
  };
  //send the POST request
  fetch(POKEMONS_URL, configObj)
    .then(resp => resp.json())
    .then(obj => {
      renderPokemon(obj) 
      // console.log(obj) // {id: 41, species: "Cubone", nickname: "Sol", trainer_id: 6}
    })
    .catch(error => alert(error.message));
  };

function renderPokemon(obj){
  let pokemonList = document.querySelector(`div[data-id="${obj.trainer_id}"]`).children[2];
  let newPokemon = `<li>${obj.nickname} (${obj.species})
  <button class="release" data-pokemon-id=${obj.id}>Release</button></li>`;
  pokemonList.innerHTML += newPokemon;
  console.log(`${obj.nickname} (${obj.species}) added to trainer #${obj.trainer_id}`);
};

function releasePokemon(pokemonBtn){   
  let pokemonId = pokemonBtn.dataset.pokemonId;
  //DELETE /pokemons/:pokemon_id fetch code 
  fetch(`${POKEMONS_URL}/${pokemonId}`,{
    method: 'delete'
  })
    .then(console.log('pokemon deleted'))
    .catch(err => alert(err.message))
  //delete li
  pokemonBtn.parentElement.remove()
}
