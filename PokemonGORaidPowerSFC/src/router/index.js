import { createRouter, createWebHistory } from 'vue-router'
import PokeList from "@/views/PokeList.vue";
import RaidTeams from "@/views/RaidTeams.vue";
import pokeList from "@/views/PokeList.vue";
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
    // {
    //   path: '/raid-teams',
    //   name: 'Raid Teams',
    //   component: RaidTeams
    // },
  ],
})

export default router
