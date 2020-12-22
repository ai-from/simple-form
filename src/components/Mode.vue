<template>
  <div class="field">
    <div class="item fullDay"
         :class="{active: value}"
         @click="$emit('mode', true)"
    >

      <div class="checkbox">
        <svg width="11" height="8" viewBox="0 0 11 8" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3.29312 7.6838C2.90259 7.29327 2.90259 6.66011 3.29312 6.26958L8.29712 1.26555C8.68764 0.875025 9.32081 0.875025 9.71133 1.26555C10.1019 1.65607 10.1019 2.28924 9.71133 2.67976L4.70733 7.6838C4.31681 8.07432 3.68364 8.07432 3.29312 7.6838Z" fill="white"/>
          <path d="M4.70733 7.6838C5.09786 7.29327 5.0978 6.66011 4.70727 6.26958L1.73445 3.29679C1.34393 2.90626 0.710761 2.90626 0.320237 3.29679C-0.0702873 3.68731 -0.0702873 4.32048 0.320237 4.711L3.29312 7.6838C3.68364 8.07432 4.31681 8.07432 4.70733 7.6838Z" fill="white"/>
        </svg>
      </div>

      <div class="label">Полный рабочий день</div>

    </div>
    <div class="item remote"
         :class="{active: !value}"
         @click="$emit('mode', false)"
    >

      <div class="checkbox">
        <svg width="11" height="8" viewBox="0 0 11 8" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3.29312 7.6838C2.90259 7.29327 2.90259 6.66011 3.29312 6.26958L8.29712 1.26555C8.68764 0.875025 9.32081 0.875025 9.71133 1.26555C10.1019 1.65607 10.1019 2.28924 9.71133 2.67976L4.70733 7.6838C4.31681 8.07432 3.68364 8.07432 3.29312 7.6838Z" fill="white"/>
          <path d="M4.70733 7.6838C5.09786 7.29327 5.0978 6.66011 4.70727 6.26958L1.73445 3.29679C1.34393 2.90626 0.710761 2.90626 0.320237 3.29679C-0.0702873 3.68731 -0.0702873 4.32048 0.320237 4.711L3.29312 7.6838C3.68364 8.07432 4.31681 8.07432 4.70733 7.6838Z" fill="white"/>
        </svg>
      </div>

      <div class="label">Удаленная работа</div>

    </div>
  </div>
</template>

<script>
export default {
  name: 'Mode',
  props: {
    value: {}
  }
}
</script>

<style lang="sass" scoped>
.field
  display: grid
  grid-template-columns: repeat(2, min-content)
  grid-column-gap: 32px
  .item
    display: grid
    grid-template-columns: repeat(2, min-content)
    grid-column-gap: 10px
    align-items: center
    cursor: pointer
    .label
      font-family: $FiraSans
      font-size: 0.81rem
      color: $black
      white-space: nowrap
    .checkbox
      width: 18px
      height: 18px
      border: 1px solid $grey
      border-radius: 3px
      svg
        display: none
    &.active
      .checkbox
        border: 1px solid $active
        background: $active
        display: grid
        svg
          display: block
          margin: auto
</style>