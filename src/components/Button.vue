<template>
  <button
    :type="type"
    :disabled="disabled"
    :class="{
      disabled: disabled,
      white: theme === 'white',
      blue: theme === 'blue'
    }"
    @click="$emit('click')"
  >
    {{ title }}
  </button>
</template>

<script>
export default {
  name: 'Button',
  props: {
    title: {
      type: String,
      default: 'Button'
    },
    theme: {
      type: String,
      default: 'white'
    },
    type: {
      type: String,
      default: 'button'
    },
    disabled: {
      type: Boolean
    }
  }
}
</script>

<style lang="sass" scoped>
button
  font-family: $FiraSansMedium
  font-size: 0.94rem
  padding: 10px 26px
  border-radius: 50px
  border: none
  cursor: pointer
  &.disabled
    opacity: .5
  &.white
    background: $white
    color: $black
    border: 1px solid $grey
  &.blue
    background: $active
    color: $white
    border: 1px solid $active
</style>