let pokemonNameList;

const pokemonSelect = document.getElementById('pokemonSelect');
const pokemonList = document.getElementById('renderList');
fetch("https://pokeapi.co/api/v2/pokemon?limit=1331")
    .then((response) => response.json())
    .then((data) => {
        pokemonNameList = [];
        console.log(data);
        for (const pokemon of data.results) {
            pokemonNameList.push(pokemon.name);

        }
        console.log(pokemonNameList);

    })
    .catch((error) => {

        console.error(error);
    });
// Im assuming this is bad practice, I just wanted to try it for this version
pokemonSelect.addEventListener('keydown', (event) => {
    if (event.key !== 'Enter') {
        return;
    }
    const selectedPokemon = event.target.value;
    pokemonList.innerHTML = '';
    for (const pokemon of pokemonNameList) {
        if (pokemonList.childElementCount >= 5) {
            continue;
        }
        if (pokemon.includes(selectedPokemon.toLowerCase()) && pokemon.includes("-mega") === false) {
            pokemonList.innerHTML += `<div class="border-bottom rounded-0 w-100" aria-label="${pokemon}">
                    <div class="row g-0">
                        <div class="col-2">
                            <img class="img-fluid horz-card-img " style="max-height: 60px; max-width: 60px;"
                                src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonNameList.indexOf(pokemon) + 1}.png"
                                alt="pokemonImg">
                        </div>
                        <div class="col-7">
                            <div class="mt-2 p-1 ms-1">
                                <p class="fs-5 mb-0">${pokemon}</p>

                            </div>
                        </div>
                        <div class="col-3">
                            <div class="mt-2 p-1">
                                <button class="btn btn-primary w-100 searchedPokemonBtn" data-bs-toggle="offcanvas" data-bs-target="#addPokemonDetailsOffCanvas" data-bsname="${pokemon}">Select</button>
                            </div>
                        </div>

                    </div>
                </div>`;
        }
       
    }
     console.log('eee')
    if (pokemonList.childElementCount === 0) {
        pokemonList.innerHTML = `<div class="p-2">
                <button 
                    class="btn border w-100 fs-4">
                    No Pokemon Found </button>
            </div>`
    }
    
    for (const button of document.querySelectorAll('.searchedPokemonBtn')) {
        
        button.addEventListener('click', (event) => {
            
            const selectedPokemon = (event.target.dataset.bsname);
            console.log(selectedPokemon);
            document.querySelector('.details-img').src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonNameList.indexOf(selectedPokemon) + 1}.png`;
            document.querySelector('.details-name').textContent = selectedPokemon;
        })

}




})
    ;

