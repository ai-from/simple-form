<template>
  <div class="field"
       :class="{error: isError}"
  >
    <label :for="getId">{{ label }}<span v-if="required">*</span></label>
    <div class="input_wrap">
      <input
        :id="getId"
        type="text"
        :placeholder="placeholder"
        :value="value"
        @input="$emit('input', $event.target.value)"
      >
      <svg
        width="12"
        height="12"
        viewBox="0 0 12 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        v-if="value"
        @click="clearField"
      >
        <path d="M0.325608 10.746C-0.0649162 10.3555 -0.0649162 9.72233 0.325608 9.33181L9.36312 0.292893C9.75364 -0.0976313 10.3868 -0.0976309 10.7773 0.292893C11.1679 0.683418 11.1679 1.31658 10.7773 1.70711L1.73982 10.746C1.3493 11.1365 0.716132 11.1365 0.325608 10.746Z" fill="#FF238D"/>
        <path d="M10.6836 10.6835C11.0741 10.293 11.0741 9.65986 10.6836 9.26933L1.70711 0.292893C1.31658 -0.0976313 0.683417 -0.0976309 0.292893 0.292893C-0.0976311 0.683418 -0.0976311 1.31658 0.292893 1.70711L9.26935 10.6835C9.65987 11.0741 10.293 11.0741 10.6836 10.6835Z" fill="#FF238D"/>
      </svg>
    </div>
    <div class="error">
      <div class="error-cnt">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="7" cy="7" r="6.5" fill="white" stroke="#FF238D"/>
          <circle cx="7" cy="10" r="1" fill="#FF238D"/>
          <rect x="6" y="3" width="2" height="5" rx="1" fill="#FF238D"/>
        </svg>
        <span>{{ errorMsg }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: {},
    label: {
      type: String,
      default: ''
    },
    required: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: ''
    },
    isError: {
      type: Boolean,
      default: false
    },
    errorMsg: {
      type: String,
      default: 'Error'
    }
  },
  data: () => ({
    fullName: ''
  }),
  computed: {
    getId: () => new Date().getTime()
  },
  methods: {
    clearField() {
      this.$emit('clear')
    }
  }
}
</script>

<style lang="sass">
.field
  width: min-content
  label
    font-family: $FiraSans
    font-size: 0.75rem
    color: $grey
    span
      color: $error
  .input_wrap
    position: relative
    width: 367px
    margin-bottom: 10px
    input
      font-size: 0.94rem
      color: $black
      border: none
      border-bottom: 1px solid $grey
      padding: 14px 20px 14px 0
      width: 100%
    svg
      position: absolute
      top: 50%
      transform: translateY(-50%)
      right: 0
      cursor: pointer
  .error
    color: $error
    height: 0.87rem
    .error-cnt
      display: none
  &.error
    label
      span
        color: $error
    input
      border-bottom: 1px solid $error
    .error
      .error-cnt
        display: grid
        grid-template-columns: min-content 1fr
        grid-column-gap: 7px
        align-items: center
        font-family: $FiraSans
        font-size: 0.68rem
</style>