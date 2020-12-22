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

export default {
  name: 'Home',
  data: () => ({
    errors,
    fullName: '',
    educationList: [
      {title: 'Среднее', active: true},
      {title: 'Среднее специальное', active: true},
      {title: 'Незаконченное высшее', active: true},
      {title: 'Высшее', active: true},
      {title: 'Магистр, кандидат, доктор наук', active: true}
    ],
    selectedList: [],
    moveStatus: false,
    isMan: true,
    isFullDay: true
  }),
  components: {
    Input,
    MultiSelect,
    Checkbox,
    Gender,
    Mode,
    Button
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
      this.$v.$invalid ? console.log('bad') : console.log('good')
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
    }
  }
}
</script>

<style lang="sass" scoped>
.buttons
  display: grid
  grid-template-columns: repeat(2, min-content)
  grid-column-gap: 10px
</style>