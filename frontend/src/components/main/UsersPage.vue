<template>
  <div>{{names}}</div>
</template>

<script setup>
import { ref, getCurrentInstance } from 'vue'
const { $api } = getCurrentInstance().appContext.config.globalProperties

const users = ref([])
$api.get('users')
  .then(response => {
    users.value = response.data
  })
  .catch(error => {
    this.errors.push(error)
  })

const names = users.value.map((item) => item.name)

console.log(users)

</script>
