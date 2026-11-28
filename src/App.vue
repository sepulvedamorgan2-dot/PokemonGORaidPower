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

export default {
  name: "App",
  components: {
    NavbarMain,
  },
  data: function () {
    return {
      types: ['normal', 'fire', 'water',  'electric', 'grass', 'ice', 'fighting', 'poison', 'ground', 'flying', 'psychic', 'bug', 'rock', 'ghost', 'dragon', 'dark', 'steel', 'fairy'],
      pokemonList: new PokemonList(),
      pokemonTeamList: null,
      pokemonListAPI: shallowRef([]),
      tradeCardList: new TradeCardList(),
      offers: [],
      user: null,
      username: '',
      password: '',
    }
  },
  mounted: async function () {
    this.pokemonListAPI = await GameDataApi.fetchPokemonListApi();
    // this.pokemonList = DataFactory.fetchPokemonList();

    // this.pokemonTeamList = DataFactory.fetchPokemonTeamList(this.pokemonList);
    // this.tradeCardList = DataFactory.fetchTradeCardList()

    PokelistCollection.getSnapShot(this.pokemonList)
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
  // methods: {
  //   login() {
  //     signInWithEmailAndPassword(auth, this.username, this.password)
  //         .then((userCredential) => {
  //           this.user = userCredential.user;
  //           console.log('Logged in:', this.user);
  //         })
  //         .catch((error) => {
  //           const errorCode = error.code;
  //           const errorMessage = error.message;
  //           console.error('Error logging in:', errorCode, errorMessage);
  //           console.log()
  //         });
  //     console.log(this.username, this.password)
  //   },
  //   async createAcc() {
  //     console.log(auth.currentUser.uid)
  //     console.log(doc(collection(db, 'users'), auth.currentUser.uid))
  //     await setDoc(doc(collection(db, 'users'), auth.currentUser.uid), {hi: 'hi'}).then(() => {
  //       console.log('Document created successfully');
  //     }).catch((error) => {
  //       console.error('Error creating document:', error);
  //     });
  //
  //
  //     // console.log(this.username, this.password)
  //     // try {
  //     //   createUserWithEmailAndPassword(auth, this.username, this.password)
  //     //       .then((userCredential) => {
  //     //         // Signed in
  //     //         const user = userCredential.user;
  //     //         console.log('Account created:', user);
  //     //       })
  //     // } catch (error) {
  //     //   console.error('Error creating account:', error)
  //     // }
  //   },
  //   async signOut() {
  //     console.log(auth.currentUser.uid)
  //     console.log(doc(collection(db, 'users'), auth.currentUser.uid))
  //     const test = await getDoc(doc(collection(db, 'users'), auth.currentUser.uid))
  //     console.log(test.data())
  //     this.user = new User(test.data())
  //     console.log(this.user.exists())
  //
  //   }
  // },  created() {
  //   onAuthStateChanged(auth, firebaseUser => {
  //     if (firebaseUser) {
  //       User.getUser(firebaseUser.uid).then(userData => {
  //         this.user = new User(userData);
  //         console.log('User data fetched:', this.user);
  //       }).catch(error => {
  //         console.error('Error fetching user data:', error);
  //       });
  //     }
  //   })
  // },
  // provide() {
  //   return {
  //     authUser: computed(() => this.user),
  //   }
  // }
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
