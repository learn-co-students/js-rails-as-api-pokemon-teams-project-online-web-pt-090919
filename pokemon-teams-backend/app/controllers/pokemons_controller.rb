class PokemonsController < ApplicationController

    def create
        pokemon = Pokemon.new(
            species: Faker::Games::Pokemon.name,
            nickname: Faker::Name.first_name,
            trainer_id: pokemon_params[:trainer_id]
        )
        pokemon.save
    end

    def destroy

    end

    private

    def pokemon_params
        params.require("pokemon").permit("trainer_id")
    end

end
