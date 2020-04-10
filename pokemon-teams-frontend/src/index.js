const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

const main = document.querySelector("main");

function gettoDaze(number) {
    fetch(TRAINERS_URL)
    .then(function(response) {
        return response.json();
    })
    .then(function(json) {
        let trainer = json[`${number}`];
        trainerCard(trainer);
    });
};

function trainerCard(trainer) {
    let div = document.createElement("div");
        div.classList.add("card");
        div.setAttribute("data-id", trainer.id);
    let p = document.createElement("p");
        p.textContent = trainer.name;
    let addButton = document.createElement("button");
        addButton.setAttribute("data-trainer-id", trainer.id);
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