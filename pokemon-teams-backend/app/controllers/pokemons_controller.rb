class PokemonsController < ApplicationController
  def index
    pokemons = Pokemon.all
    # render json: pokemons, except: [:created_at, :updated_at]
    render json: PokemonSerializer.new(pokemons).to_serialized_json
  end
  
  def show
    pokemon = Pokemon.find_by(id: params[:id])
    render json: PokemonSerializer.new(pokemon).to_serialized_json
  end

  def create
    # trainer_id provided by js fetch post request
    trainer = Trainer.find_by(id: params[:trainer_id]) 
    name = Faker::Name.first_name
    species = Faker::Games::Pokemon.name
    new_pokemon = trainer.pokemons.build(nickname: name, species: species, trainer_id: trainer)
    if new_pokemon.save
      render json: PokemonSerializer.new(new_pokemon).to_serialized_json
    else
      render json: { message: "Failed to capture Pokemon" }
    end
  end

  def destroy
    # render json: PokemonSerializer.new(pokemon).to_serialized_json
    pokemon = Pokemon.find_by(id: params["id"])
    pokemon.destroy
  end
end
