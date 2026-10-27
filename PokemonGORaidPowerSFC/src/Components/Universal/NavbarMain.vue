<script>
export default {
  name: "NavbarMain",
  data: function () {
    return {
      defaultNavbar: [{title: "Raid Teams", link: "/raid-teams" }, {title: "Poke-List", link: "/"}, {title: "Trade Cards", link: "./trade.html" }],
    }
  },

  props: {
    pageTitle: {type: String, required: false},
    navArray: {type: Array, required: false},
  },
}
</script>

<template>
  <nav class="navbar navbar-expand-sm bg-primary sticky-top">
    <div class="container-fluid container-md ">
      <a class="navbar-brand text-white" href="#">
        <img src="@/Images/demologo.png" alt="Logo" class="img-fluid " style="height: 40px;">
        {{ pageTitle }}
      </a>
      <i class="bi bi-three-dots text-white fs-4 d-sm-none  px-2 py-1" type="button" data-bs-toggle="collapse"
         data-bs-target="#navbarCollapse" aria-controls="#offCanvasNav" aria-expanded="false"
         aria-label="Toggle navigation">
      </i>
      <div class="navbar-collapse collapse" id="navbarCollapse">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <router-link class="nav-link text-white" to="/">Poke-List</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link text-white" to="/raid-teams">Raid Teams</router-link>
          </li>
        </ul>

      </div>
    </div>
  </nav>
</template>

<style scoped>

</style>