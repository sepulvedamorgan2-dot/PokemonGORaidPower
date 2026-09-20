import {createApp} from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'

const app = createApp({
    data: function () {
        return {
            pokemon: {
                id: 1,
                name: "",
                pokemonID: 1,
                cp: 1000,
                isShadow: false,
                canMegaEvolve: false,
                fastMoveType: "",
                chargedMoveType1: "",
                chargedMoveType2: "",

            },
            pokemonList: [{
                Id: 0,
                name: "pikachu",
                pokemonID: 25,
                cp: 1000,
                isShadow: false,
                canMegaEvolve: false,
                fastMoveType: "electric",
                chargedMoveType1: "electric",
                chargedMoveType2: "fighting",
            }, {
                Id: 1,
                name: "bidoof",
                pokemonID: 399,
                cp: 1000,
                isShadow: false,
                canMegaEvolve: false,
                fastMoveType: "normal",
                chargedMoveType1: "normal",
                chargedMoveType2: "normal"
            }], activeItem: {},

        }
    },
    methods: {
        pokemonFullList() {
            return this.pokemonList;
        },
        getSpriteLink(pokemonID) {
            console.log(pokemonID);
            return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonID}.png`;
        }, getClass(type, otherclasses) {
            return ` type${type} ${otherclasses}`;
        }, offCanvasPokemonID(clickedPokemon) {

           this.activeItem = clickedPokemon;
            console.log();
        }
    },
    computed: {

    },

    mounted: function () {

    },

    watch: {


    },


});
export default app;