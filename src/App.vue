<script>
import {createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword} from "firebase/auth";

import NavbarMain from "@/Components/Universal/NavbarMain.vue";
import {collection, doc, getDoc, onSnapshot, setDoc, query, where, getDocs} from "firebase/firestore";
import {computed, shallowRef} from "vue"
import {PokemonList} from "@/models/PokemonList.js"
import {TradeCardList} from "@/models/TradeCardList.js";
import DataFactory from "@/models/factories/DataFactory.js";
import GameDataApi from "@/models/factories/GameDataApi.js";
import {auth, db} from "@/firebase/index.js";
import {User} from "@/models/User.js";
import {PokelistCollection} from "@/firebase/PokelistCollection.js";
import {UserCollection} from "@/firebase/UserCollection.js";

export default {
  name: "App",
  components: {
    NavbarMain,
  },
  data: function () {
    return {
      types: ['normal', 'fire', 'water', 'electric', 'grass', 'ice', 'fighting', 'poison', 'ground', 'flying', 'psychic', 'bug', 'rock', 'ghost', 'dragon', 'dark', 'steel', 'fairy'],
      pokemonList: new PokemonList(),
      pokemonTeamList: null,
      pokemonListAPI: shallowRef([]),
      tradeCardList: new TradeCardList(),
      offers: [],
      user: new User(false),
      username: '',
      password: '',
    }
  },
  mounted: async function () {
    this.pokemonListAPI = await GameDataApi.fetchPokemonListApi();
    // this.pokemonList = DataFactory.fetchPokemonList();

    // this.pokemonTeamList = DataFactory.fetchPokemonTeamList(this.pokemonList);
    // this.tradeCardList = DataFactory.fetchTradeCardList()


  },

  watch: {
    pokemonList: {
      handler: function () {
        // DataFactory.savePokemonList(this.pokemonList)
        // GameDataApi.fetchSinglePokemon({
        //   pokemonId: 1,
        //   image: `https://raw.githubusercontent.com/pokemon-go-api/assets/main/Pokemon/pm1.cJAN_2020_NOEVOLVE.s.icon.png`,
        //   name: 'Bulbasaur',
        // })


      }, deep: true
    },
    pokemonTeamList: {
      handler: function () {
        DataFactory.savePokemonTeamList(this.pokemonTeamList)
      }, deep: true
    },
    tradeCardList: {
      handler: function () {
        DataFactory.saveTradeCardList(this.tradeCardList)
      }, deep: true
    },
  },
  methods: {
    async login() {
      await signInWithEmailAndPassword(auth, this.username, this.password)
          .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            console.log('User signed in:', user);
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error('Error signing in:', errorCode, errorMessage);
          });
    },
    async signOut() {
      await auth.signOut()
          .then(() => {
            console.log('User signed out');
            this.user = null;
          })
          .catch((error) => {
            console.error('Error signing out:', error);
          });
    },
    createAcc() {
      createUserWithEmailAndPassword(auth, this.username, this.password)
          .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            console.log('User account created:', user);

          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error('Error creating account:', errorCode, errorMessage);
          });
    }
  }, async created() {
    onAuthStateChanged(auth, firebaseUser => {
      if (firebaseUser) {
        console.log('User is signed in:', firebaseUser);
        UserCollection.getUser(firebaseUser.uid)
            .then(dbUser => {
              if (dbUser ) {
                this.user = dbUser;
                this.user.uid = firebaseUser.uid
              } else {
                console.log('User does not exist in Firestore. Creating a new user document.');
                const newUser = new User({
                  displayName: 'insertName',
                  friendshipCode: 'insertCode',
                  socialMedia: {
                    reddit: 'insertReddit',
                    discord: 'insertDiscord',
                  }
                })
                newUser.uid = firebaseUser.uid;
                console.log('New user created:', newUser);
                UserCollection.setUser(newUser)
                    .then(() => {
                      this.user = newUser;
                      this.user.uid = firebaseUser.uid
                      console.log('New user document created in Firestore:', newUser);
                    })
                    .catch(error => {
                      console.error('Error creating user document in Firestore:', error);
                    });
              }
            }).then(() => {
              PokelistCollection.getSnapShot(this.pokemonList, this.user);
            })

      } else {
        console.log('No user is signed in.');
        this.user = new User();
      }

    })

  },
  provide() {
    return {
      authUser: computed(() => this.user),
    }
  }
}

</script>

<template>
  <NavbarMain pageTitle="Pokemon Go Raid Power"/>
  <div>
    <form action="">
      <label for="email">
        <input v-model="username" type="text" placeholder="email">
      </label>
      <label for="password">
        <input v-model="password" type="text" placeholder="password">
      </label>
      <button @click="login" type="button">Login</button>
      <button @click="signOut" type="button">sign out</button>
      <button @click="createAcc" type="button">creat account</button>


    </form>
  </div>
  <router-view :trade-card-list="tradeCardList" :pokemon-list-api="pokemonListAPI" :pokemon-team-list="pokemonTeamList"
               :pokemon-list="pokemonList" :offers="offers"></router-view>
</template>

<style scoped></style>
