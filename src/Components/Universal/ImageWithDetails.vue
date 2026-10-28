<script>
export default {
  name: "ImageWithDetails",
  data: function () {
    return {}
  },
  props: {
    pokemon: {type: Object, required: true},
    noShiny: {type: Boolean, required: false, default: false},
    noShadow: {type: Boolean, required: false, default: false},
    noLucky: {type: Boolean, required: false, default: false},
    noQuantity: {type: Boolean, required: false, default: false},
    noPresetSize: {type: Boolean, required: false, default: false},
  },
  methods: {
    testLucky(){
      try{

        return this.pokemon.tradeDetails.tags[2].selected === 'Lucky';
      } catch (error){
        return false
      }
    }
  }

}
</script>

<template>
  <div class="position-relative">
    <img :src="pokemon.image"
         alt="Pokemon" :class="{'img-fluid': true, 'horz-card-img': !noPresetSize, 'lucky': testLucky()}">
    <p  v-if="pokemon.tradeDetails.tradeQuantity > 0 && noQuantity" class="corner-tl-text"> {{ pokemon.tradeDetails.tradeQuantity }}x</p>
    <img v-if="pokemon.isShadow" src="@/Images/shadow.png" alt="Shadow" class="corner-bl-img">
    <img v-if="pokemon.image.includes('.s.')" src="@/Images/shiny.png" alt="Shadow" class="corner-tl-img">
    <slot>

    </slot>
  </div>
</template>

<style lang="scss" scoped>
%corner-base {
  position: absolute;
  width: 20%;
  height: auto;
  margin: .2rem;
}

.corner-bl-img {
  @extend %corner-base;
  bottom: 0;
  left: 0;
}

.corner-tr-img {
  @extend %corner-base;
  top: 0;
  right: 0;
}

.corner-tl-img {
  @extend %corner-base;
  top: 0;
  left: 0;
}

.corner-br-img {
  @extend %corner-base;
  bottom: 0;
  right: 0;
}

.corner-tl-text {
  position: absolute;
  bottom: 0;
  left: 0;
  font-size: 13px;
  height: auto;
  margin: .2rem;
  margin-left: .4rem;
  margin-top: 1.2rem;
}
.horz-card-img {
  width: 80px;

  @media (max-width: 767px) {
    width: 70px;
  }
}

.lucky {
  background-image: url('@/Images/lucky.webp');
  background-size: cover;
}
</style>