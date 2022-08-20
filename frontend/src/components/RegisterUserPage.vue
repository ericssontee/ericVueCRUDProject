<template>
  <div class="window-height window-width row justify-center items-center">
    <q-card class="my-card col-10" style="width: 800px">
      <q-card-section class="bg-primary text-white">
        <div class="text-h4">Register</div>
      </q-card-section>
      <q-separator />
      <q-card-section>
        <q-input ref="name" v-model="nameTextBox" label="Name" />
        <q-input ref="email" v-model="emailTextBox" type="email" label="Email" />
        <q-input ref="password" v-model="passTextBox" type="password" label="Password" />
        <q-input ref="conPass" v-model="conPassTextBox" type="password" label="Confirm Password" />
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
import { useRouter } from 'vue-router'

const { $feathers } = getCurrentInstance().appContext.config.globalProperties
const router = useRouter()

const nameTextBox = ref('')
const emailTextBox = ref('')
const passTextBox = ref('')
const conPassTextBox = ref('')

const email = ref(null)
const name = ref(null)
const password = ref(null)
const conPass = ref(null)

const isPassNConfirmPasswordMatch = (pass, conPass) => {
  console.log(pass, conPass)
  if (pass === conPass) {
    return true
  } else {
    return false
  }
}

const isDetailsTextBoxBlank = (email, name, pass, conPass) => {
  if (email === '' || name === '' || pass === '' || conPass === '') {
    // All the textbox are blank
    return true
  } else {
    return false
  }
}

const registerProfile = (emailText, nameText, passText, conPassText) => {
  if (isDetailsTextBoxBlank(emailText, nameText, passText, conPassText) === false) {
    if (isPassNConfirmPasswordMatch(passText, conPassText) === false) {
      alert('Password is the same. Please retype it again.')
      password.value.focus()
      password.value.select()
    } else {
      $feathers.service('/users').create({
        email: emailText,
        name: nameText,
        password: passText
      }).then(() => {
        console.log('Profile has been registered.')
        alert('Profile has been registered. You may login using this credential.')
        router.push({ path: '/' })
      }).catch(e => {
        console.log(e)
        alert('Email has already been used. Please use another email.')
        email.value.focus()
        email.value.select()
      }

      )
    }
  } else {
    alert("Can't Register with blank details. Please fill out all the needed details.")
    name.value.focus()
  }
}

</script>
