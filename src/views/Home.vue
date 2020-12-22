<template>
  <div class="home">
    <form @submit.prevent="submit">
      <div class="fields">
        <Input
          label="ФИО"
          class="fullname"
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
          class="education"
          placeholder="Выберите образование"
          :list="educationList"
          @listToShow="listToShow"
        />

        <Checkbox
          label="Готов к переезду"
          class="move"
          :status="moveStatus"
          @checkbox="moveStatus = !moveStatus"
        />

        <Gender
          v-model="isMan"
          @gender="gender"
          class="gender"
        />

        <Mode
          v-model="isFullDay"
          @mode="mode"
          class="mode"
        />
      </div>

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
        <transition name="fade">
          <Notification v-if="isDone" />
        </transition>
      </div>

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
      this.$v.$reset()
    }
  }
}
</script>

<style lang="sass">
.home
  min-height: 100vh
  form
    padding: 8px 8px 0
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

.home
  form
    display: grid
    grid-template-rows: repeat(2, min-content)
    grid-row-gap: 30px
    .fields
      display: grid
      grid-template-columns: repeat(3, min-content)
      grid-template-rows: repeat(2, min-content)
      align-content: start
      grid-gap: 30px
      position: relative
    .buttons
      position: relative
    .notification
      position: absolute
      top: calc(100% + 20px)
      left: 0

@media screen and (max-width: 960px)
  .home
    form
      .fields
        .mode
          grid-column: 2/4

@media screen and (max-width: 670px)
  .home
    form
      grid-template-rows: 1fr min-content
      min-height: inherit
      .fields
        grid-template-columns: 1fr
        grid-gap: 20px
        .mode
          grid-column: unset
      .buttons
        .notification
          top: calc(-76px)
          left: 0
          width: 280px
          padding: 22px 0
          justify-content: center

@media screen and (max-width: 370px)
  .home
    form
      .fields
        .gender
          grid-template-columns: repeat(2, 1fr)
          .item
            width: 100%
        .mode
          grid-template-columns: 1fr
          grid-template-rows: repeat(2, min-content)
          grid-row-gap: 20px
      .buttons
        grid-template-columns: repeat(2, 1fr)
        grid-column-gap: 0
        width: calc(100% + 16px)
        transform: translateX(-8px)
        .notification
          left: 50%
          transform: translateX(-50%)

</style>