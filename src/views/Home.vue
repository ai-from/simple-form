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
    ]
  }),
  components: {
    Input,
    MultiSelect
  },
  validations: {
    fullName: {required, minLength: minLength(2), maxLength: maxLength(40)}
  },
  methods: {
    getFullName(val) {
      this.fullName = val
    },
    submit() {
      this.$v.$touch()
      this.$v.$invalid ? console.log('bad') : console.log('good')
    }
  }
}
</script>
