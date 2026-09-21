import {createApp} from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'

const app = createApp({
    data: function () {
        return {
            qty: 1,
            pokemon: {
                Id: 1,
                name: "",
                pokemonId: 1,
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

        },
        getClass(type, otherclasses) {
            return ` type${type} ${otherclasses}`;
        }, getClickedObject(clickedPokemonId) {

            this.activeItem = this.pokemonList[clickedPokemonId];
            if (!this.activeItem) {
                console.log("BAD" + clickedPokemonId.pokemonId);
                this.activeItem = {...clickedPokemonId};
                console.log(this.activeItem);
            }
        }, test() {
            console.log(this.pokemonListAPI[0]);
        }, searchAllPokemons(query) {
            console.log(query);
            let resultObjects = [];
            for (let pokemonQueried of this.pokemonListAPI) {
                if (resultObjects.length >= 5) {
                    break;
                }
                if (pokemonQueried.includes(query.toLowerCase()) && pokemonQueried.includes("-mega") === false) {
                    let pokemonObject = {};
                    pokemonObject.name = pokemonQueried;
                    pokemonObject.pokemonId = this.pokemonListAPI.indexOf(pokemonQueried) + 1;
                    resultObjects.push(pokemonObject);
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

            this.pokemon.name = activeItem.name.toLowerCase()
            this.pokemon.pokemonId = activeItem.pokemonId

            for(let i = 0; i < this.qty; i++){
                this.pokemon.Id = this.pokemonList.length
                this.pokemonList.push({...this.pokemon});
            }
            activeItem = this.pokemon
            console.log(activeItem)
        },  clearLocalStorage() {
                localStorage.removeItem('pokemonList');
                this.pokemonList = [];
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