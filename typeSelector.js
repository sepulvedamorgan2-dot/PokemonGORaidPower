const mobileTypeSelector = document.getElementById('mobileTypeSelector');

const typeCards = document.querySelectorAll('.typecard')

mobileTypeSelector.value = 'normal';

mobileTypeSelector.addEventListener('change', () => {
    mobileTypeSelectorUpdater()
})

function mobileTypeSelectorUpdater() {
    const selectedType = mobileTypeSelector.value

    for (const typeCard of typeCards) {

        typeCard.classList.add('d-none')

        if (typeCard.dataset.poketype === selectedType) {
            typeCard.classList.add('d-flex')
            typeCard.classList.remove('d-none')
        }
    }

}

mobileTypeSelectorUpdater()



window.addEventListener('resize', () => {
    windowWidth()
})

function windowWidth() {
    if (window.innerWidth >= 576) {
        for (const typeCard of typeCards) {

            typeCard.classList.add('d-flex')
            typeCard.classList.remove('d-none')

        }
    } else{
        mobileTypeSelectorUpdater()

    }
}
windowWidth()