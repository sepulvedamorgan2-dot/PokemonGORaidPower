

const types = ['normal', 'fire', 'water', 'electric', 'grass', 'ice', 'fighting', 'poison', 'ground', 'flying', 'psychic', 'bug', 'rock', 'ghost', 'dragon', 'dark', 'steel', 'fairy'];
const container = document.querySelector('.typecardholder');

for (const type of types) {
    console.log(type)
    const typeCard = document.createElement('div');
    typeCard.classList.add('col-12', 'col-sm-6', 'col-lg-4', 'mt-3', 'typecard');
    typeCard.dataset.poketype = `${type}`;
    typeCard.innerHTML += `
                <div class="card  ">
                    
                    <!-- imgs -->
                    <div class="card-body p-2  p-sm-2 p-md-2">
                    
                        <div class="row p-2 py-0 mb-1">
                            <div class="col-10 ps-2 ps-sm-2">
                                  <div class="ms-0 ms-sm-1">
                                <h4 class="fs-2 fw-bold pt-2 mb-0 text-capitalize text-start pb-0"> ${type}</h4>
                         
                                </div>
                            </div>
                          
                            <div class="col-2 d-flex justify-content-end">
                            
                                    <div class="p-sm-2 me-sm-1 mt-sm-1 p-2 pb-0 pb-sm-0">
                                    <i class="bi bi-pencil fs-5 " type="button" data-bs-toggle="offcanvas" data-bs-target="#editTeamOffCanvas"></i>
                                    </div>
                            </div>
                            <div class="col-12 ps-2 pe-0">
                            <div class="ms-sm-1">
                            <span class="fw-semibold fs-5 text-dark mb-0">${Math.floor(Math.random() * 2000) + 1}</span>
                                <span class="text-uppercase fw-bold text-tertiary fs-6 mt-2 mb-1">RP</span>
                                <span class="fw-semibold fs-5 text-dark mb-0 ms-2">${Math.floor(Math.random() * 4) + 1}</span>
                                <span class="text-uppercase fw-bold text-secondary fs-tiny   mt-2 mb-1">Players per 5* Raid</span>
</div>  </div>
                        </div>
                       
                    
                        <div class="row g-2 g-sm-2 g-md-2 p-sm-1 ">
                            <div class="col-4 text-center   ">
                                <img class="img-fluid border rounded w-100"
                                    src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${Math.floor(Math.random() * 1000) + 1}.png"
                                    alt="pokemonImg">

                            </div>
                            <div class="col-4 text-center ">
                                <img class=" img-fluid border rounded w-100"
                                    src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${Math.floor(Math.random() * 1000) + 1}.png"
                                    alt="pokemonImg">

                            </div>
                            <div class="col-4 text-center ">
                                <img class="img-fluid border rounded w-100"
                                    src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${Math.floor(Math.random() * 1000) + 1}.png"
                                    alt="pokemonImg">
                            </div>
                            <div class="col-4 text-center   ">
                                <img class="img-fluid border rounded w-100"
                                    src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${Math.floor(Math.random() * 1000) + 1}.png"
                                    alt="pokemonImg">

                            </div>
                            <div class="col-4 text-center ">
                                <img class=" img-fluid border rounded w-100"
                                    src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${Math.floor(Math.random() * 1000) + 1}.png"
                                    alt="pokemonImg">

                            </div>
                            <div class="col-4 text-center ">
                                <img class="img-fluid border rounded w-100"
                                    src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${Math.floor(Math.random() * 1000) + 1}.png"
                                    alt="pokemonImg">
                            </div>



                        </div>
                    </div>
<!--                    <div class="card-body pt-2 pb-3 ">-->
<!--                        -->
<!--                       -->
<!--                        <div class="text-center">-->
<!--                            <button class="mt-3 mb-0 btn btn-primary w-50" data-bs-toggle="offcanvas"-->
<!--                                data-bs-target="#editTeamOffCanvas">Edit Team</button>-->
<!--                            &lt;!&ndash; editTeamOffCanvas &ndash;&gt;-->
<!--                            &lt;!&ndash; PokemonDetailsOffCanvas &ndash;&gt;-->
<!--                        </div>-->
<!--                    </div>-->
                </div>
                <!-- img end -->

            `;
    container.appendChild(typeCard);
}