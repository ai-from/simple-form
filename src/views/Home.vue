<template>
  <div class="home">
    <form @submit.prevent="submit">

      <Input
        label="ФИО"
        :required="true"
        :id="'fullname_' + new Date().getTime()"
        placeholder="Введите ФИО"
        v-model.trim="fullName"
        @clear="fullName = ''"
        :isError="$v.$dirty && $v.fullName.$invalid"
        :errorMsg="errors.fullName($v.fullName.$params.minLength.min, $v.fullName.$params.maxLength.max)"
      />

      <MultiSelect
        label="Образование"
        placeholder="Выберите образование"
        :list="educationList"
        @listToShow="listToShow"
      />

      <Checkbox
        label="Готов к переезду"
        :status="moveStatus"
        @checkbox="moveStatus = !moveStatus"
      />

      <Gender
        v-model="isMan"
        @gender="gender"
      />

      <Mode
        v-model="isFullDay"
        @mode="mode"
      />

      <div class="buttons">
        <Button
          title="Отменить"
          :disabled="isDisabled"
          @click="cancelBtn"
        />

        <Button
          title="Сохранить"
          theme="blue"
          type="submit"
          :disabled="isDisabled"
        />
      </div>

      <transition name="fade">
        <Notification v-if="isDone" />
      </transition>

    </form>
  </div>
</template>

<script>
import {required, minLength, maxLength} from "vuelidate/lib/validators"
import errors from "@/errors"
import Input from "@/components/Input"
import MultiSelect from "@/components/MultiSelect"
import Checkbox from "@/components/Checkbox"
import Gender from "@/components/Gender"
import Mode from "@/components/Mode"
import Button from "@/components/Button"
import Notification from "@/components/Notification"

export default {
  name: 'Home',
  data: () => ({
    errors,
    fullName: '',
    educationList: [
      {title: 'Среднее', active: true, opacity: false},
      {title: 'Среднее специальное', active: true, opacity: false},
      {title: 'Незаконченное высшее', active: true, opacity: false},
      {title: 'Высшее', active: true, opacity: false},
      {title: 'Магистр, кандидат, доктор наук', active: true, opacity: false}
    ],
    selectedList: [],
    moveStatus: false,
    isMan: true,
    isFullDay: true,
    isDone: false
  }),
  components: {
    Input,
    MultiSelect,
    Checkbox,
    Gender,
    Mode,
    Button,
    Notification
  },
  computed: {
    isDisabled() {
      return !(this.fullName || this.selectedList.length || this.moveStatus || !this.isMan || !this.isFullDay)
    }
  },
  validations: {
    fullName: {required, minLength: minLength(2), maxLength: maxLength(40)}
  },
  methods: {
    submit() {
      this.$v.$touch()
      if(this.$v.$invalid) {
        this.isDone = false
      } else {
        this.isDone = true
        const obj = {
          'fullName': this.fullName,
          'selectedList': this.selectedList,
          'moveStatus': this.moveStatus ? 'Готов к переезду' : 'Не готов к переезду',
          'gender': this.isMan ? 'Мужчина' : 'Женщина',
          'mode': this.isFullDay ? 'Полный рабочий день' : 'Удаленная работа'
        }
        localStorage.setItem('data', JSON.stringify(obj))
        let timer = setTimeout(() => {
          this.isDone = false
          clearTimeout(timer)
        }, 3000)
      }
    },
    listToShow(arr) {
      this.selectedList = arr
    },
    gender(val) {
      this.isMan = val
    },
    mode(val) {
      this.isFullDay = val
    },
    cancelBtn() {
      this.fullName = ''
      this.selectedList = []
      this.$root.$emit('reset')
      this.moveStatus = false
      this.isMan = true
      this.isFullDay = true
      if(localStorage.getItem('data')) {
        localStorage.removeItem('data')
      }
    }
  }
}
</script>

<style lang="sass" scoped>
.buttons
  display: grid
  grid-template-columns: repeat(2, min-content)
  grid-column-gap: 10px
.fade-enter, .fade-leave-to
  opacity: 0
.fade-enter-active, .fade-leave-active
  transition: all linear $time
.fade-enter-to, .fade-leave
  opacity: 1

form
  display: grid
  grid-template-columns: repeat(3, min-content)
  grid-template-rows: repeat(3, min-content)
  grid-gap: 30px
  position: relative
  .buttons
    grid-column: 1/2
    grid-row: 3/4
  .notification
    position: absolute
    top: calc(100% + 20px)
    left: 0
</style>