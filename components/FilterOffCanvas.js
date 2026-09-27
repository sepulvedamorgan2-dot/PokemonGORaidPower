
const AddOrEditOffCanvas = {
    components: {

    },

    data: function () {
        return {

            filterFast: '',
            filterCharged: '',
            filterCP: 0,
            filterShadow: '',
            filterMega: '',
        }
    },

    props: {
        eachPokemon: {Array, Required: true},
        searchForPokemon: {String, Required: false}
    },




    methods: {
        pokemonSearch() {

            console.log(this.searchForPokemon)
            this.matches = [];

            for (let eachPokemon of this.eachPokemon) {
                // filter name
                console.log(eachPokemon);
                if (
                    eachPokemon.name.toLowerCase().includes(this.searchForPokemon.toLowerCase()) &&
                    (this.filterFast === '' || eachPokemon.fastMoveType === this.filterFast) &&
                    (this.filterCharged === '' || eachPokemon.chargedMoveType1 === this.filterCharged || eachPokemon.chargedMoveType2 === this.filterCharged) &&
                    (this.filterShadow === '' || Boolean(eachPokemon.isShadow) === (this.filterShadow === true || this.filterShadow === 'true')) &&
                    (this.filterMega === '' || Boolean(eachPokemon.canMegaEvolve) === (this.filterMega === true || this.filterMega === 'true')) &&
                    (this.filterCP <= eachPokemon.cp)

                ) {

                    console.log(typeof(eachPokemon.cp));
                    console.log(typeof(this.filterCP))
                    this.matches.push(eachPokemon);


                }

            }
            console.log(this.matches);
            this.$emit('matchedPokemon', this.matches)
        },
    }, watch: {
        searchForPokemon: {
            handler: function () {
                this.pokemonSearch()
            }
        }
    },

    computed: {

    },

    template: `

      <form class="container-fluid d-flex flex-column flex-grow-1 needs-validation pt-3"  v-on:change="pokemonSearch()" >
        <!-- cp button div -->
        <div class="row g-2 btn-group" role="group" aria-label="Pokemon Creature Power Filter Buttons ">
          <div class="col-6">
            <input id="tierOneCPFilter" checked v-model.number="filterCP"
                   :value=0 type="radio" class="btn-check" name="btnradioFilter" required>
            <label class="btn btn-outline-primary w-100" for="tierOneCPFilter">0+CP</label>
          </div>
          <div class="col-6">
            <input id="tierTwoCPFilter"
                   v-model.number="filterCP" :value=1500 type="radio" class="btn-check"
                   name="btnradioFilter">
            <label class="btn btn-outline-primary w-100" for="tierTwoCPFilter">1500+CP</label>
          </div>
          <div class="col-6">
            <input id="tierThreeCPFilter"
                   v-model.number="filterCP" :value=2500 type="radio" class="btn-check"
                   name="btnradioFilter">
            <label class="btn btn-outline-primary w-100" for="tierThreeCPFilter">2500+CP</label>
          </div>
          <div class="col-6">
            <input id="tierFourCPFilter"
                   v-model.number="filterCP" :value=3500 type="radio" class="btn-check"
                   name="btnradioFilter">
            <label class="btn btn-outline-primary w-100" for="tierFourCPFilter">3500+CP</label>
          </div>
        </div>


        <!-- Fast type div -->
        <div class="row g-2 btn-group mt-3" role="group" aria-label="Pokemon Creature Power Buttons">
          <div class="col-12 ">
            <label class="form-label w-100">
              Fast Move Type
              <select class="form-select" id="fastMoveFilter"
                      v-model="filterFast">
                <option value="">None Selected</option>
                <option value="normal">Normal</option>
                <option value="fighting">Fighting</option>
                <option value="flying">Flying</option>
                <option value="poison">Poison</option>
                <option value="ground">Ground</option>
                <option value="rock">Rock</option>
                <option value="bug">Bug</option>
                <option value="ghost">Ghost</option>
                <option value="steel">Steel</option>
                <option value="fire">Fire</option>
                <option value="water">Water</option>
                <option value="grass">Grass</option>
                <option value="electric">Electric</option>
                <option value="psychic">Psychic</option>
                <option value="ice">Ice</option>
                <option value="dragon">Dragon</option>
                <option value="dark">Dark</option>
                <option value="fairy">Fairy</option>
              </select>
            </label>
          </div>
          <!--                            move types end-->
          <!--is shadow/canMega-->


        </div>
        <!-- Charged type div -->
        <div class="row g-2 btn-group" role="group" aria-label="Pokemon Creature Power Buttons">
          <div class="col-12 ">
            <label class="form-label w-100">
              Charged Move Type
              <select class="form-select" id="chargedMoveFilter"
                      v-model="filterCharged">
                <option value="">None Selected</option>
                <option value="normal">Normal</option>
                <option value="fighting">Fighting</option>
                <option value="flying">Flying</option>
                <option value="poison">Poison</option>
                <option value="ground">Ground</option>
                <option value="rock">Rock</option>
                <option value="bug">Bug</option>
                <option value="ghost">Ghost</option>
                <option value="steel">Steel</option>
                <option value="fire">Fire</option>
                <option value="water">Water</option>
                <option value="grass">Grass</option>
                <option value="electric">Electric</option>
                <option value="psychic">Psychic</option>
                <option value="ice">Ice</option>
                <option value="dragon">Dragon</option>
                <option value="dark">Dark</option>
                <option value="fairy">Fairy</option>
              </select>
            </label>
          </div>
          <!--                            move types end-->
          <!--is shadow/canMega-->
          <div class="col-6">
            <label class="form-label w-100">
              Shadow
              <select class="form-select" v-model="filterShadow">
                <option selected value="">All</option>
                <option value=true>Shadow</option>
                <option value=false>Normal</option>

              </select>
            </label>
          </div>
          <div class="col-6">
            <label class="form-label w-100">
              Can Mega
              <select class="form-select" v-model="filterMega">
                <option selected value="">All</option>
                <option value=true>Can Mega</option>
                <option value=false>Cant Mega</option>

              </select>
            </label>
          </div>

        </div>

       



        <!-- done button -->
        <div class="row g-2 mt-auto">
          <div class="col-12">
            <button type="button" data-bs-toggle="offcanvas"
                    class="btn btn-primary mb-2 py-2 fs-4 w-100">Done
            </button>
          </div>
        </div>
      </form>

    `,


}

export default AddOrEditOffCanvas;