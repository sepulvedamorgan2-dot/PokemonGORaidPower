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
                id: 0,
                name: "pikachu",
                pokemonID: 25,
                cp: 1000,
                isShadow: false,
                canMegaEvolve: false,
                fastMoveType: "electric",
                chargedMoveType1: "electric",
                chargedMoveType2: "fighting",
            }, {
                id: 2,
                name: "bidoof",
                pokemonID: 399,
                cp: 2000,
                isShadow: false,
                canMegaEvolve: false,
                fastMoveType: "normal",
                chargedMoveType1: "normal",
                chargedMoveType2: "normal"
            }], activeItem: {},
            pokemonListAPI: [],
            searchResults: [],


        }
    },
    methods: {
        pokemonFullList() {
            return this.pokemonList;
        },
        getSpriteLink(pokemonID) {
            console.log(pokemonID);
            if (typeof pokemonID === "number") {
                return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonID}.png`;
            }

        }, getSpriteLinkAPI(name) {

            let spriteID = this.pokemonListAPI.indexOf(name);
            console.log(spriteID);
            return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${spriteID + 1}.png`;
        }, getAPIId(name) {

            let spriteID = this.pokemonListAPI.indexOf(name);

            return `${spriteID}`
        },
        getClass(type, otherclasses) {
            return ` type${type} ${otherclasses}`;
        }, offCanvasPokemonID(clickedPokemon) {

            this.activeItem = clickedPokemon;
            console.log(this.activeItem);
        }, test() {
            console.log(this.pokemonListAPI[0]);
        }, searchAllPokemons(query) {
            console.log(query);
            let resultObjects = [];
            for (let pokemon of this.pokemonListAPI) {
                if (resultObjects.length >= 5) {
                    break;
                }
                if (pokemon.includes(query.toLowerCase()) && pokemon.includes("-mega") === false) {

                    resultObjects.push(pokemon);
                }
            }

            this.searchResults = resultObjects;
            console.log(this.searchResults);

        }, async fetchPokemonList() {
            fetch("https://pokeapi.co/api/v2/pokemon?limit=1331")
                .then((response) => response.json())
                .then((data) => {
                    pokemonNameList = [];
                    console.log(data);
                    for (const pokemon of data.results) {
                        this.pokemonListAPI.push(pokemon.name);

                    }

                })
                .catch((error) => {

                    console.error(error);
                });
        }, addPokemon(activeItem) {

            this.pokemon.name = activeItem.toLowerCase()
            this.pokemon.pokemonID = Number(this.getAPIId(activeItem)) + 1
            this.pokemon.id = Number(this.getAPIId(activeItem)) + 1

            this.pokemonList.push(this.pokemon);
            activeItem = this.pokemon
            console.log(activeItem)
        }
    },
    computed: {},

    mounted: function () {
        this.fetchPokemonList();
        console.log(localStorage.getItem('pokemonList'))
        if(localStorage.getItem('pokemonList')){
            this.pokemonList = JSON.parse(localStorage.getItem('pokemonList'));
        } else{
            this.pokemonList = []
        }

    }, deep: true,

    watch: {
        pokemonList : {
            handler: function () {
                if(this.pokemonList){
                    localStorage.setItem('pokemonList', JSON.stringify(this.pokemonList))
                } else{
                    this.pokemonList = []
                }

            }, deep: true

        }

    },


});
export default app;