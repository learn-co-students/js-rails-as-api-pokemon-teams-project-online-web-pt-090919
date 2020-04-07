class PokemonSerializer

    def initialize(pokemon)
        @pokemon = pokemon
    end

    def to_serialized_json
        options = {
            except: [:updated_at, :created_at]
        }
        @pokemon.to_json(options)
    end
end