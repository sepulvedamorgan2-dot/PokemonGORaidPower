

export function RaidTeam(data = {}) {
    this.id = data.id ?? null;
    this.type = data.type ?? null;
    this.activeTeam = data.activeTeam ?? [];
    this.backupPokemon = data.backupPokemon ?? [];
    this.activeMegaId = data.activeMegaId ?? null;


    /**
     * Adds a Pokemon to the team. If the active team has less than 6 Pokemon,
     * it adds the Pokemon to the active team; otherwise, it adds it to the backup Pokémon list.
     * @param pokemon The Pokémon to add.
     */
    this.addToTeam = function (pokemon)  {
        console.log(pokemon);
        if (this.activeTeam.length < 6) {
            this.activeTeam.push(pokemon);
        } else {
            this.backupPokemon.push(pokemon);
        }
    }
    /**
     * Removes a Pokemon from the team, either from the active team or the backup Pokémon list.
     * If the active team is not full and there are backup Pokémon, it moves a backup Pokémon to the active team.
     * @param pokemon
     */
    this.removeFromTeam = function (pokemon) {
        console.log(pokemon);
        if (this.activeTeam.includes(pokemon)) {
            this.activeTeam = this.activeTeam.filter(poke => poke !== pokemon);
            if(this.activeTeam.length < 6 && this.backupPokemon.length > 0) {
                this.activeTeam.push(this.backupPokemon.shift());
            }
        } else if (this.backupPokemon.includes(pokemon)) {
            this.backupPokemon = this.backupPokemon.filter(poke => poke !== pokemon);

        }
    }
    /**
     * Sets the active Mega Pokémon for the team.
     * If a Pokémon object is provided,
     * it sets the active Mega Pokémon to that Pokémon's ID, if a number is provided,
     * it sets the active Mega Pokémon to that number.
     * The pokemon with the activeMegaId will have its CP multiplied by 1.33 when calculating the team CP.
     * this effect is very basic and does not take into account the actual Mega Pokémon's CP or stats.(yet...)
     * @param pokemon
     */
    this.activeTeamMega = function (pokemon) {
        if (Number.isFinite(pokemon)) {
            this.activeMegaId = pokemon;
        } else{
            this.activeMegaId = pokemon.id;
        }
    }
    /**
     * Calculates the CP of a Pokémon, taking into account whether it is the active Mega Pokémon for the team.
     * @param pokemon
     * @returns {number|number|*|number}
     */
    this.updateIfMega = function (pokemon) {
        if (this.activeMegaId === pokemon.id) {
            return pokemon.cp * 1.33;
        }
        return pokemon.cp;
    }
    /**
     * Calculates the total CP of the team, taking into account the active Mega Pokémon.
     * @param pokemonList
     * @returns {number}
     */
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