<script>
export default {
  name: "NavbarMain",
  data: function () {
    return {
      defaultNavbar: [{title: "Raid Teams", link: "/raid-teams"}, {
        title: "Poke-List",
        link: "/"
      }, {title: "Trade Cards", link: "./trade.html"}],
    }
  },
  inject: {
    authUser: {
      default: null
    }
  },
  mounted() {

    console.log(this.authUser);
  },
  props: {
    pageTitle: {type: String, required: false},
    navArray: {type: Array, required: false},

  },
}
</script>

<template>
  <nav @click="console.log(authUser)" class="navbar navbar-expand-sm bg-primary sticky-sm-top">
    <div class="container-fluid container-md ">
      <a class="navbar-brand text-white" href="#">
        <img src="@/Images/demologo.png" alt="Logo" class="img-fluid " style="height: 40px;">
        Pogo Trade Hub
      </a>
      <div class="d-flex align-items-center d-sm-none ms-auto">
        <router-link to="/offers">
        <i class="bi bi-bell-fill text-white fs-4 force-hover px-2 py-1"
           type="button"
           aria-label="View Offers">
        </i>
        </router-link>
        <i class="bi bi-three-dots text-white fs-4 px-2 py-1"
           type="button"
           data-bs-toggle="collapse"
           data-bs-target="#navbarCollapse"
           aria-controls="navbarCollapse"
           aria-expanded="false"
           aria-label="Toggle navigation">
        </i>
      </div>
      <div class="navbar-collapse collapse" id="navbarCollapse">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <router-link class="nav-link text-white" to="/">Poke-List</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link text-white" to="/trade-cards">Trade Cards</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link text-white" to="/search-trades">Search Trades</router-link>
          </li>
          <li class="nav-item d-none d-sm-block">
            <router-link class="  pt-1 nav-link text-white" to="/offers"><i
                class="bi bi-bell-fill text-white d-none d-sm-block fs-5 p-0" type="button"
                aria-label="View Offers">
            </i></router-link>
          </li>
        </ul>

      </div>
    </div>
  </nav>
</template>

<style scoped>

</style>