import {createApp} from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'
import NavbarMain from "./components/NavbarMain.js";
import RaidTeamCardContainer from "./components/containers/RaidTeamCardContainer.js";
const app = createApp({
    components: {
        NavbarMain,
        RaidTeamCardContainer,
    },
    data: function () {

        return {

            qty: 1,
            types: ['normal', 'fire', 'water', 'electric', 'grass', 'ice', 'fighting', 'poison', 'ground', 'flying', 'psychic', 'bug', 'rock', 'ghost', 'dragon', 'dark', 'steel', 'fairy'],


            pokemonTeam: {
                id: 1,
                type: "",
                activeTeam: [],
                backupPokemon: [],
                activeMegaId: 0

            }, pokemonTeamList: [
                {
                    id: 0,
                    type: "fire",
                    activeMegaId: 3,
                    activeTeam: [
                        0, 1, 2, 3,
                    ],
                    backupPokemon: []

                },
                {
                    id: 1,
                    type: "water",
                    activeMegaId: 2,
                    activeTeam: [
                        0, 1, 2, 3, 4
                    ],
                    backupPokemon: []

                },
            ],
            pokemonList: [],


            pokemonListAPI: [],


        }
    },

    methods: {




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

            this.pokemon.name = activeItem.name.toLowerCase()
            this.pokemon.pokemonId = activeItem.pokemonId

            for (let i = 0; i < this.qty; i++) {
                this.pokemon.Id = this.getNextPokemonId()
                this.pokemonList.push({...this.pokemon});
                this.activeItem = this.pokemon
            }

            $('#pokemonAddedSuccess').modal('show')
            console.log(activeItem)
        }
        ,



        deletePokemon() {
            $('#addPokemonDetailsOffcanvas').offcanvas('hide')
            this.pokemonList.splice(this.pokemonList.indexOf(this.activeItem), 1);
        }
        ,
        getNextPokemonId() {
            try {
                return this.pokemonList.at(-1).Id + 1;
            } catch (error) {
                return 0;
            }

        },
    },
        computed: {},

        mounted: function () {

            this.fetchPokemonList();
            if (localStorage.getItem('pokemonList')) {

                this.pokemonList = JSON.parse(localStorage.getItem('pokemonList'));
            } else {
                this.pokemonList = [{
                    Id: 1,
                    name: "bidoof",
                    pokemonId: 399,
                    cp: 2800,
                    isShadow: false,
                    canMegaEvolve: false,
                    fastMoveType: "electric",
                    chargedMoveType1: "normal",
                    chargedMoveType2: "normal",


                },{
                    Id: 2,
                    name: "bulbasaur",
                    pokemonId: 1,
                    cp: 4000,
                    isShadow: true,
                    canMegaEvolve: false,
                    fastMoveType: "grass",
                    chargedMoveType1: "grass",
                    chargedMoveType2: "poison",


                },{
                    Id: 3,
                    name: "bulbasaur",
                    pokemonId: 1,
                    cp: 3000,
                    isShadow: true,
                    canMegaEvolve: false,
                    fastMoveType: "electric",
                    chargedMoveType1: "grass",
                    chargedMoveType2: "poison",


                },{
                    Id: 4,
                    name: "bulbasaur",
                    pokemonId: 1,
                    cp: 4000,
                    isShadow: true,
                    canMegaEvolve: false,
                    fastMoveType: "steel",
                    chargedMoveType1: "grass",
                    chargedMoveType2: "poison",


                }]
                localStorage.setItem('pokemonList', JSON.stringify(this.pokemonList))
            }

            if (localStorage.getItem('pokemonTeamList')) {

                this.pokemonTeamList = JSON.parse(localStorage.getItem('pokemonTeamList'));
                // Notes because i googled if there was a better way than looping through 3 arrays to find what does/doesnt exist and this is new-ish to me
                // All set items must be unique
                // .map returns a new array with only the id's that gets turned into a set

                const pokemonListIds = new Set(this.pokemonList.map(p => p.Id));

                for(const team of this.pokemonTeamList){
                    // filter loops throguh all id's and if pokemonListIds.has returns false, that id is removed from the list
                    team.activeTeam = team.activeTeam.filter(id => pokemonListIds.has(id));
                }

            } else {
                this.pokemonTeamList = [];
                for (const type of this.types) {
                    console.log(type);
                    this.pokemonTeamList.push({
                        id: this.pokemonTeamList.length,
                        type: type,
                        activeTeam: [1,2],
                        backupPokemon: []
                    });

                }





                localStorage.setItem('pokemonTeamList', JSON.stringify(this.pokemonTeamList))

            }


        }, deep: true,

        watch: {
            pokemonTeamList: {
                handler: function () {

                    if (this.pokemonTeamList) {
                        localStorage.setItem('pokemonTeamList', JSON.stringify(this.pokemonTeamList))
                    } else {
                        this.pokemonTeamList = []
                    }

                }, deep: true

            }

        },


    });
export default app;