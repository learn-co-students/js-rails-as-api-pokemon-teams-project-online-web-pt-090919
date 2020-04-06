class PokemonsController < ApplicationController
    def index
        pokemons = Pokemon.all 
        render json: PokemonSerializer.new(pokemons)
    end

    def show
        pokemon = Pokemon.find_by(id: params[:id])
        render json: PokemonSerializer.new(pokemon)
    end

    def create
        trainer = Trainer.find_by(id: params[:trainer_id])
        pokemon = trainer.pokemons.build(nickname: Faker::Name.first_name, species: Faker::Games::Pokemon.name) if trainer.pokemons.count < 6
        if pokemon.save
            render json: { message: "Captured #{pokemon.nickname}(#{pokemon.species})", data: pokemon}, status: :ok
        else
            render json: { message: "Failed to capture Pokemon", data: pokemon.errors}, status: :unproecessable_entity
        end
    end

    def destroy
        pokemon = Pokemon.find_by(id: params[:id])
        pokemon.destroy
    end

end
