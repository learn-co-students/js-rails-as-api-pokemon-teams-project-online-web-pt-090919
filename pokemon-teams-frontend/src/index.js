const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
const trainerContainer = document.querySelector('main')


fetch(TRAINERS_URL)
    .then(function (response) {
        return response.json();
    })
    .then(function (trainers) {
        trainers.forEach(renderTrainer);
        addListeners();
    });

function addListeners() {
    const addBtns = document.querySelectorAll('button.add')
    const rlsBtns = document.querySelectorAll('button.release')
    addBtns.forEach(btn => {
        btn.addEventListener('click', function (e) {
            addPokemon(e);
        })
    });
    rlsBtns.forEach(btn => {
        btn.addEventListener('click', function (e) {
            releasePokemon(e);
        })
    });
}

function addPokemon(e) {
    const trainerUl = document.querySelector(`[data-trainer-ul='${e.target.dataset.trainerId}']`)
    let trainerData = { "trainer_id": e.target.dataset.trainerId }
    let options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(trainerData)
    }
    fetch(POKEMONS_URL, options)
        .then(resp => resp.json())
        .then(json => {
            if (trainerUl.children.length < 6) {
                renderPokemon(json, trainerUl);
                const btns = Array.prototype.slice.call(trainerUl.querySelectorAll('li'))
                btns.forEach(btn => btn.addEventListener("click", function (e) {
                    releasePokemon(e);
                }))
            } else {
                alert("Your party is full!")
            }
        })
}

function releasePokemon(e) {
    let options = {
        method: "DELETE",
    }
    let newUrl = `${POKEMONS_URL}/${e.target.dataset.pokemonId}`
    fetch(newUrl, options)
    e.target.parentElement.remove();
}

function renderTrainer(trainer) {
    const info = `
    <div class="card" data-id=${trainer.id}><p>${trainer.name}</p>
        <button class="add" data-trainer-id=${trainer.id}>Add Pokemon</button>
        <ul data-trainer-ul=${trainer.id}></ul>
    </div>`;
    trainerContainer.innerHTML += info;
    const trainerUl = document.querySelector(`[data-trainer-ul='${trainer.id}']`)
    trainer.pokemons.forEach(poke => renderPokemon(poke, trainerUl))
}

function renderPokemon(pokemon, trainerUl) {
    const info = `
    <li>
        ${pokemon.nickname} (${pokemon.species})
        <button class="release" data-pokemon-id='${pokemon.id}'>Release</button>
    </li>`;
    trainerUl.innerHTML += info;
}