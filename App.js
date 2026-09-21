import {createApp} from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'

const app = createApp({
    data: function () {
        return {
            pokemon: {
                Id: 1,
                name: "",
                pokemonID: 1,
                cp: 1000,
                isShadow: false,
                canMegaEvolve: false,
                fastMoveType: "",
                chargedMoveType1: "",
                chargedMoveType2: "",

            },
            pokemonList: [],
            activeItem: {},
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
            this.pokemon.pokemonId = Number(this.getAPIId(activeItem)) + 1
            this.pokemon.Id = this.pokemonList.length

            this.pokemonList.push({...this.pokemon});
            activeItem = this.pokemon
            console.log(activeItem)
        },  clearLocalStorage() {
                localStorage.removeItem('pokemonList');
        }, oddOrEven(id){
            console.log(id);
            if(id % 2 == 0){
                return true;
            } else{
                return false;
            }
        },
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