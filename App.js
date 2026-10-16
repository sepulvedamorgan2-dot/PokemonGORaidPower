import {createApp} from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'
import PokelistContainer from './components/containers/PokelistContainer.js';
import OffCanvasContainer from './components/containers/OffCanvasContainer.js';
import NavbarMain from "./components/NavbarMain.js";
import FilterOffCanvas from "./components/offcanvassequence/FilterOffCanvas.js";
import SearchBarContainer from "./components/molecules/SearchBarContainer.js";
import AddPokemonOffCanvas from "./components/offcanvassequence/AddPokemonOffCanvas.js";
import {fetchPokemonList} from "./Helpers.js";

const app = createApp({

    components: {
        PokelistContainer,
        OffCanvasContainer,


        NavbarMain,
        FilterOffCanvas,
        SearchBarContainer,


        AddPokemonOffCanvas,

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
                image: '',
                maxCp: 0,


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






        fetchPokemonList,
        addPokemon(activeItem) {


            this.pokemon = activeItem[0];
            this.qty = activeItem[1];

            for (let i = 0; i < this.qty; i++) {
                this.pokemon.Id = this.getNextPokemonId()
                this.pokemonList.unshift({...this.pokemon});
                this.activeItem = this.pokemon
            }
            this.matches = this.pokemonList
            // BAD


        }
        ,


        deletePokemon(pokemonToDelete) {

            console.log(pokemonToDelete);
            this.pokemonList.splice(this.pokemonList.indexOf(pokemonToDelete), 1);
            this.updateMatches(this.pokemonList);
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

    mounted: async function () {
        this.pokemonListAPI = await this.fetchPokemonList();

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