import {createApp} from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'
import PokelistContainer from './components/PokelistContainer.js';
import OffCanvasContainer from './components/OffcanvasContainer.js';
import DetailsOffCanvas from './components/DetailsOffCanvas.js';
import AddEditOffCanvas from "./components/AddEditOffCanvas.js";
import NavbarMain from "./components/NavbarMain.js";
import FilterOffCanvas from "./components/FilterOffCanvas.js";
import SearchBarContainer from "./components/SearchBarContainer.js";
import HorizontalCardContainer from "./components/HorizontalCardContainer.js";
import AddPokemonOffCanvas from "./components/AddPokemonOffCanvas.js";
const app = createApp({

    components: {
        PokelistContainer,
        OffCanvasContainer,
        DetailsOffCanvas,
        AddEditOffCanvas,
        NavbarMain,
        FilterOffCanvas,
        SearchBarContainer,
        HorizontalCardContainer,
        AddPokemonOffCanvas

    },

    data: function () {

        return {

            matches: [],
            searchForPokemon: '',
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

        updateMatches(newList){

            this.matches = newList;
        },

        getSpriteLink(pokemonID) {

            if (typeof pokemonID === "number") {
                return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonID}.png`;
            }

        }
        ,

        getClickedObject(clickedPokemonId) {
            console.log(clickedPokemonId);
            this.activeItem = this.pokemonList.find(p => p.Id === clickedPokemonId.Id);
            if (!this.activeItem) {
                console.log("BAD" + clickedPokemonId.pokemonId);
                this.activeItem = {...clickedPokemonId};
                console.log(this.activeItem);
            }
        }
        ,

        searchAllPokemons(query) {
            console.log(query);
            let resultObjects = [];
            for (let pokemonQueried of this.pokemonListAPI) {
                if (resultObjects.length >= 5) {
                    console.log("pokemonQueried: ", resultObjects.length);
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

        }
        ,
        async fetchPokemonList() {
            fetch("https://pokeapi.co/api/v2/pokemon?limit=1331")
                .then((response) => response.json())
                .then((data) => {

                    console.log(data);
                    for (const pokemon of data.results) {
                        this.pokemonListAPI.push(pokemon.name);

                    }

                })
                .catch((error) => {

                    console.error(error);
                });
        }
        ,
        addPokemon(activeItem) {


            this.pokemon = activeItem;

            for (let i = 0; i < this.qty; i++) {
                this.pokemon.Id = this.getNextPokemonId()
                this.pokemonList.push({...this.pokemon});
                this.activeItem = this.pokemon
            }
            this.matches = this.pokemonList
            // BAD
            $('#pokemonAddedSuccess').modal('show')

        }
        ,


        deletePokemon() {
            $('#addPokemonDetailsOffcanvas').offcanvas('hide')
            console.log(this.activeItem);
            this.pokemonList.splice(this.pokemonList.indexOf(this.activeItem), 1);
        }
        ,
        getNextPokemonId() {
            try {
                return this.pokemonList.at(-1).Id + 1;
            } catch (error) {
                return 0;
            }

        }, updateQty(newQuantity){
            this.qty = newQuantity;
        }

    },
    computed: {},

    mounted: function () {
        this.fetchPokemonList();

        if (localStorage.getItem('pokemonList')) {

            this.pokemonList = JSON.parse(localStorage.getItem('pokemonList'));
        } else {
            this.pokemonList = []
        }
        this.matches = {...this.pokemonList};


    }, deep: true,

    watch: {
        pokemonList: {
            handler: function () {

                if (this.pokemonList) {
                    localStorage.setItem('pokemonList', JSON.stringify(this.pokemonList))
                } else {
                    this.pokemonList = []
                }



            }, deep: true

        }


    }

});
export default app;