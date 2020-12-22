<template>
  <div class="field">

      <div class="field-switcher"
           :class="{active: status}"
           @click="$emit('checkbox')"
      >
        <div
          class="field-handler"
          :class="{active: status}"
        ></div>
      </div>

    <div
      class="label"
      @click="$emit('checkbox')"
    >
      {{ label }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'Checkbox',
  props: {
    label: {
      type: String,
      default: 'Switcher'
    },
    status: {
      type: Boolean,
      default: false
    }
  },
  methods: {

  }
}
</script>

<style lang="sass" scoped>
.field
  display: grid
  grid-template-columns: repeat(2, min-content)
  grid-column-gap: 10px
  align-items: center
  &-switcher
    width: 38px
    height: 20px
    border-radius: 50px
    background: $grey
    position: relative
    cursor: pointer
    transition: all linear $time
    &.active
      background: $active
  &-handler
    width: 16px
    height: 16px
    background: $white
    border-radius: 100%
    position: absolute
    top: 50%
    transform: translateY(-50%)
    right: 20px
    transition: all linear $time
    &.active
      right: 2px
  .label
    font-family: $FiraSans
    font-size: 0.81rem
    color: $black
    white-space: nowrap
    cursor: pointer
</style>