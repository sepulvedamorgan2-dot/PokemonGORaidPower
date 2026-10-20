// For subcomponent
// import xxx from './PokemonlistItem.js';

const ToggleButton = {
    name: 'ToggleButton',

    components: {

    },

    data: function () {
        return {
            index: 0,

        }
    },

    props: {
        savedValue: {type: Object, required: true},
    },

    methods: {
        nextOption(){
            if (this.index >= this.savedValue.optionsArray.length - 1) {
                this.index = 0;
            } else {
                this.index++;
            }
            // this.$emit('updateOption', [this.savedValue, this.index]);
            this.savedValue.text = this.savedValue.optionsArray[this.index].text;
            this.savedValue.tagClass = this.savedValue.optionsArray[this.index].tagClass

        },
    },

    watch: {

    }, mounted() {

      console.log(this.savedValue.optionsArray)
        for(let i = 0; i < this.savedValue.optionsArray.length; i++){


            if(this.savedValue.optionsArray[i].text === this.savedValue.text) {
                console.log(this.savedValue.text +'ee' + this.savedValue.optionsArray[i].text + i)
                this.index = i;

                break;
            }
        }

    },



    template: `
      <div>
        <label class="ms-1 mb-1  d-block"> {{ this.savedValue.title }}</label>
        <div :class=" 
        {'w-100 rounded-pill btn fs-6 border p-1  text-center': true,
        'border': savedValue.optionsArray[index].tagClass  === 'd-none',
         ['border-light  btn-' + savedValue.optionsArray[index].tagClass]: (savedValue.optionsArray[index].tagClass !== 'd-none'),
        }
            " style="min-width: 80px"  v-on:click="nextOption">
          {{ savedValue.optionsArray[index].text }}
        </div>


      </div>
    `,


}

export default ToggleButton;