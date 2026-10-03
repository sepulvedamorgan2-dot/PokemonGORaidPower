// For subcomponent
// import xxx from './PokemonlistItem.js';

const RaidTeamOffCanvasCard = {
    name: 'RaidTeamOffCanvasCard',

    components: {

    },

    data: function () {
        return {

        }
    },

    props: {
        pokemon: {Array, required: true},
    },

    methods: {

    },

    watch: {

    },



    template: `

      <div>
        <div class="col-3 col-md-2">
          <img class="img-fluid"
               :src="getSpriteLink(returnFullPokemon(pokemon).pokemonId)"
               alt="pokemonImg">
        </div>
        <div class="col-6 col-md-7">
          <div class="p-1 ms-1">
            <p class="fs-5 mb-0 text-capitalize">{{ returnFullPokemon(pokemon).name }}
            </p>

            <div class="d-flex mt-0">
              <p class="me-2 fs-6 mb-0">RP:{{ updateCPIfMega(returnFullPokemon(pokemon)) }}</p>
              <p class="fs-6 mb-0">CP:{{ updateCPIfMega(returnFullPokemon(pokemon)) }}</p>

            </div>

          </div>
        </div>
        <div class="col-3">
          <div class="d-flex justify-content-end me-4 align-items-center h-100">
            <i v-if="returnFullPokemon(pokemon).fastMoveType"
               :class="getClass(returnFullPokemon(pokemon).fastMoveType, \`rounded mb-1 p-1  fs-tinyer bi bi-lightning-charge\`)"></i>
            <i v-if="returnFullPokemon(pokemon).chargedMoveType1"
               :class="getClass(returnFullPokemon(pokemon).chargedMoveType1, \`rounded mb-1 ms-1 fs-tinyer p-1 bi bi-lightning-charge-fill\`)"></i>
            <i v-if="returnFullPokemon(pokemon).chargedMoveType2"
               :class="getClass(returnFullPokemon(pokemon).chargedMoveType2, \`rounded mb-1 ms-1   fs-tinyer p-1 bi bi-lightning-charge-fill\`)"></i>
            <i type="button" data-bs-toggle="collapse"
               :data-bs-target="'#'+returnFullPokemon(pokemon).Id"
               class="bi bi-pencil ms-2 ms-sm-4"></i>
          </div>
        </div>
        <div class="collapse" :data-bs-parent="'#'+pokemonTeam.type" :id="returnFullPokemon(pokemon).Id">
          <div class="card border-0 card-body py-2 pt-0">
            <div class="row g-1">


              <div class="col-12 col-sm-6 " v-if="returnFullPokemon(pokemon).canMegaEvolve">
                <button type="button"
                        class="btn btn-secondary w-100"
                        v-on:click="megaClickedPokemon(returnFullPokemon(pokemon))">Mega
                </button>
              </div>
              <div :class="{'col-12' : !returnFullPokemon(pokemon).canMegaEvolve,
                                                'col-12 col-sm-6' : returnFullPokemon(pokemon).canMegaEvolve}">
                <button type="button"
                        class="btn btn-danger w-100 text-white"
                        v-on:click="removeFromListActive(returnFullPokemon(pokemon))"
                        data-bs-toggle="collapse"

                >Remove
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
        
    `,


}

export default RaidTeamOffCanvasCard;