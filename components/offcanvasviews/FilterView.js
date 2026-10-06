let counter = 1
const FilterView = {
    name: "FilterView",
    components: {

    },

    data: function () {
        return {
            id: counter++,
            filter: {
                filterFast: '',
                filterCharged: '',
                filterCP: 0,
                filterShadow: '',
                filterMega: '',
            }
        }
    },

    props: {

    }, mounted() {

        this.emitObject()
    },

    methods: {
        emitObject () {

            this.$emit('filterObject', this.filter)
        }


    }, watch: {
        filter: {
            handler: function () {
                console.log('triggered')
                this.emitObject()
            }, deep: true
        }
    },

    computed: {

    },

    template: `
          <form :ref="id" class="container-fluid d-flex flex-column flex-grow-1 needs-validation pt-3" v-on:change="this.emitObject()">
            <!-- cp button div -->
            <div class="row g-2 btn-group" role="group" aria-label="Pokemon Creature Power Filter Buttons ">
              <div class="col-6">
                <input :id="'tierOneCPFilter' + id" checked v-model.number="filter.filterCP"
                       :value=0 type="radio" class="btn-check" :name="'btnradioFilter' + id" required>
                <label class="btn btn-outline-primary w-100" :for="'tierOneCPFilter' + id">0+CP</label>
              </div>
              <div class="col-6">
                <input :id="'tierTwoCPFilter' + id"
                       v-model.number="filter.filterCP" :value=1500 type="radio" class="btn-check"
                       :name="'btnradioFilter' + id">
                <label class="btn btn-outline-primary w-100" :for="'tierTwoCPFilter' + id">1500+CP</label>
              </div>
              <div class="col-6">
                <input :id="'tierThreeCPFilter' + id"
                       v-model.number="filter.filterCP" :value=2500 type="radio" class="btn-check"
                       :name="'btnradioFilter' + id">
                <label class="btn btn-outline-primary w-100" :for="'tierThreeCPFilter' + id">2500+CP</label>
              </div>
              <div class="col-6">
                <input :id="'tierFourCPFilter' + id"
                       v-model.number="filter.filterCP" :value=3500 type="radio" class="btn-check"
                       :name="'btnradioFilter' + id">
                <label class="btn btn-outline-primary w-100" :for="'tierFourCPFilter' + id">3500+CP</label>
              </div>
            </div>


            <!-- Fast type div -->
            <div class="row g-2 btn-group mt-3" role="group" aria-label="Pokemon Creature Power Buttons">
              <div class="col-12 ">
                <label class="form-label w-100">
                  Fast Move Type
                  <select class="form-select" id="fastMoveFilter"
                          v-model="filter.filterFast">
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
                          v-model="filter.filterCharged">
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
                  <select class="form-select" v-model="filter.filterShadow">
                    <option selected value="">All</option>
                    <option value=true>Shadow</option>
                    <option value=false>Normal</option>

                  </select>
                </label>
              </div>
              <div class="col-6">
                <label class="form-label w-100">
                  Can Mega
                  <select class="form-select" v-model="filter.filterMega">
                    <option selected value="">All</option>
                    <option value=true>Can Mega</option>
                    <option value=false>Cant Mega</option>

                  </select>
                </label>
              </div>

            </div>


            <!-- done button -->
    <!--            <div class="row g-2 mt-auto">-->
    <!--              <div class="col-12">-->
    <!--                <button type="button" v-on:click="$emit('swapView')"-->
    <!--                        class="btn btn-primary mb-2 py-2 fs-4 w-100">Done-->
    <!--                </button>-->
    <!--              </div>-->
    <!--            </div>-->
          </form>
        
    `,


}

export default FilterView;