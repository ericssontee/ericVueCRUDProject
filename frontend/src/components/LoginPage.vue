<template>
  <div class="window-height window-width row justify-center items-center">
    <q-card class="my-card" flat>
      <q-card-section horizontal>
        <q-card-section>
          <q-img
            src="https://images.unsplash.com/photo-1472457897821-70d3819a0e24?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1469&q=80"
            width="450px" height="500px" />
        </q-card-section>
        <q-card-section class="col-7 ">
          <q-input class="q-pb-sm" square outlined v-model="emailText" type="email" label="Email" />
          <q-input square outlined v-model="passText" type="password" label="Password" />
          <br />
          <q-btn @click="login(emailText, passText)">Login</q-btn>
          <br />
          <q-card-section horizontal>
            <q-card-section>
              <p>Not Registered Yet?</p>
            </q-card-section>
            <q-card-section>
              <router-link v-bind:to="'/register'">Register</router-link>
            </q-card-section>
          </q-card-section>
        </q-card-section>
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup>
import { getCurrentInstance, ref } from 'vue'
import { useRouter } from 'vue-router'
const { $feathers } = getCurrentInstance().appContext.config.globalProperties
const router = useRouter()

const emailText = ref('')
const passText = ref('')
const userActive = $feathers.on('login', ({ user }) => {
  return user
})

const login = (e, p) => {
  $feathers.authenticate({
    email: e,
    password: p,
    strategy: 'local'

  }).then(async () => {
    // Logged in
    alert('Logged In Successfully')
    console.log(userActive)
    await router.push({ path: '/home' })
    emailText.value = ''
    passText.value = ''
  }).catch(e => {
    // Show login page (potentially with `e.message`)
    console.error('Authentication error', e)
  })
}

</script>
