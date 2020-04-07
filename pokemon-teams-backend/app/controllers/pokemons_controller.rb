class PokemonsController < ApplicationController

    def create
        trainer = Trainer.find(params["pokemon"]["trainer_id"])

        if trainer.pokemons.count >= 6
            render json: { error: "Full party" }
        else
           poke = trainer.pokemons.build(nickname: Faker::Name.first_name, species: Faker::Games::Pokemon.name)
           if poke.save
            render json: PokemonSerializer.new(poke).to_serialized_json
           else
            render json: { error: "Failed"}
           end
        end
    end

    def index
        pokemon = Pokemon.all
        render json: PokemonSerializer.new(pokemon).to_serialized_json
    end

    def destroy
        Pokemon.find(params["id"]).destroy
    end
end
