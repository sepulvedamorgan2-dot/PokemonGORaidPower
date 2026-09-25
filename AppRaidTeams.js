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
            activeItem: {},
            activeClickedTeam: {},
            pokemonListAPI: [],
            searchResults: [],


        }
    },

    methods: {
        // TODO:
        // Check if pokemon in pokemonTeamList still exists, if not remove it
        addPokemonToTeam(pokemonObject) {
            if (this.activeClickedTeam.activeTeam.length < 6) {
                this.activeClickedTeam.activeTeam.push(pokemonObject.Id);
            } else {
                this.activeClickedTeam.backupPokemon.push(pokemonObject.Id);
            }

        },
        teamCP(teamCPMeasure) {
            let counter = 0;

            for (const pokeInTeam of teamCPMeasure.activeTeam) {
                if (teamCPMeasure.activeMegaId === pokeInTeam) {
                    counter += this.returnFullPokemon(pokeInTeam).cp * 1.33;
                }
                counter += this.returnFullPokemon(pokeInTeam).cp;
            }
            return counter;
        }, teamForRaid(teamForRaidMeasure) {
            let counter = 0;


            for (const pokeInTeam of teamForRaidMeasure.activeTeam) {


                counter += this.returnFullPokemon(pokeInTeam).cp;
            }

            if (!counter) {
                return 0;
            }

            return parseInt(45000 / counter);
        }, removeFromListActive(pokemonToRemove) {
            this.activeClickedTeam.activeTeam.splice(this.activeClickedTeam.activeTeam.indexOf(pokemonToRemove.Id) , 1);

        }, removeFromListBackup(pokemonToRemove) {
            this.activeClickedTeam.backupPokemon.splice(this.activeClickedTeam.backupPokemon.indexOf(pokemonToRemove.Id) , 1);

        }, megaClickedPokemon(pokemonToMega) {

            this.activeClickedTeam.activeMegaId = pokemonToMega.Id;

        },
        getSpriteLink(pokemonID) {

            if (typeof pokemonID === "number") {
                return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonID}.png`;
            } else {

                return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonID.pokemonId}.png`;
            }

        }
        , updateCPIfMega(pokemonObject) {

            if (this.activeClickedTeam.activeMegaId === pokemonObject.Id) {
                return pokemonObject.cp * 1.33;
            }
            return pokemonObject.cp;
        },
        getClass(type, otherclasses) {
            return ` type${type} ${otherclasses}`;
        },
        getClickedTeam(clickedPokemonTeam) {

            this.activeClickedTeam = clickedPokemonTeam;
            console.log(this.activeClickedTeam)
        }
        ,
        getClickedObject(clickedPokemon) {
            console.log(clickedPokemon.Id);
            this.activeItem = clickedPokemon;
            console.log(this.activeItem)

        }
        ,
        returnFullPokemon(pokemonIdOnly) {
            const pokemonFullObject = {...this.pokemonList.find(p => p.Id === pokemonIdOnly)}

           // if(Object.keys(pokemonFullObject).length === 0){
           //     console.log(pokemonFullObject)
           //     console.log("No matching Pokémon found for ID: " + pokemonIdOnly);
           //     // Remove the Pokémon from the active team
           //     for(const pokemonTeam of this.pokemonTeamList){
           //
           //         console.log(pokemonTeam.activeTeam.splice(pokemonTeam.activeTeam.indexOf(pokemonIdOnly), 1)[0]);
           //     }
           // }

            return pokemonFullObject;

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

        }, pokemonListBySearch() {
            const listToRender = [];
            for (const eachPokemon of this.pokemonList) {

                if (listToRender.length > 10) {
                    break;
                }
                let usedIds = []

                try {
                    for(const pokemon of this.activeClickedTeam.activeTeam){
                        usedIds.push(pokemon);
                    }
                    for(const pokemon of this.activeClickedTeam.backupPokemon){
                        usedIds.push(pokemon);
                    }
                } catch {
                    // console.log("no clicked Team")
                }

                try {
                    // console.log(usedIds);
                    if (eachPokemon.name.toLowerCase().includes(this.searchForPokemon.toLowerCase()) && !usedIds.includes(eachPokemon.Id) ) {
                        listToRender.push(eachPokemon);
                    }
                } catch
                    (error)
                    {

                    }
                }
                return listToRender;


            }
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