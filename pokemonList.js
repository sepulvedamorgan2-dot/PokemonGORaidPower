// let pokemonNameList;
//
// const pokemonSelect = document.getElementById('pokemonSelect');
// const pokemonListAPI = document.getElementById('renderList');
// fetch("https://pokeapi.co/api/v2/pokemon?limit=1331")
//     .then((response) => response.json())
//     .then((data) => {
//         pokemonNameList = [];
//         console.log(data);
//         for (const pokemon of data.results) {
//             pokemonNameList.push(pokemon.name);
//
//         }
//         console.log(pokemonNameList);
//
//     })
//     .catch((error) => {
//
//         console.error(error);
//     });
// // Im assuming this is bad practice, I just wanted to try it for this version
// pokemonSelect.addEventListener('keydown', (event) => {
//     if (event.key !== 'Enter') {
//         return;
//     }
//     const selectedPokemon = event.target.value;
//     pokemonListAPI.innerHTML = '';
//     for (const pokemon of pokemonNameList) {
//         if (pokemonListAPI.childElementCount >= 5) {
//             continue;
//         }
//         if (pokemon.includes(selectedPokemon.toLowerCase()) && pokemon.includes("-mega") === false) {
//             pokemonListAPI.innerHTML += `<div class="border-bottom rounded-0 w-100" aria-label="${pokemon}">
//                     <div class="row g-0 align-items-center">
//                         <div class="col-3">
//                             <img class="img-fluid horz-card-img "
//                                 src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonNameList.indexOf(pokemon) + 1}.png"
//                                 alt="pokemonImg">
//                         </div>
//                         <div class="col-6">
//                             <div class="ms-0 ms-sm-0">
//                                 <p class="fs-5 mb-0 text-capitalize">${pokemon}</p>
//
//                             </div>
//                         </div>
//                         <div class="col-3">
//                             <div class="p-1">
//                                 <button class="btn btn-sm btn-primary w-100 searchedPokemonBtn" data-bs-toggle="offcanvas" data-bs-target="#addPokemonDetailsOffCanvas" data-bsname="${pokemon}">Select</button>
//                             </div>
//                         </div>
//
//                     </div>
//                 </div>`;
//         }
//
//     }
//      console.log('eee')
//     if (pokemonListAPI.childElementCount === 0) {
//         pokemonListAPI.innerHTML = `<div class="p-2">
//                 <button
//                     class="btn border w-100 fs-4">
//                     No Pokemon Found </button>
//             </div>`
//     }
//
//     for (const button of document.querySelectorAll('.searchedPokemonBtn')) {
//
//         button.addEventListener('click', (event) => {
//
//             const selectedPokemon = (event.target.dataset.bsname);
//             console.log(selectedPokemon);
//             document.querySelector('.add-details-img').src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonNameList.indexOf(selectedPokemon) + 1}.png`;
//             document.querySelector('.details-add-name').textContent = selectedPokemon;
//         })
//
//     }
//
//
//
// });
//
//
