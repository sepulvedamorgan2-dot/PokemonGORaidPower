import {createApp} from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'
import NavbarMain from "./components/NavbarMain.js";
import TradeCard from "./components/trade/TradeCard.js";

const app = createApp({

    components: {
        NavbarMain,
        TradeCard,

    },

    data: function () {

        return {
            pokemonList: [],
            pokemonListAPI: [],
            haveList: [],
            wantList: [],
        }
    },

    methods: {
        async fetchPokemonList() {
            fetch("https://pokemon-go-api.github.io/pokemon-go-api/api/pokedex.json")
                .then((response) => response.json())
                .then((data) => {

                    console.log(data);
                    for (const pokemon of data) {
                        try{
                            if(pokemon.assets.image){
                                console.log(pokemon.assets.image);
                                this.pokemonListAPI.push({name: pokemon.id.toLowerCase(), image: String(pokemon.assets.image)});
                            }
                        } catch{

                        }
                        try{
                            if(pokemon.assets.shinyImage){
                                console.log(pokemon.assets.shinyImage);
                                this.pokemonListAPI.push({name: pokemon.id.toLowerCase(), image: pokemon.assets.shinyImage});
                            }
                        } catch{

                        }



                    }


                })
                .catch((error) => {

                    console.error(error);
                });
        }
        ,


    },
    computed: {},

    mounted: function () {
        this.fetchPokemonList();

        if (localStorage.getItem('pokemonList')) {

            this.pokemonList = JSON.parse(localStorage.getItem('pokemonList'));
        } else {
            this.pokemonList = []
        }
        if (localStorage.getItem('haveList')) {

            this.haveList = JSON.parse(localStorage.getItem('haveList'));
        } else {
            this.haveList = []
        }
        if (localStorage.getItem('wantList')) {

            this.pokemonList = JSON.parse(localStorage.getItem('wantList'));
        } else {
            this.wantList = []
        }


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