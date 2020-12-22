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

      <button type="submit">Submit</button>

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
    Mode
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
    }
  }
}
</script>
