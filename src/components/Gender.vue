<template>
  <div class="field">
    <div
      class="item man"
      :class="{active: value}"
      @click="$emit('gender', true)"
    >
      Мужчина
    </div>
    <div
      class="item woman"
      :class="{active: !value}"
      @click="$emit('gender', false)"
    >
      Женщина
    </div>
  </div>
</template>

<script>
export default {
  name: 'Gender',
  props: {
    value: {}
  }
}
</script>

<style lang="sass" scoped>
.field
  display: grid
  grid-template-columns: repeat(2, min-content)
  .item
    font-family: $FiraSansMedium
    font-size: 0.75rem
    color: $genderColor
    background: $genderBg
    padding: 8px 14px
    width: min-content
    border: 1px solid $grey
    cursor: pointer
    &.active
      color: $active
      background: $white
    &.man
      border-radius: 50px 0 0 50px
    &.woman
      border-radius: 0 50px 50px 0
      border-left: none
</style>