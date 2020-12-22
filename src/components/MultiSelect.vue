<template>
  <div class="field" ref="multiSelect">
    <label>{{ label }}</label>
    <div
      class="hashtags"
      :class="{active: isList}"
      @click.self="showList"
    >
      <div
        class="hashtags-placeholder"
        v-if="!listToShow.length"
        @click.self="showList"
      >
        {{ placeholder }}
      </div>
      <span
        class="hashtags-item"
        :class="{opacity: item.opacity}"
        v-for="(item, index) in listToShow"
        :key="index"
      >
        <span>{{ item.title }}</span>
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          @click.stop="removeTag(index, item.title)"
        >
          <path d="M0.325608 10.746C-0.0649162 10.3555 -0.0649162 9.72233 0.325608 9.33181L9.36312 0.292893C9.75364 -0.0976313 10.3868 -0.0976309 10.7773 0.292893C11.1679 0.683418 11.1679 1.31658 10.7773 1.70711L1.73982 10.746C1.3493 11.1365 0.716132 11.1365 0.325608 10.746Z" fill="#FF238D"/>
          <path d="M10.6836 10.6835C11.0741 10.293 11.0741 9.65986 10.6836 9.26933L1.70711 0.292893C1.31658 -0.0976313 0.683417 -0.0976309 0.292893 0.292893C-0.0976311 0.683418 -0.0976311 1.31658 0.292893 1.70711L9.26935 10.6835C9.65987 11.0741 10.293 11.0741 10.6836 10.6835Z" fill="#FF238D"/>
        </svg>
      </span>
    </div>
    <transition name="fade">
      <div class="list" v-if="isList">
        <div
          class="list-item"
          :class="{disable: !item.active}"
          v-for="(item, index) in list"
          :key="index"
          @click="addTag(index)"
        >
          {{ item.title }}
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'MultiSelect',
  props: {
    label: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    list: {
      type: Array,
      default: []
    },
    reset: {
      type: Boolean
    }
  },
  data: () => ({
    listToShow: [],
    isList: false
  }),
  methods: {
    addTag(index) {
      if(this.list[index].active) {
        this.listToShow.push(this.list[index])
        this.list[index].active = false
        let selectedList = []
        this.listToShow.forEach(item => {
          selectedList.push(item.title)
          let timer = setTimeout(() => {
            item.opacity = true
            clearTimeout(timer)
          }, 0)
        })
        this.$emit('listToShow', selectedList)
      }
    },
    removeTag(index, title) {
      this.listToShow[index].opacity = false
      let timer = setTimeout(() => {
        this.listToShow.splice(index, 1)
        this.list.forEach(item => {
          item.title === title ? item.active = true : false
        })
        let selectedList = []
        this.listToShow.forEach(item => selectedList.push(item.title))
        this.$emit('listToShow', selectedList)
        clearTimeout(timer)
      }, 250)
    },
    showList() {
      this.isList = true
    },
    clickOutside(e) {
      let el = this.$refs.multiSelect
      let target = e.target
      if (el && el !== target && !el.contains(target)){
        this.isList = false
      }
    }
  },
  created() {
    document.addEventListener('click', this.clickOutside)
  },
  mounted() {
    this.$root.$on('reset', () => {
      this.listToShow = []
      this.list.forEach(item => item.active = true)
    })
  }
}
</script>

<style lang="sass" scoped>
.field
  position: relative
  width: min-content
  label
    font-family: $FiraSans
    font-size: 0.75rem
    color: $grey
  .hashtags
    min-height: 46px
    border-bottom: 1px solid $grey
    padding: 4px 0
    width: 366px
    &.active
      border-bottom: 1px solid $active
    &:hover
      cursor: pointer
    &-placeholder
      font-family: $FiraSans
      font-size: 0.94rem
      color: $grey
      padding-top: 10px
    &-item
      font-family: $FiraSansMedium
      font-size: 0.75rem
      color: $black
      cursor: default
      padding: 8px 13px 8px 14px
      border: 1px solid $grey
      border-radius: 50px
      white-space: nowrap
      width: min-content
      display: inline-grid
      grid-template-columns: repeat(2, min-content)
      grid-column-gap: 8px
      align-items: center
      margin: 0 5px 5px 0
      opacity: 0
      transition: all linear $time
      &.opacity
        opacity: 1
      svg
        &:hover
          cursor: pointer
  .list
    position: absolute
    top: calc(100% + 5px)
    left: 0
    padding: 17px 10px
    background: $white
    box-shadow: rgba(0, 15, 38, .25) 0 4px 16px
    border-radius: 6px
    width: 100%
    z-index: 2
    &-item
      font-family: $FiraSans
      font-size: 0.93rem
      color: $black
      cursor: pointer
      padding: 8px 15px
      border-radius: 50px
      transition: all linear $time
      &:hover
        background: $tagHover
      &.disable
        color: $grey
        cursor: default
        &:hover
          background: none
      &:last-of-type
        margin-bottom: 0

.fade-enter, .fade-leave-to
  opacity: 0
.fade-enter-active, .fade-leave-active
  transition: all linear $time
.fade-enter-to, .fade-leave
  opacity: 1

</style>
