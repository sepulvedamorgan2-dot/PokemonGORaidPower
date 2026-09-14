const types = ['normal', 'fire', 'water', 'electric', 'grass', 'ice', 'fighting', 'poison', 'ground', 'flying', 'psychic', 'bug', 'rock', 'ghost', 'dragon', 'dark', 'steel', 'fairy'];
const container = document.querySelector('.typecardholder');

for (const type of types) {
    console.log(type)
    const typeCard = document.createElement('div');
    typeCard.classList.add('col-12', 'col-sm-6', 'col-lg-4', 'mt-3', 'typecard');
    typeCard.dataset.poketype = `${type}`;
    typeCard.innerHTML += `
                <div class="card">
                    
                    <!-- imgs -->
                    <div class="card-body border-bottom  p-2  p-sm-2 p-md-2">
                    <h4 class="card-title text-capitalize text-center py-2"> ${type} Type</h4>
                        
                    
                        <div class="row g-2 g-sm-2 g-md-2 ">
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
                    <div class="card-body pt-2 pb-3 ">
                        <div class="text-center">
                            <p class="text-uppercase fw-bold text-secondary fs-6 mt-2 mb-1">Raid Power</p>
                            <p class="fw-bolder fs-3 text-dark mb-0">${Math.floor(Math.random() * 2000) + 1}</p>
                        </div>
                       
                        <div class="text-center">
                            <button class="mt-3 mb-0 btn btn-primary w-50" data-bs-toggle="offcanvas"
                                data-bs-target="#editTeamOffCanvas">Edit Team</button>
                            <!-- editTeamOffCanvas -->
                            <!-- PokemonDetailsOffCanvas -->
                        </div>
                    </div>
                </div>
                <!-- img end -->

            `;
    container.appendChild(typeCard);
}