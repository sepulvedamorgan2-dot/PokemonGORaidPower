import { createRouter, createWebHistory } from 'vue-router'
import PokeList from "@/views/PokeList.vue";
import RaidTeams from "@/views/RaidTeams.vue";
import TradeCardView from "@/views/TradeCardView.vue";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'PokeList',
      component: PokeList,
      props: {
        pokeList: {Type: Array, required: true},
      }
    },
    {
      path: '/raid-teams',
      name: 'RaidTeams',
      component: RaidTeams,
      props: {
        pokeList: {Type: Array, required: true},
        pokemonTeamList: {Type: Array, required: true},
      }
    },
    {
      path: '/trade-cards',
      name: 'Trade Cards',
      component: TradeCardView,
      props: {
        pokeList: {Type: Array, required: true},
        pokemonListApi: {Type: Array, required: true},
        tradeCardList: {Type: Array, required: true},
      }
    },
  ],
})

export default router
