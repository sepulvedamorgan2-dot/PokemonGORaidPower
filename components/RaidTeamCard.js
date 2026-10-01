// For subcomponent
// import xxx from './PokemonlistItem.js';
import RaidTeamOffCanvas from "./RaidTeamOffCanvas.js";
const RaidTeamCard = {
    name: 'RaidTeamCard',

    components: {
        RaidTeamOffCanvas,
    },

    data: function () {
        return {

        }
    },

    props: {
        pokemonTeam: {Array, required: true},
        pokemonList: {Array, required: true},
    },

    methods: {
        getSpriteLink(pokemonID) {

            if (typeof pokemonID === "number") {
                return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonID}.png`;
            }

        }
        ,returnFullPokemon(pokemonIdOnly) {
            return   {...this.pokemonList.find(p => p.Id === pokemonIdOnly)}
        }
        ,teamCP(pokemonTeam) {
            let counter = 0;

            for (const pokeInTeam of pokemonTeam.activeTeam) {
                if (pokemonTeam.activeMegaId === pokeInTeam) {
                    counter += this.returnFullPokemon(pokeInTeam).cp * 1.33;
                }
                counter += this.returnFullPokemon(pokeInTeam).cp;
            }
            return counter;
        },teamForRaid(pokemonTeam) {
            let counter = 0;
            for (const pokeInTeam of pokemonTeam.activeTeam) {
                counter += Number(this.returnFullPokemon(pokeInTeam).cp);
            }
            if (!counter) {
                return 0;
            }
            return parseInt(45000 / counter);
        },
    },

    watch: {

    },



    template: `

      <div class="card">

        <!-- imgs -->
        <div class="card-body p-2  p-sm-2 p-md-2">

          <div class="row p-2 py-0 mb-1">
            <div class="col-10 ps-2 ps-sm-2">
              <div class="ms-0 ms-sm-1">
                <h4 class="fs-2 fw-bold pt-2 mb-0 text-capitalize text-start pb-0">
                  {{pokemonTeam.type}}</h4>

              </div>
            </div>

            <div class="col-2 d-flex justify-content-end">

              <div class="p-sm-2 me-sm-1 mt-sm-1 p-2 pb-0 pb-sm-0">
                <raid-team-off-canvas :pokemon-team="pokemonTeam" :pokemon-list="pokemonList"></raid-team-off-canvas>
              </div>
            </div>
            <div class="col-12 ps-2 pe-0">
              <div class="ms-sm-1">
                <span class="fw-semibold fs-5 text-dark mb-0">{{teamCP(pokemonTeam)}}</span>
                <span class="text-uppercase fw-bold text-tertiary ms-1 fs-6 mt-2 mb-1">RP</span>
                <span class="fw-semibold fs-5 text-dark mb-0 ms-2">{{teamForRaid(pokemonTeam)}}</span>
                <span class="text-uppercase fw-bold text-secondary fs-tiny ms-1  mt-2 mb-1">Players per 5* Raid</span>
              </div>
            </div>
          </div>


          <div class="row g-2 g-sm-2 g-md-2 p-sm-1 ">
            <div class="col-4 text-center " v-for="pokemon in pokemonTeam.activeTeam">
              <img class="img-fluid border rounded w-100"
                   :src="getSpriteLink(returnFullPokemon(pokemon).pokemonId)"
                   alt="pokemonImg">
            </div>


          </div>
        </div>
        
      </div>
    `,


}

export default RaidTeamCard;