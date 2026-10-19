// For subcomponent
// import xxx from './PokemonlistItem.js';

const ToggleButton = {
    name: 'ToggleButton',

    components: {

    },

    data: function () {
        return {
            index: 0,
            class: ''
        }
    },

    props: {
        savedValue: {type: Object, required: true},
    },

    methods: {
        nextOption(){



            if(this.index === this.savedValue.optionsArray.length - 1){

                this.index = 0;
                this.savedValue.text = this.savedValue.optionsArray[this.index].text;
                this.savedValue.tagClass = this.savedValue.optionsArray[this.index].tagClass
            } else {
                this.index++;
                this.savedValue.text = this.savedValue.optionsArray[this.index].text;
                this.savedValue.tagClass = this.savedValue.optionsArray[this.index].tagClass;
            }
        },
    },

    watch: {

    }, mounted() {
        console.log(this.index + this.savedValue.text)
      console.log(this.savedValue.optionsArray)
        for(let i = 0; i < this.savedValue.optionsArray.length; i++){
            if(this.savedValue.optionsArray[i].text === this.savedValue.text) {
                this.index = i;
                this.class = this.savedValue.optionsArray[i].tagClass;
                break;
            }
        }
        console.log(this.index)
    },



    template: `
      <div>
        <label class="ms-1 mb-1 form-label  d-block"> {{ this.savedValue.title }}</label>
        <button :class="
        {'w-100 btn border text-white  rounded-pill ': true,
        'btn-typesteel': savedValue.tagClass === 'd-none',
         ['btn-' + savedValue.tagClass] : savedValue.tagClass !== 'd-none',
        }
            " style="min-width: 80px" :value="savedValue.optionsArray[index].text" v-on:click="nextOption">
          {{ savedValue.optionsArray[index].text }}
        </button>


      </div>
    `,


}

export default ToggleButton;