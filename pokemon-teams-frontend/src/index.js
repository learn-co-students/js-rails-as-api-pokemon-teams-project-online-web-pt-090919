const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

const main = document.querySelector("main");

document.addEventListener("DOMContentLoaded", function() {
    gettoDaze();
});

let league = []

function updateLeague() {
    league.length = 0;
    fetch(TRAINERS_URL)
    .then(function(response) {
        return response.json();
    })
    .then(function(json) {
        for (let trainer of json) {
            league.push(trainer);
        };
    });
}

function gettoDaze() {
    fetch(TRAINERS_URL)
    .then(function(response) {
        return response.json();
    })
    .then(function(json) {
        for (let trainer of json) {
            league.push(trainer);
        };
        for (let trainer of league) {
            trainerCard(trainer);
        };
    });
};

function trainerCard(trainer) {
    let div = document.createElement("div");
        div.classList.add("card");
        div.setAttribute("data-id", trainer.id);
    let p = document.createElement("p");
        p.textContent = trainer.name;
    let addButton = document.createElement("button");
        addButton.setAttribute("class", "tester")
        addButton.setAttribute("data-trainer-id", trainer.id);
        addButton.addEventListener("click", addPokemon);
        addButton.textContent = "Add Pokemon";
    let ul = document.createElement("ul");
    for (let pokemon of trainer.pokemons) {
        let li = document.createElement("li");
            li.textContent = `${pokemon.nickname} (${pokemon.species})`;
            let remButton = document.createElement("button");
                remButton.setAttribute("class", "release");
                remButton.setAttribute("data-pokemon-id", pokemon.id);
                remButton.textContent = "Release";
            li.appendChild(remButton);
        ul.appendChild(li);    
    };
    div.appendChild(p);  
    div.appendChild(addButton);
    div.appendChild(ul);
    main.appendChild(div);
};

function addPokemon() {
    console.log("Suc");
    let formData = {
        trainer_id: this.getAttribute("data-trainer-id")
    };
       
    let configObj = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(formData)
    };
    
    let trainerCard = this.parentElement;

    fetch("http://localhost:3000/pokemons", configObj)
    .then(function(response) {
        addPokeLine(trainerCard.getAttribute("data-id"));
    })

};

function addPokeLine(index) {
    fetch(TRAINERS_URL)
    .then(function(response) {
        return response.json();
    })
    .then(function(json) {
        let trainer = json[`${index - 1}`];
        let pokeLine = makePokeLine(trainer.pokemons[`${trainer.pokemons.length - 1}`]);
        let ul = document.querySelectorAll("ul")[`${index - 1}`];
        ul.appendChild(pokeLine);
    });
}

function makePokeLine(pokemon) {
    let li = document.createElement("li");
        li.textContent = `${pokemon.nickname} (${pokemon.species})`;
    let remButton = document.createElement("button");
        remButton.setAttribute("class", "release");
        remButton.setAttribute("data-pokemon-id", pokemon.id);
        remButton.textContent = "Release";
    li.appendChild(remButton);
    return li
}