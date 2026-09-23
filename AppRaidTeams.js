import {createApp} from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'

const app = createApp({
    data: function () {
        return {
            searchForPokemon: '',
            filterFast: '',
            filterCharged: '',
            filterCP: 0,
            filterShadow: '',
            filterMega: '',
            matches: [],
            qty: 1,
            types: ['normal', 'fire', 'water', 'electric', 'grass', 'ice', 'fighting', 'poison', 'ground', 'flying', 'psychic', 'bug', 'rock', 'ghost', 'dragon', 'dark', 'steel', 'fairy'],

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
                        0,1,2,3,
                    ],
                    backupPokemon: []

                },
                {
                    id: 1,
                    type: "water",
                    activeMegaId: 2,
                    activeTeam: [
                        0,1,2,3,4
                    ],
                    backupPokemon: []

                },
            ],
            pokemonList: [],
            activeItem: {},
            activeClickedTeam: {},
            pokemonListAPI: [],
            searchResults: [],


        }
    },

    methods: {


        teamCP(teamCPMeasure){
            let counter = 0;
            console.log(teamCPMeasure.activeMegaId);
            for(const pokeInTeam of teamCPMeasure.activeTeam){
                if (teamCPMeasure.activeMegaId === pokeInTeam){
                    counter += this.returnFullPokemon(pokeInTeam).cp * 1.33;
                }
                counter += this.returnFullPokemon(pokeInTeam).cp;
            }
            return counter;
        }, teamForRaid(teamForRaidMeasure){
            let counter = 0;
            for(const pokeInTeam of teamForRaidMeasure.activeTeam){
                counter += this.returnFullPokemon(pokeInTeam).cp;
            }

            return parseInt(45000/counter);
        }, removeFromList(pokemonToRemove) {
            this.activeClickedTeam.activeTeam.splice(this.activeClickedTeam.activeTeam.indexOf(pokemonToRemove), 1);

        }, megaClickedPokemon(pokemonToMega){
            console.log(pokemonToMega.Id)
            this.activeClickedTeam.activeMegaId = pokemonToMega.Id;

            console.log(this.pokemonTeamList[0].activeMegaId)
        },
        getSpriteLink(pokemonID) {

            if (typeof pokemonID === "number") {
                return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonID}.png`;
            } else{

                return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonID.pokemonId}.png`;
            }

        }
        , updateCPIfMega(pokemonObject){
            console.log(pokemonObject);
            if(this.activeClickedTeam.activeMegaId === pokemonObject.Id){
                return pokemonObject.cp * 1.33;
            }
            return pokemonObject.cp;
        },
        getClass(type, otherclasses) {
            return ` type${type} ${otherclasses}`;
        },
        getClickedTeam(clickedPokemonTeam) {

            this.activeClickedTeam = clickedPokemonTeam;
            console.log( this.activeClickedTeam)
        }
        ,
        getClickedObject(clickedPokemon) {
            console.log( clickedPokemon.Id);
            this.activeItem = clickedPokemon;
            console.log(this.activeItem)

        }
        ,
        returnFullPokemon(pokemonIdOnly) {


            return ({...this.pokemonList.find(p => p.Id === pokemonIdOnly)});

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


        oddOrEven(otherClasses, poke) {

            if (this.pokemonList.indexOf(poke) % 2 === 0) {
                return otherClasses;
            } else {

                return otherClasses + ' bg-lighter';
            }
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

        }
    },
    computed: {

    },

    mounted: function () {

        this.fetchPokemonList();
        if (localStorage.getItem('pokemonList')) {

            this.pokemonList = JSON.parse(localStorage.getItem('pokemonList'));
        } else {
            this.pokemonList = []
        }
        //
        // if (localStorage.getItem('pokemonTeamList')) {
        //
        //     this.pokemonTeamList = JSON.parse(localStorage.getItem('pokemonTeamList'));
        //
        // } else {
        //     this.pokemonTeamList = [];
        //     for (const type of this.types) {
        //         console.log(type);
        //         this.pokemonTeamList.push({
        //             id: this.pokemonTeamList.length,
        //             type: type,
        //             activeTeam: [],
        //             backupPokemon: []
        //         });
        //
        //     }
        //
        // }

        // for (let pokeTeam of this.pokemonTeamList){
        //     let newActiveTeam = []
        //     let newBackupPokemon = []
        //     for (let pokemon of pokeTeam.activeTeam){
        //         console.log(pokemon);
        //         if (this.pokemonList.find(p => p.Id === Number(pokemon)) === undefined){
        //             continue
        //         }
        //         newActiveTeam.push(this.pokemonList.find(p => p.Id === pokemon));
        //     }
        //     pokeTeam.activeTeam = newActiveTeam;
        //     for (let pokemon of pokeTeam.backupPokemon){
        //         console.log(pokemon);
        //         if (this.pokemonList.find(p => p.Id === Number(pokemon)) === undefined){
        //             console.log("bad")
        //             continue;
        //         }
        //         newBackupPokemon.push(this.pokemonList.find(p => p.Id === pokemon));
        //     }
        //     pokeTeam.backupPokemon = newBackupPokemon;
        // }



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