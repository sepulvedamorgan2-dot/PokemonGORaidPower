// For subcomponent
// import xxx from './PokemonlistItem.js';

const ComponentName = {
    components: {

    },

    data: function () {
        return {
            defaultNavbar: [{title: "Raid Teams", link: "./index.html" }, {title: "Poke-List", link: "./pokelist.html"}, {title: "Trade Cards", link: "./trade.html" }],
        }
    },

    props: {
        pageTitle: {type: String, required: false},
        navArray: {type: Array, required: false},
    },

    methods: {

    },

    computed: {},

    template: `
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
              <li v-if="!navArray" v-for="item in defaultNavbar" class="nav-item">
                <a class="nav-link text-white " :href="item.link">{{item.title}}</a>
              </li>
              <li  v-else v-for="item in navArray" class="nav-item">
                <a class="nav-link text-white active" :href="item.link">{{item.title}}</a>
              </li>
            </ul>

          </div>
        </div>
      </nav>

    `,


}

export default ComponentName;