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
        pokemonSearch() {
            // TODO:
            // Create offcanvas for filters
            // create data for each filter
            // add filter logic to below function
            this.matches = [];

            for (let eachPokemon of this.pokemonList) {
                // filter name
                if (
                    eachPokemon.name.toLowerCase().includes(this.searchForPokemon.toLowerCase()) &&
                    (this.filterFast === '' || eachPokemon.fastMoveType === this.filterFast) &&
                    (this.filterCharged === '' || eachPokemon.chargedMoveType1 === this.filterCharged || eachPokemon.chargedMoveType2 === this.filterCharged) &&
                    (this.filterShadow === '' || Boolean(eachPokemon.isShadow) === (this.filterShadow === true || this.filterShadow === 'true')) &&
                    (this.filterMega === '' || Boolean(eachPokemon.canMegaEvolve) === (this.filterMega === true || this.filterMega === 'true')) &&
                    (this.filterCP <= eachPokemon.cp)

                ) {

                        console.log(typeof(eachPokemon.cp));
                        console.log(typeof(this.filterCP))
                        this.matches.push(eachPokemon);


                }

            }
            return this.matches;
        },
        getSpriteLink(pokemonID) {

            if (typeof pokemonID === "number") {
                return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonID}.png`;
            }

        }
        ,
        getClass(type, otherclasses) {
            return ` type${type} ${otherclasses}`;
        }
        ,
        getClickedObject(clickedPokemonId) {

            this.activeItem = this.pokemonList.find(p => p.Id === clickedPokemonId);
            if (!this.activeItem) {
                console.log("BAD" + clickedPokemonId.pokemonId);
                this.activeItem = {...clickedPokemonId};
                console.log(this.activeItem);
            }
        }
        ,
        test() {
            console.log(this.pokemonListAPI[0]);
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
        clearLocalStorage() {
            localStorage.removeItem('pokemonList');
            this.pokemonList = [];
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

        },

    },
    computed: {},

    mounted: function () {
        this.fetchPokemonList();

        if (localStorage.getItem('pokemonList')) {

            this.pokemonList = JSON.parse(localStorage.getItem('pokemonList'));
        } else {
            this.pokemonList = []
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

    },


});
export default app;