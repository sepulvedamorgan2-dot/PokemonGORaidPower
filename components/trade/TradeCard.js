
import AddPokemonOffCanvas from "../offcanvassequence/AddPokemonOffCanvas.js";
const ComponentName = {
    name: 'ComponentName',

    components: {
        AddPokemonOffCanvas,
    },

    data: function () {
        return {

        }
    },

    props: {
        pokemonList: {Type: Array, required: true},
        pokemonListApi: {Type: Array, required: true},
        wantedList: {Type: Array, required: true},
        haveList: {Type: Array, required: true},
    },

    methods: {
        addHaveList(pokemon) {
            this.haveList.push(pokemon);
        },
        addWantedList(pokemon) {
            this.wantedList.push(pokemon);
        }
    },

    watch: {

    },


    template: `
      <div class="container gx-3">
        <div class="card mt-3">
          <div class="card-body p-2  p-sm-2 p-md-2">

            <div class="row p-2 py-0  mb-1">
              <div class="col-10 ps-2 ps-sm-2">
                <div class="ms-0 ms-sm-1">
                  <h4 class="fs-3 fw-bold pt-2 mb-0 text-capitalize text-start pb-0">
                    Wanted</h4>

                </div>
              </div>
              <div class="col-2 d-flex justify-content-end">

                <div class="p-sm-2 me-sm-1 mt-sm-1 p-2 pb-0 pb-sm-0">
                  <add-pokemon-off-canvas @clicked-object-existing="addWantedList" button="pencil" :pokemon-list-from-api="pokemonListApi" :card-style=4></add-pokemon-off-canvas>
                </div>
              </div>
            </div>
            <div class="row  p-2 py-0 mb-1">
              <div class="row row-cols-5 g-1 g-sm-2 g-md-2 p-sm-1 ">
                <div class="col text-center " v-for="pokemon in wantedList">
                  <img class="img-fluid  rounded-4 w-100"
                       :src="pokemon.image"
                       alt="pokemonImg">
                </div>
              </div>
            </div>
            <div class="row p-2 py-0 border-top mb-1">
              <div class="col-10 ps-2 ps-sm-2">
                <div class="ms-0 ms-sm-1">
                  <h4 class="fs-3 fw-bold pt-2 mb-0 text-capitalize text-start pb-0">
                    For Trade</h4>

                </div>
              </div>
              <div class="col-2 d-flex justify-content-end">

                <div class="p-sm-2 me-sm-1 mt-sm-1 p-2 pb-0 pb-sm-0">
                    <add-pokemon-off-canvas @clicked-object-existing="addHaveList" button="pencil" :pokemon-list-from-api="pokemonList" :card-style=4></add-pokemon-off-canvas>
                </div>
              </div>
            </div>
            <div class="row  p-2 py-0 mb-1">
              <div class="row row-cols-5 g-1 g-sm-2 g-md-2 p-sm-1 ">
                <div class="col text-center " v-for="pokemon in haveList">
                  <img class="img-fluid  rounded-4 w-100"
                       :src="pokemon.image"
                       alt="pokemonImg">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    `,


}

export default ComponentName;