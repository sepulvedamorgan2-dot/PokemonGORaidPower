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
        <div v-if="true" class="px-3">
          <div class="mt-3">
            <h5 >Background</h5>
            <select style="width: 200px" type="text"  class="form-control" v-model="pokemon.tradeDetails.tradeBackground">
              <option :value="{ shorthandName: '', color: 'normal' }">None</option>

              <!-- Special Event / In-Game Backgrounds -->
              <optgroup label="Special Backgrounds">
                <option :value="{ shorthandName: 'Beast Ball', color: 'dragon' }">Beast Ball / Wormhole</option>
                <option :value="{ shorthandName: 'Black Version', color: 'dark' }">Black Version</option>
                <option :value="{ shorthandName: 'White Version', color: 'fairy' }">White Version</option>
                <option :value="{ shorthandName: 'B&W Fusion', color: 'dragon' }">Black and White Fusion</option>
                <option :value="{ shorthandName: 'GO Fest \\'24 Radiance', color: 'psychic' }">GO Fest 2024: Radiance
                </option>
                <option :value="{ shorthandName: 'GO Fest \\'24 Umbra', color: 'ghost' }">GO Fest 2024: Umbra</option>
                <option :value="{ shorthandName: 'GO Fest \\'24 Sun', color: 'fire' }">GO Fest 2024: Wormhole Sun
                </option>
                <option :value="{ shorthandName: 'GO Fest \\'24 Moon', color: 'psychic' }">GO Fest 2024: Wormhole Moon
                </option>
                <option :value="{ shorthandName: 'Sinnoh Space-Time', color: 'dragon' }">GO Tour Sinnoh: Space-Time
                </option>
                <option :value="{ shorthandName: 'Team Valor', color: 'fire' }">Team Valor</option>
                <option :value="{ shorthandName: 'Team Mystic', color: 'water' }">Team Mystic</option>
                <option :value="{ shorthandName: 'Team Instinct', color: 'electric' }">Team Instinct</option>
                <option :value="{ shorthandName: 'Enigma', color: 'psychic' }">Enigma</option>
                <option :value="{ shorthandName: 'Wild Area', color: 'ground' }">GO Wild Area</option>
                <option :value="{ shorthandName: 'Dynamax / G-Max', color: 'fighting' }">Dynamax / Gigantamax</option>
              </optgroup>

              <!-- Major Location Cards (In-Person Events) -->
              <optgroup label="Location Backgrounds">
                <option :value="{ shorthandName: 'London \\'23', color: 'steel' }">GO Fest 2023: London</option>
                <option :value="{ shorthandName: 'Osaka \\'23', color: 'water' }">GO Fest 2023: Osaka</option>
                <option :value="{ shorthandName: 'NYC \\'23', color: 'rock' }">GO Fest 2023: New York City</option>
                <option :value="{ shorthandName: 'LA Tour \\'24', color: 'flying' }">GO Tour 2024: Los Angeles</option>
                <option :value="{ shorthandName: 'Sendai \\'24', color: 'grass' }">GO Fest 2024: Sendai</option>
                <option :value="{ shorthandName: 'Madrid \\'24', color: 'fire' }">GO Fest 2024: Madrid</option>
                <option :value="{ shorthandName: 'NYC \\'24', color: 'rock' }">GO Fest 2024: New York City</option>
                <option :value="{ shorthandName: 'Incheon \\'24', color: 'electric' }">GO Fest 2024: Incheon</option>
                <option :value="{ shorthandName: 'LA Tour \\'25', color: 'flying' }">GO Tour 2025: Los Angeles</option>
                <option :value="{ shorthandName: 'New Taipei \\'25', color: 'water' }">GO Tour 2025: New Taipei City
                </option>
                <option :value="{ shorthandName: 'Ancients \\'25', color: 'rock' }">GO Fest 2025: Ancients Recovered
                </option>
                <option :value="{ shorthandName: 'Safari: Barcelona', color: 'grass' }">City Safari: Barcelona</option>
                <option :value="{ shorthandName: 'Safari: Seoul', color: 'psychic' }">City Safari: Seoul</option>
                <option :value="{ shorthandName: 'Safari: Mexico City', color: 'fire' }">City Safari: Mexico City
                </option>
                <option :value="{ shorthandName: 'Safari: Tainan', color: 'steel' }">City Safari: Tainan</option>
                <option :value="{ shorthandName: 'Safari: Jakarta', color: 'poison' }">City Safari: Jakarta</option>
                <option :value="{ shorthandName: 'Safari: Incheon', color: 'electric' }">City Safari: Incheon</option>
                <option :value="{ shorthandName: 'Safari: São Paulo', color: 'grass' }">City Safari: São Paulo</option>
                <option :value="{ shorthandName: 'Safari: Hong Kong', color: 'dark' }">City Safari: Hong Kong</option>
              </optgroup>   
            </select>
          </div>
        </div>
        <div v-if="haveQuantity" class="px-3">
          <div class="mt-3">
            <h5 >Quantity</h5>
            <input style="width: 100px" type="number" min="1" max="100" class="form-control" v-model="pokemon.tradeDetails.tradeQuantity">
          </div>
        </div>
        <!--                delete button-->
        <div class="px-3">
          <div v-for="tag in pokemon.tradeDetails.tags" :key="tag.text">
            <div class="mt-2" v-if="(tag.Options).length > 1" >
              <h5 >{{ tag.text }}</h5>
            </div>
            <div class="d-flex g-1 " v-if="(tag.Options).length > 1" >
              <div class="col-auto me-1" v-for="option in tag.Options" :key="option">

                <input v-model="tag.selected" :value="option" type="radio" class="btn-check "
                       :name="pokemon.image + tag.text"
                       :id="pokemon.image + tag.text+option" autocomplete="off"
                       :checked="tag.selected === option">
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