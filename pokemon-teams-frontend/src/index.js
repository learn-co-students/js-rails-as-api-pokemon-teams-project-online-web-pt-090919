const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
// added main to append to.
const main = document.querySelector('main')

document.addEventListener('DOMContentLoaded', () => loadTrainers())
// the DOMContentloaded takes a function pointed to a function called Load trainers
const loadTrainers = () => {
    // This function is stored in a variable then fetched
    fetch(TRAINERS_URL)
    .then(resp => resp.json())
    .then(data => {
        // forEach to another function that is reciving an argument (trainer) for the input of data =>
            data.forEach(trainer => renderTrainer(trainer))
          })
}

const renderTrainer = (trainerHash) => {
    const div = document.createElement('div')
    const p = document.createElement('p')
    const button = document.createElement('button')
    const ul = document.createElement('ul')

    div.setAttribute('class', 'card')
    div.setAttribute('data-id', trainerHash.id)
    p.innerHTML = trainerHash.name
    button.setAttribute('data-trainer-id', trainerHash.id)
    button.innerHTML = 'Add Pokemon'
    button.addEventListener('click', createPokemon)
    // attach event listiner to button 'click'
    div.appendChild(p)
    div.appendChild(button)
    div.appendChild(ul)
    main.appendChild(div)
    trainerHash.pokemons.forEach(pokemon => renderPokemon(pokemon))
}

const renderPokemon = (pokemon) => {
    const ul = document.querySelector(`div[data-id = '${pokemon.trainer_id}']`)
    const li = document.createElement('li')
    const button = document.createElement('button')
    
    li.innerHTML = `${pokemon.nickname} (${pokemon.species})`
    button.setAttribute('class', 'release')
    button.setAttribute('data-pokemon-id', pokemon.id)
    button.innerHTML = 'Release'
    button.addEventListener('click', deletePokemon)
    // attach event listener to button 'click'

    li.appendChild(button)
    ul.appendChild(li)
}

const createPokemon = (event) => {
    event.preventDefault()
    const configObj = {
        method: "POST", 
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({trainer_id: event.target.dataset.trainerId})
    }
    fetch(POKEMONS_URL, configObj)
    .then(resp => resp.json())
    .then(data => {
        if (data.message) {
            alert(data.message)
        } else {
            renderPokemon(data)  
        }
    })
}

const deletePokemon = (event) => {
    event.preventDefault()
    const configObj = {
        method: "DELETE", 
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    }
    fetch(`${POKEMONS_URL}/${event.target.dataset.pokemonId}`, configObj)
    event.target.parentElement.remove()

}