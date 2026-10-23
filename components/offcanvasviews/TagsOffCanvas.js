// For subcomponent
// import xxx from './PokemonlistItem.js';

import PokemonImageName from "../PokemonImageName.js";


const DetailsOffCanvas = {
    components: {
        PokemonImageName,


    },

    data: function () {
        return {
            tag: {
                text: 'Size',
                Options: ['XXL', 'None', 'XXS'],
                selected: 'XXL'

            },
            defaultTags: [
                {
                    text: 'Size',
                    Options: ['XXS', 'None', 'XXL'],
                    selected: 'None'
                },
                {
                    text: 'Lucky',
                    Options: ['Lucky', 'None'],
                    selected: 'None'
                },
                {
                    text: 'Level',
                    Options: ['None', 'Lvl 1', 'Lvl 40', 'Lvl 50'],
                    selected: 'None'
                },
                {
                    text: 'Special Move',
                    Options: ['None',],
                    selected: 'None'
                },
                {
                    text: 'Priority',
                    Options: ['None', 'Priority'],
                    selected: 'None'
                },

            ]
        }
    },

    props: {
        pokemon: {type: Object, required: true},
        haveQuantity: {type: Boolean, default: true},
    },

    methods: {
        getClass(type, otherClasses) {
            return ` type${type} ${otherClasses}`;
        },
        specialMoves() {

        }


    },
    mounted() {

        const moves = ['None']
        const movesArray = Object.values(this.pokemon.pokemonDetails.specialChargedMoves);
        movesArray.push = Object.values(this.pokemon.pokemonDetails.specialFastMoves);
        movesArray.forEach(move => {
            moves.push(move.names.English);
        });

        this.pokemon.tradeDetails.tags[3].Options = moves


    },
    computed: {},

    template: `

<!--      <pokemon-image-name :active-item="pokemon"></pokemon-image-name>-->
      <div class="flex-grow-1 d-flex flex-column">
        <div v-if="haveQuantity" class="px-3">
          <div class="mt-3">
            <h5 >Quantity</h5>
            <input style="width: 100px" type="number" min="1" max="100" class="form-control" v-model="pokemon.tradeDetails.tradeQuantity">
          </div>
        </div>
        <!--                delete button-->
        <div class="px-3">
          <div v-for="tag in pokemon.tradeDetails.tags" :key="tag.text">
            <div class="mt-2">
              <h5 >{{ tag.text }}</h5>
            </div>
            <div class="d-flex g-1 ">
              <div class="col-auto me-1" v-for="option in tag.Options" :key="option">

                <input v-model="tag.selected" :value="option" type="radio" class="btn-check "
                       :name="pokemon.image + tag.text"
                       :id="pokemon.image + tag.text+option" autocomplete="off"
                       :checked="pokemon.tradeDetails.tags[tag.text.toLowerCase()] === option">
                <label class="btn rounded-pill btn-outline-success "
                       :for="pokemon.image + tag.text+option">{{ option }}</label>


              </div>
            </div>
          </div>
        </div>
        


        <!-- end -->
      </div>

    `,


}

export default DetailsOffCanvas;