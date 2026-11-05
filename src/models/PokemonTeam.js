
export function PokemonTeam(id, type, activeTeam, backupPokemon, activeMegaId) {
    this.id = id ?? null;
    this.type = type ?? null;
    this.activeTeam = activeTeam ?? [];
    this.backupPokemon = backupPokemon ?? [];
    this.activeMegaId = activeMegaId ?? null;

    this.addToTeam = function (pokemon)  {
        console.log(pokemon);
        if (this.activeTeam.length < 6) {
            this.activeTeam.push(pokemon);
        } else {
            this.backupPokemon.push(pokemon);
        }
    }
    this.removeFromTeam = function (pokemon) {
        console.log(pokemon);
        if (this.activeTeam.includes(pokemon)) {
            this.activeTeam = this.activeTeam.filter(poke => poke !== pokemon);
        } else if (this.backupPokemon.includes(pokemon)) {
            this.backupPokemon = this.backupPokemon.filter(poke => poke !== pokemon);
        }
    }
    this.activeTeamMega = function (pokemon) {
        if (Number.isFinite(pokemon)) {
            this.activeMegaId = pokemon;
        } else{
            this.activeMegaId = pokemon.id;
        }
    }
    this.updateIfMega = function (pokemon) {
        if (this.activeMegaId === pokemon.id) {
            return pokemon.cp * 1.33;
        }
        return pokemon.cp;
    }
    this.calculateTeamCp = function (pokemonList) {

            let counter = 0;


            for (const pokeInTeam of this.activeTeam) {
                if (this.activeMegaId === pokeInTeam) {
                    counter += pokemonList.findPokemonById(pokeInTeam).cp * 1.33;
                }
                counter += pokemonList.findPokemonById(pokeInTeam).cp;
            }
            return counter;

    }
}