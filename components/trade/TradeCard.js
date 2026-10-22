
import AddPokemonOffCanvas from "../offcanvassequence/AddPokemonOffCanvas.js";
import PokemonTagsOffCanvas from "../offcanvassequence/PokemonTagsOffCanvas.js";
import CardContainer from "../CardContainer.js";
const ComponentName = {
    name: 'ComponentName',

    components: {
        AddPokemonOffCanvas,
        CardContainer,
        PokemonTagsOffCanvas,
    },

    data: function () {
        return {
            pokeListApiFiltered: [],
            pokeListFiltered: [],
        }
    },

    props: {
        pokemonList: {Type: Array, required: true},
        pokemonListApi: {Type: Array, required: true},
        wantedList: {Type: Array, required: true},
        haveList: {Type: Array, required: true},
        options: {Type: Object},
    },

    methods: {
        addHaveList(pokemon) {
            this.haveList.push(pokemon);
        },
        addWantedList(pokemon) {
            this.wantedList.push(pokemon);
        }, returnNewPokemon(allList, listToExclude, listToUpdate) {
            console.log(this.pokemonListApi[0])
            const onlyNewPokemon = []
            for (const pokemonObject of allList) {
                if (!listToExclude.map(p => p.image).includes(pokemonObject.image)) {
                    onlyNewPokemon.push(pokemonObject);
                }
            }
            if (listToUpdate) {
                this.pokeListApiFiltered = onlyNewPokemon;
            } else{
                this.pokeListFiltered = onlyNewPokemon;
            }

        }, deleteFromList(pokemon, list) {
            if(list){
                const index = this.wantedList.indexOf(pokemon);
                if (index > -1) {
                    this.wantedList.splice(index, 1);
                }
            } else{
                const index = this.haveList.indexOf(pokemon);
                if (index > -1) {
                    this.haveList.splice(index, 1);
                }
            }

        }
    },

    watch: {
        wantedList: {
            handler: function () {
                this.returnNewPokemon(this.pokemonListApi, this.wantedList, true);
            }, deep: true
        },
        haveList: {
            handler: function () {
                this.returnNewPokemon(this.pokemonList, this.haveList, false);
            }, deep: true
        }

    },


    template: `
      <CardContainer card-title="Wanted">
        <template v-slot:card-actions>
          <div class="row p-2 py-0  mb-1">

            <add-pokemon-off-canvas @clicked-object-existing="addWantedList"
                                    v-on:click="returnNewPokemon(pokemonListApi, wantedList, true)"
                                    button="pencil" :pokemon-list-from-api="pokeListApiFiltered"
                                    :card-style=4></add-pokemon-off-canvas>
          </div>

        </template>
        <template v-slot:card-body>

          <div class="ms-1">
            <h4 v-for="option in options" :class="{
                ['bg-'+option.tagClass]: option.tagClass !== 'd-none',
                'd-none': option.tagClass === 'd-none',
            
            }" class="col-auto badge me-1  ">{{ option.text }}</h4>
          </div>
          <div class="row  p-2 py-0 mb-1">
            <div class="row row-cols-md-1  row-cols-4 g-1 g-sm-2 g-md-2 p-sm-1 ">
              <div class="col col-md-2" v-for="pokemon in wantedList">
                <div class="text-center border rounded-4 ">
                  <div class="position-relative">
                  <img :class="{'img-fluid w-100': true,
                  'lucky': pokemon.tags['guaranteed lucky'] === 'Lucky'}"
                       :src="pokemon.image"
                       alt="pokemonImg">
                    <p v-if="pokemon.tradeQuantity > 1"  class="corner-tl-text"> {{pokemon.tradeQuantity}}x</p>
                  <img v-if="pokemon.image.includes('.s.')" src="/media/images/shiny.png" alt="Shiny"
                       class="corner-tl-img m-2">
                  <pokemon-tags-off-canvas :pokemon="pokemon"></pokemon-tags-off-canvas>
                  </div>
                  <div>
                    <p style="font-size: 14px;" v-for="tag in pokemon.tags" v-show="tag !== 'None' && tag !=='Lucky'" class="mb-0">
                      {{ tag }}
                    </p>
                  </div>
                </div>

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
                <add-pokemon-off-canvas v-on:click="returnNewPokemon(pokemonList, haveList, false)"
                                        @clicked-object-existing="addHaveList" button="pencil"
                                        :pokemon-list-from-api="pokeListFiltered"
                                        :card-style=4></add-pokemon-off-canvas>
              </div>
            </div>
          </div>
          <div class="row  p-2 py-0 mb-1">
            <div class="row row-cols-md-1  row-cols-4 g-1 g-sm-2 g-md-2 p-sm-1 ">
              <div class="col col-md-2" v-for="pokemon in haveList">
                <div class="text-center border rounded-4 ">
                  <div class="position-relative">
                    <img :class="{'img-fluid w-100': true,
                  'lucky': pokemon.tags['guaranteed lucky'] === 'Lucky'}"
                         :src="pokemon.image"
                         alt="pokemonImg">
                    <p v-if="pokemon.tradeQuantity > 1"  class="corner-tl-text"> {{pokemon.tradeQuantity}}x</p>
                    <img v-if="pokemon.image.includes('.s.')" src="/media/images/shiny.png" alt="Shiny"
                         class="corner-tl-img m-2">
                    <pokemon-tags-off-canvas :pokemon="pokemon"></pokemon-tags-off-canvas>
                  </div>
                  <div>
                    <p style="font-size: 14px;" v-for="tag in pokemon.tags" v-show="tag !== 'None' && tag !=='Lucky'" class="mb-0">
                      {{ tag }}
                    </p>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </template>
      </CardContainer>

    `,


}

export default ComponentName;