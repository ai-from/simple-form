<template>
  <div class="home">
    <form @submit.prevent="submit">

      <Input
        label="ФИО"
        :required="true"
        placeholder="Введите ФИО"
        v-model.trim="fullName"
        @clear="fullName = ''"
        :isError="$v.$dirty && $v.fullName.$invalid"
        :errorMsg="errors.fullName($v.fullName.$params.minLength.min, $v.fullName.$params.maxLength.max)"
      />


      <button type="submit">Submit</button>

    </form>
  </div>
</template>

<script>
import {required, minLength, maxLength} from "vuelidate/lib/validators"
import errors from "@/errors"
import Input from "@/components/Input"

export default {
  name: 'Home',
  data: () => ({
    errors,
    fullName: ''
  }),
  components: {
    Input
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
