<template>
  <div class="window-height window-width row justify-center items-center">
    <q-card class="my-card">
      <q-card-section class="col-10" style="width: 800px">
        <q-input v-model="nameTextBox" label="Name" />
        <q-input ref="email" v-model="emailTextBox" type="email" label="Email" />
        <q-input ref="password" v-model="passTextBox" type="password" label="Password" />
        <q-input v-model="conPassTextBox" type="password" label="Confirm Password" />
        <br />
        <br />
        <q-btn color="secondary" class="q-mr-lg"
          @click="registerProfile(emailTextBox, nameTextBox, passTextBox, conPassTextBox)">
          Register
        </q-btn>
        <q-btn :to="'/'">Cancel</q-btn>
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup>

import { ref, getCurrentInstance } from 'vue'
const { $feathers } = getCurrentInstance().appContext.config.globalProperties

const nameTextBox = ref('')
const emailTextBox = ref('')
const passTextBox = ref('')
const conPassTextBox = ref('')

const password = ref(null)
const email = ref(null)

const checkConfirmPassword = (pass, conPass) => {
  // console.log(pass, conPass)
  if (pass === conPass) {
    return true
  } else {
    return false
  }
}

const registerProfile = (emailText, nameText, passText, conPassText) => {
  console.log(emailText)
  $feathers.service('/users').find({
    query: {
      email: emailText
    }
  })
    .then(() => { // Not Working. To be investigated.
      // email found
      alert('Email has already been registered. Please use anothere email.')
      email.value.focus()
      email.value.select()
    })
    .catch(() => {
      console.log(checkConfirmPassword(passText, conPassText))
      if (checkConfirmPassword(passText, conPassText) === false) {
        alert('Password is the same. Please retype it again.')
        password.value.focus()
        password.value.select()
      } else {
        console.log('Passed')
        $feathers.service('/users').create({
          email: emailText,
          name: nameText,
          password: passText
        })
      }
    })
}

</script>
